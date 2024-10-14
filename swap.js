const { ethers } = require("ethers");
const fs = require('fs');
require('dotenv').config();

const MAX_INT128 = BigInt(2 ** 127) - BigInt(1);
const sail = "0x06D837C1a3D8A86E82B676ACE6BDFAf4A51CD77D";
const grasp = "0x3eB2Eb8E2a0E26BEf3Dc3E78289Be7343355FeBC";
const veSail = "0x2c2800995F2a8137EB9dd3Bfe88FABbBAe8b4958";
const vault = "0xB97582DCB6F2866098cA210095a04dF3e11B76A6";
const USDC_EDU = "0x77721D19BDfc67fe8cc46ddaa3cc4C94e6826E3C";

const ERC20Abi = require('./config/ERC20Abi.js')
const sailAbi = require ('./config/sailAbi.js')
const vaultAbi = require ("./config/vaultAbi.js")

function log(message) {
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS
    console.log(`[${timestamp}] ${message}`);}

function shortenAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

async function getTokenBalance(contract, address) {
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    return ethers.formatUnits(balance, decimals);
}

async function getTokenDecimals(contract) {
    return await contract.decimals();
}

async function waitForLowGas(provider, targetGwei) {
    while (true) {
        const feeData = await provider.getFeeData();
        const currentGwei = Number(ethers.formatUnits(feeData.gasPrice, "gwei"));
        
        if (currentGwei <= targetGwei) {
            return feeData;
        }
        
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute before checking again
    }
}

async function sendTransactionWithRetry(transaction, wallet, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const feeData = await waitForLowGas(wallet.provider, 30);
            
            const tx = {
                ...transaction,
                maxFeePerGas: feeData.maxFeePerGas,
                maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
            };

            const estimatedGas = await wallet.estimateGas(tx);
            tx.gasLimit = BigInt(Math.ceil(Number(estimatedGas) * 1.1));

            const sentTx = await wallet.sendTransaction(tx);
            const receipt = await sentTx.wait();
            return receipt;
        } catch (error) {
            if (i === maxRetries - 1) throw error;
        }
    }
}

async function approveAndSwap(vaultContract, tokenInContract, tokenOutAddress, amountIn, wallet, tokenInDecimals, tokenOutDecimals) {
    const approveTx = await tokenInContract.approve.populateTransaction(vault, amountIn);
    await sendTransactionWithRetry(approveTx, wallet);
    
    const amounts = await vaultContract.getAmountsOut.staticCall(
        amountIn,
        [{ from: tokenInContract.target, to: tokenOutAddress, stable: false }]
    );
    const minAmountOut = amounts[1] * 99n / 100n; // 1% slippage

    const swapTx = await vaultContract.swapExactTokensForTokens.populateTransaction(
        amountIn,
        minAmountOut,
        [{ from: tokenInContract.target, to: tokenOutAddress, stable: false }],
        wallet.address,
        Math.floor(Date.now() / 1000) + 60 * 20
    );

    const receipt = await sendTransactionWithRetry(swapTx, wallet);
    return { receipt, amountOut: minAmountOut };
}

async function approveAndAddLiquidity(vaultContract, usdcContract, graspContract, wallet, usdcDecimals, graspDecimals) {
    const amountUSDC = ethers.parseUnits("0.001", usdcDecimals);
    
    let amountGRASP;
    try {
        amountGRASP = (await vaultContract.getAmountsOut.staticCall(
            amountUSDC,
            [{ from: USDC_EDU, to: grasp, stable: false }]
        ))[1];
    } catch (error) {
        return null;
    }

    if (amountGRASP <= 0n) {
        return null;
    }

    const approveUsdcTx = await usdcContract.approve.populateTransaction(vault, amountUSDC);
    await sendTransactionWithRetry(approveUsdcTx, wallet);

    const approveGraspTx = await graspContract.approve.populateTransaction(vault, amountGRASP);
    await sendTransactionWithRetry(approveGraspTx, wallet);

    const minAmountUSDC = amountUSDC * 99n / 100n; // 1% slippage
    const minAmountGRASP = amountGRASP * 99n / 100n; // 1% slippage

    const addLiquidityTx = await vaultContract.addLiquidity.populateTransaction(
        USDC_EDU,
        grasp,
        false,
        amountUSDC,
        amountGRASP,
        minAmountUSDC,
        minAmountGRASP,
        wallet.address,
        Math.floor(Date.now() / 1000) + 60 * 20
    );

    const receipt = await sendTransactionWithRetry(addLiquidityTx, wallet);
    return { receipt, amountUSDC, amountGRASP };
}

