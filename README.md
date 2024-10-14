# Educhain Token Swap Automation Script (Education Purpose)

This script automates token swaps and liquidity provision on the Educhain network using Sailfish Finance. It allows users to swap USDC for SAIL or GRASP tokens and add liquidity to a pool of USDC and GRASP tokens. The script is built using Node.js and ethers.js, and it supports multiple wallet addresses for repetitive transactions.

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js Official Website](https://nodejs.org/).
2. **NPM or Yarn**: To manage packages.
3. **ethers.js**: Install via NPM or Yarn.
4. **Private Keys File**: Prepare a file (`pk.txt`) with private keys, each on a new line.
5. **Environment Variables**: Create a `.env` file with your RPC URL and other configurations.

## Installation

1. Clone the repository to your local machine:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory:
    ```
    RPC_URL=<Your_Educhain_RPC_URL>
    REPEAT_COUNT=100
    ```

4. Create a `pk.txt` file and insert the private keys, each on a new line:
    ```
    <private_key_1>
    <private_key_2>
    ```

5. Ensure the ABI files are in `./config` directory:
    - `ERC20Abi.js`: ABI for standard ERC20 tokens.
    - `sailAbi.js`: ABI for Sail token contract.
    - `vaultAbi.js`: ABI for Vault contract.

## Usage

1. To run the script, execute:
    ```bash
    node script.js
    ```

2. The script will:
    - Swap USDC to SAIL.
    - Swap USDC to GRASP.
    - Add liquidity to the USDC-GRASP pool.
    - Repeat the operations for multiple wallets based on your `pk.txt` and repeat count settings.

3. The logs will show the swap results, including timestamps and wallet addresses.

## Customization

- **Change Token Addresses**: Edit the contract addresses in the script for different tokens or pools.
- **Adjust Retry Settings**: Modify `maxRetries` in the `sendTransactionWithRetry` function for custom retry logic.
- **Modify Swap Amounts**: Change the `swapAmount` variable to adjust the amount to be swapped.
- **Adjust Gas Fee Monitoring**: Update `targetGwei` in `waitForLowGas` to set the desired gas price threshold.

## Thanks!