function readPrivateKeys(filename) {
    const content = fs.readFileSync(filename, 'utf-8');
    return content.split('\n').map(line => line.trim()).filter(line => line !== '');
}

async function processWallets(provider, privateKeys, iteration) {
    log(`-------- Iteration ${iteration + 1} --------`);

    for (let i = 0; i < privateKeys.length; i++) {
        const wallet = new ethers.Wallet(privateKeys[i], provider);
        const shortAddress = shortenAddress(wallet.address);

        const usdcContract = new ethers.Contract(USDC_EDU, ERC20Abi, wallet);
        const sailContract = new ethers.Contract(sail, ERC20Abi, wallet);
        const graspContract = new ethers.Contract(grasp, ERC20Abi, wallet);
        const vaultContract = new ethers.Contract(vault, vaultAbi, wallet);

        const usdcDecimals = await getTokenDecimals(usdcContract);
        const sailDecimals = await getTokenDecimals(sailContract);
        const graspDecimals = await getTokenDecimals(graspContract);

        const swapAmount = ethers.parseUnits("0.001", usdcDecimals);

        try {
            // USDC-SAIL swap
            const sailSwapResult = await approveAndSwap(vaultContract, usdcContract, sail, swapAmount, wallet, usdcDecimals, sailDecimals);
            log(`${shortAddress}: USDC-SAIL Swap - ${ethers.formatUnits(sailSwapResult.amountOut, sailDecimals)} SAIL`);

            // USDC-GRASP swap
            const graspSwapResult = await approveAndSwap(vaultContract, usdcContract, grasp, swapAmount, wallet, usdcDecimals, graspDecimals);
            log(`${shortAddress}: USDC-GRASP Swap - ${ethers.formatUnits(graspSwapResult.amountOut, graspDecimals)} GRASP`);

            // Add Liquidity
            const result = await approveAndAddLiquidity(vaultContract, usdcContract, graspContract, wallet, usdcDecimals, graspDecimals);
            if (result) {
                const { amountUSDC, amountGRASP } = result;
                log(`${shortAddress}: Liquidity Added - ${ethers.formatUnits(amountUSDC, usdcDecimals)} USDC + ${ethers.formatUnits(amountGRASP, graspDecimals)} GRASP`);
            } else {
                log(`${shortAddress}: Add Liquidity Failed`);
            }
        } catch (error) {
            if (error.message.includes("insufficient funds for intrinsic transaction cost")) {
                log(`${shortAddress}: Insufficient funds. Skipping.`);}
            else if (error.message.includes("missing revert data")) {
                log(`${shortAddress}: Insufficient funds. Skipping.`);}
                else {
                log(`${shortAddress}: Error - ${error.message}`);
            }
        }
    }

    log(`-------- End of Iteration ${iteration + 1} --------\n`);
}

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const privateKeys = readPrivateKeys('pk.txt');
    
    const repeatCount = parseInt(process.env.REPEAT_COUNT) || 100;
    log(`Total iterations: ${repeatCount}`);

    for (let iteration = 0; iteration < repeatCount; iteration++) {
        await processWallets(provider, privateKeys, iteration);
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay between iterations
    }

    // Display total balances after all iterations
    log("-------- Final Balances --------");
    for (const privateKey of privateKeys) {
        const wallet = new ethers.Wallet(privateKey, provider);
        const shortAddress = shortenAddress(wallet.address);

        const usdcContract = new ethers.Contract(USDC_EDU, ERC20Abi, wallet);
        const sailContract = new ethers.Contract(sail, ERC20Abi, wallet);
        const graspContract = new ethers.Contract(grasp, ERC20Abi, wallet);

        const usdcBalance = await getTokenBalance(usdcContract, wallet.address);
        const sailBalance = await getTokenBalance(sailContract, wallet.address);
        const graspBalance = await getTokenBalance(graspContract, wallet.address);

        log(`${shortAddress}: USDC: ${usdcBalance}, SAIL: ${sailBalance}, GRASP: ${graspBalance}`);
    }
    log("-------- End of Final Balances --------");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        log(`An error occurred: ${error}`);
        process.exit(1);
    });
