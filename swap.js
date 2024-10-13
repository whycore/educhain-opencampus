const { ethers } = require("ethers");
require('dotenv').config();

const MAX_INT128 = BigInt(2 ** 127) - BigInt(1);
const sail = "0x06D837C1a3D8A86E82B676ACE6BDFAf4A51CD77D";
const grasp = "0x3eB2Eb8E2a0E26BEf3Dc3E78289Be7343355FeBC";
const veSail = "0x2c2800995F2a8137EB9dd3Bfe88FABbBAe8b4958";
const vault = "0xB97582DCB6F2866098cA210095a04dF3e11B76A6";
const USDC_EDU = "0x77721D19BDfc67fe8cc46ddaa3cc4C94e6826E3C";

const ERC20Abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];

const sailAbi = [
    {
        type: "constructor",
        inputs: [
            { name: "selfAddr", type: "address", internalType: "address" },
            { name: "vault_", type: "address", internalType: "contract IVault" },
            { name: "veVC_", type: "address", internalType: "address" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "allowance",
        inputs: [
            { name: "from", type: "address", internalType: "address" },
            { name: "spender", type: "address", internalType: "address" },
        ],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "approve",
        inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "balanceOf",
        inputs: [{ name: "addr", type: "address", internalType: "address" }],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "decimals",
        inputs: [],
        outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "decreaseAllowance",
        inputs: [
            { name: "_spender", type: "address", internalType: "address" },
            { name: "_subtractedValue", type: "uint256", internalType: "uint256" },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "dispense",
        inputs: [],
        outputs: [{ name: "minted", type: "uint256", internalType: "uint256" }],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "emissionCurve",
        inputs: [{ name: "t", type: "uint256", internalType: "uint256" }],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "pure",
    },
    {
        type: "function",
        name: "emissionRate",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "emissionStarted",
        inputs: [],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "increaseAllowance",
        inputs: [
            { name: "_spender", type: "address", internalType: "address" },
            { name: "_addedValue", type: "uint256", internalType: "uint256" },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "initialize",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "listedTokens",
        inputs: [],
        outputs: [{ name: "ret", type: "bytes32[]", internalType: "Token[]" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "lpTokens",
        inputs: [],
        outputs: [{ name: "ret", type: "bytes32[]", internalType: "Token[]" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [{ name: "", type: "string", internalType: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "notifyMigration",
        inputs: [{ name: "n", type: "uint128", internalType: "uint128" }],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "poolParams",
        inputs: [],
        outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "swapType",
        inputs: [],
        outputs: [{ name: "", type: "string", internalType: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "symbol",
        inputs: [],
        outputs: [{ name: "", type: "string", internalType: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "toEmissionTime",
        inputs: [{ name: "timestamp", type: "uint256", internalType: "uint256" }],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "pure",
    },
    {
        type: "function",
        name: "totalSupply",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "transfer",
        inputs: [
            { name: "to", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "transferFrom",
        inputs: [
            { name: "from", type: "address", internalType: "address" },
            { name: "to", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "underlyingTokens",
        inputs: [{ name: "lp", type: "bytes32", internalType: "Token" }],
        outputs: [{ name: "", type: "bytes32[]", internalType: "Token[]" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "velocore__execute",
        inputs: [
            { name: "user", type: "address", internalType: "address" },
            { name: "tokens", type: "bytes32[]", internalType: "Token[]" },
            { name: "r", type: "int128[]", internalType: "int128[]" },
            { name: "", type: "bytes", internalType: "bytes" },
        ],
        outputs: [
            { name: "", type: "int128[]", internalType: "int128[]" },
            { name: "", type: "int128[]", internalType: "int128[]" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "weeklyCumEmission",
        inputs: [{ name: "w", type: "uint256", internalType: "uint256" }],
        outputs: [{ name: "cum", type: "uint256", internalType: "uint256" }],
        stateMutability: "pure",
    },
    {
        type: "event",
        name: "Approval",
        inputs: [
            { name: "owner", type: "address", indexed: true, internalType: "address" },
            { name: "spender", type: "address", indexed: true, internalType: "address" },
            { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Transfer",
        inputs: [
            { name: "from", type: "address", indexed: true, internalType: "address" },
            { name: "to", type: "address", indexed: true, internalType: "address" },
            { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
        ],
        anonymous: false,
    },

];

const vaultAbi = [
    {
        type: "function",
        name: "addLiquidity",
        inputs: [
            {
                name: "tokenA",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenB",
                type: "address",
                internalType: "address",
            },
            {
                name: "stable",
                type: "bool",
                internalType: "bool",
            },
            {
                name: "amountADesired",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountBDesired",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountAMin",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountBMin",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amountA",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountB",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "liquidity",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "addLiquidityETH",
        inputs: [
            {
                name: "tokenA",
                type: "address",
                internalType: "address",
            },
            {
                name: "stable",
                type: "bool",
                internalType: "bool",
            },
            {
                name: "amountADesired",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountAMin",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountETHMin",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amountA",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountETH",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "liquidity",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "admin_addFacet",
        inputs: [
            {
                name: "implementation",
                type: "address",
                internalType: "contract IFacet",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "admin_pause",
        inputs: [
            {
                name: "t",
                type: "bool",
                internalType: "bool",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "admin_setAuthorizer",
        inputs: [
            {
                name: "auth_",
                type: "address",
                internalType: "contract IAuthorizer",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "admin_setFunctions",
        inputs: [
            {
                name: "implementation",
                type: "address",
                internalType: "address",
            },
            {
                name: "sigs",
                type: "bytes4[]",
                internalType: "bytes4[]",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "admin_setTreasury",
        inputs: [
            {
                name: "treasury",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "allPairs",
        inputs: [
            {
                name: "i",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "address",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "allPairsLength",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "attachBribe",
        inputs: [
            {
                name: "gauge",
                type: "address",
                internalType: "contract IGauge",
            },
            {
                name: "bribe",
                type: "address",
                internalType: "contract IBribe",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "ballotToken",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "bytes32",
                internalType: "Token",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "claimGasses",
        inputs: [
            {
                name: "",
                type: "address[]",
                internalType: "address[]",
            },
            {
                name: "",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "deposit",
        inputs: [
            {
                name: "pool",
                type: "address",
                internalType: "address",
            },
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "emissionStarted",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "emissionToken",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "bytes32",
                internalType: "Token",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "execute",
        inputs: [
            {
                name: "tokenRef",
                type: "bytes32[]",
                internalType: "Token[]",
            },
            {
                name: "deposit",
                type: "int128[]",
                internalType: "int128[]",
            },
            {
                name: "ops",
                type: "tuple[]",
                internalType: "struct VelocoreOperation[]",
                components: [
                    {
                        name: "poolId",
                        type: "bytes32",
                        internalType: "bytes32",
                    },
                    {
                        name: "tokenInformations",
                        type: "bytes32[]",
                        internalType: "bytes32[]",
                    },
                    {
                        name: "data",
                        type: "bytes",
                        internalType: "bytes",
                    },
                ],
            },
        ],
        outputs: [],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "execute1",
        inputs: [
            {
                name: "pool",
                type: "address",
                internalType: "address",
            },
            {
                name: "method",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "t1",
                type: "address",
                internalType: "address",
            },
            {
                name: "m1",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a1",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "data",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        outputs: [
            {
                name: "",
                type: "int128[]",
                internalType: "int128[]",
            },
        ],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "execute2",
        inputs: [
            {
                name: "pool",
                type: "address",
                internalType: "address",
            },
            {
                name: "method",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "t1",
                type: "address",
                internalType: "address",
            },
            {
                name: "m1",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a1",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "t2",
                type: "address",
                internalType: "address",
            },
            {
                name: "m2",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a2",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "data",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        outputs: [
            {
                name: "",
                type: "int128[]",
                internalType: "int128[]",
            },
        ],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "execute3",
        inputs: [
            {
                name: "pool",
                type: "address",
                internalType: "address",
            },
            {
                name: "method",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "t1",
                type: "address",
                internalType: "address",
            },
            {
                name: "m1",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a1",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "t2",
                type: "address",
                internalType: "address",
            },
            {
                name: "m2",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a2",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "t3",
                type: "address",
                internalType: "address",
            },
            {
                name: "m3",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a3",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "data",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        outputs: [
            {
                name: "",
                type: "int128[]",
                internalType: "int128[]",
            },
        ],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "facetAddress",
        inputs: [
            {
                name: "_functionSelector",
                type: "bytes4",
                internalType: "bytes4",
            },
        ],
        outputs: [
            {
                name: "facetAddress_",
                type: "address",
                internalType: "address",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "facetAddresses",
        inputs: [],
        outputs: [
            {
                name: "facetAddresses_",
                type: "address[]",
                internalType: "address[]",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "facetFunctionSelectors",
        inputs: [
            {
                name: "_facet",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [
            {
                name: "facetFunctionSelectors_",
                type: "bytes4[]",
                internalType: "bytes4[]",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "facets",
        inputs: [],
        outputs: [
            {
                name: "facets_",
                type: "tuple[]",
                internalType: "struct IVault.Facet[]",
                components: [
                    {
                        name: "facetAddress",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "functionSelectors",
                        type: "bytes4[]",
                        internalType: "bytes4[]",
                    },
                ],
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getAmountsIn",
        inputs: [
            {
                name: "amountOut",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "path",
                type: "tuple[]",
                internalType: "struct route[]",
                components: [
                    {
                        name: "from",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "stable",
                        type: "bool",
                        internalType: "bool",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "amounts",
                type: "uint256[]",
                internalType: "uint256[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "getAmountsOut",
        inputs: [
            {
                name: "amountIn",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "path",
                type: "tuple[]",
                internalType: "struct route[]",
                components: [
                    {
                        name: "from",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "stable",
                        type: "bool",
                        internalType: "bool",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "amounts",
                type: "uint256[]",
                internalType: "uint256[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "getGaugeBalance",
        inputs: [
            {
                name: "",
                type: "address",
                internalType: "address",
            },
            {
                name: "",
                type: "bytes32",
                internalType: "Token",
            },
        ],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getPair",
        inputs: [
            {
                name: "t0",
                type: "address",
                internalType: "address",
            },
            {
                name: "t1",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "address",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getPoolBalance",
        inputs: [
            {
                name: "",
                type: "address",
                internalType: "address",
            },
            {
                name: "",
                type: "bytes32",
                internalType: "Token",
            },
        ],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "killBribe",
        inputs: [
            {
                name: "gauge",
                type: "address",
                internalType: "contract IGauge",
            },
            {
                name: "bribe",
                type: "address",
                internalType: "contract IBribe",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "killGauge",
        inputs: [
            {
                name: "gauge",
                type: "address",
                internalType: "contract IGauge",
            },
            {
                name: "t",
                type: "bool",
                internalType: "bool",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "notifyInitialSupply",
        inputs: [
            {
                name: "",
                type: "bytes32",
                internalType: "Token",
            },
            {
                name: "",
                type: "uint128",
                internalType: "uint128",
            },
            {
                name: "",
                type: "uint128",
                internalType: "uint128",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "query",
        inputs: [
            {
                name: "user",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenRef",
                type: "bytes32[]",
                internalType: "Token[]",
            },
            {
                name: "deposit",
                type: "int128[]",
                internalType: "int128[]",
            },
            {
                name: "ops",
                type: "tuple[]",
                internalType: "struct VelocoreOperation[]",
                components: [
                    {
                        name: "poolId",
                        type: "bytes32",
                        internalType: "bytes32",
                    },
                    {
                        name: "tokenInformations",
                        type: "bytes32[]",
                        internalType: "bytes32[]",
                    },
                    {
                        name: "data",
                        type: "bytes",
                        internalType: "bytes",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "",
                type: "int128[]",
                internalType: "int128[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "query1",
        inputs: [
            {
                name: "pool",
                type: "address",
                internalType: "address",
            },
            {
                name: "method",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "t1",
                type: "address",
                internalType: "address",
            },
            {
                name: "m1",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a1",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "data",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        outputs: [
            {
                name: "",
                type: "int128[]",
                internalType: "int128[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "query2",
        inputs: [
            {
                name: "pool",
                type: "address",
                internalType: "address",
            },
            {
                name: "method",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "t1",
                type: "address",
                internalType: "address",
            },
            {
                name: "m1",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a1",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "t2",
                type: "address",
                internalType: "address",
            },
            {
                name: "m2",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a2",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "data",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        outputs: [
            {
                name: "",
                type: "int128[]",
                internalType: "int128[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "query3",
        inputs: [
            {
                name: "pool",
                type: "address",
                internalType: "address",
            },
            {
                name: "method",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "t1",
                type: "address",
                internalType: "address",
            },
            {
                name: "m1",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a1",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "t2",
                type: "address",
                internalType: "address",
            },
            {
                name: "m2",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a2",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "t3",
                type: "address",
                internalType: "address",
            },
            {
                name: "m3",
                type: "uint8",
                internalType: "uint8",
            },
            {
                name: "a3",
                type: "int128",
                internalType: "int128",
            },
            {
                name: "data",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        outputs: [
            {
                name: "",
                type: "int128[]",
                internalType: "int128[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "quoteAddLiquidity",
        inputs: [
            {
                name: "tokenA",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenB",
                type: "address",
                internalType: "address",
            },
            {
                name: "stable",
                type: "bool",
                internalType: "bool",
            },
            {
                name: "amountADesired",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountBDesired",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amountA",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountB",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "liquidity",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "quoteRemoveLiquidity",
        inputs: [
            {
                name: "tokenA",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenB",
                type: "address",
                internalType: "address",
            },
            {
                name: "stable",
                type: "bool",
                internalType: "bool",
            },
            {
                name: "liquidity",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amountA",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountB",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "removeLiquidity",
        inputs: [
            {
                name: "tokenA",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenB",
                type: "address",
                internalType: "address",
            },
            {
                name: "stable",
                type: "bool",
                internalType: "bool",
            },
            {
                name: "liquidity",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountAMin",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountBMin",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amountA",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountB",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "removeLiquidityETH",
        inputs: [
            {
                name: "token",
                type: "address",
                internalType: "address",
            },
            {
                name: "stable",
                type: "bool",
                internalType: "bool",
            },
            {
                name: "liquidity",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountTokenMin",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountETHMin",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amountToken",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountETH",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "swapETHForExactTokens",
        inputs: [
            {
                name: "amountOut",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "path",
                type: "tuple[]",
                internalType: "struct route[]",
                components: [
                    {
                        name: "from",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "stable",
                        type: "bool",
                        internalType: "bool",
                    },
                ],
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amounts",
                type: "uint256[]",
                internalType: "uint256[]",
            },
        ],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "swapExactETHForTokens",
        inputs: [
            {
                name: "amountOutMin",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "path",
                type: "tuple[]",
                internalType: "struct route[]",
                components: [
                    {
                        name: "from",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "stable",
                        type: "bool",
                        internalType: "bool",
                    },
                ],
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amounts",
                type: "uint256[]",
                internalType: "uint256[]",
            },
        ],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "swapExactTokensForETH",
        inputs: [
            {
                name: "amountIn",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountOutMin",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "path",
                type: "tuple[]",
                internalType: "struct route[]",
                components: [
                    {
                        name: "from",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "stable",
                        type: "bool",
                        internalType: "bool",
                    },
                ],
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amounts",
                type: "uint256[]",
                internalType: "uint256[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "swapExactTokensForTokens",
        inputs: [
            {
                name: "amountIn",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountOutMin",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "path",
                type: "tuple[]",
                internalType: "struct route[]",
                components: [
                    {
                        name: "from",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "stable",
                        type: "bool",
                        internalType: "bool",
                    },
                ],
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amounts",
                type: "uint256[]",
                internalType: "uint256[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "swapTokensForExactETH",
        inputs: [
            {
                name: "amountOut",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountInMax",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "path",
                type: "tuple[]",
                internalType: "struct route[]",
                components: [
                    {
                        name: "from",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "stable",
                        type: "bool",
                        internalType: "bool",
                    },
                ],
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amounts",
                type: "uint256[]",
                internalType: "uint256[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "swapTokensForExactTokens",
        inputs: [
            {
                name: "amountOut",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "amountInMax",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "path",
                type: "tuple[]",
                internalType: "struct route[]",
                components: [
                    {
                        name: "from",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "stable",
                        type: "bool",
                        internalType: "bool",
                    },
                ],
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "deadline",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "amounts",
                type: "uint256[]",
                internalType: "uint256[]",
            },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "withdraw",
        inputs: [
            {
                name: "pool",
                type: "address",
                internalType: "address",
            },
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "event",
        name: "BribeAttached",
        inputs: [
            {
                name: "gauge",
                type: "address",
                indexed: true,
                internalType: "contract IGauge",
            },
            {
                name: "bribe",
                type: "address",
                indexed: true,
                internalType: "contract IBribe",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "BribeKilled",
        inputs: [
            {
                name: "gauge",
                type: "address",
                indexed: true,
                internalType: "contract IGauge",
            },
            {
                name: "bribe",
                type: "address",
                indexed: true,
                internalType: "contract IBribe",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Convert",
        inputs: [
            {
                name: "pool",
                type: "address",
                indexed: true,
                internalType: "contract IConverter",
            },
            {
                name: "user",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "tokenRef",
                type: "bytes32[]",
                indexed: false,
                internalType: "Token[]",
            },
            {
                name: "delta",
                type: "int128[]",
                indexed: false,
                internalType: "int128[]",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "DiamondCut",
        inputs: [
            {
                name: "_diamondCut",
                type: "tuple[]",
                indexed: false,
                internalType: "struct IVault.FacetCut[]",
                components: [
                    {
                        name: "facetAddress",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "action",
                        type: "uint8",
                        internalType: "enum IVault.FacetCutAction",
                    },
                    {
                        name: "functionSelectors",
                        type: "bytes4[]",
                        internalType: "bytes4[]",
                    },
                ],
            },
            {
                name: "_init",
                type: "address",
                indexed: false,
                internalType: "address",
            },
            {
                name: "_calldata",
                type: "bytes",
                indexed: false,
                internalType: "bytes",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Gauge",
        inputs: [
            {
                name: "pool",
                type: "address",
                indexed: true,
                internalType: "contract IGauge",
            },
            {
                name: "user",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "tokenRef",
                type: "bytes32[]",
                indexed: false,
                internalType: "Token[]",
            },
            {
                name: "delta",
                type: "int128[]",
                indexed: false,
                internalType: "int128[]",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "GaugeKilled",
        inputs: [
            {
                name: "gauge",
                type: "address",
                indexed: true,
                internalType: "contract IGauge",
            },
            {
                name: "killed",
                type: "bool",
                indexed: false,
                internalType: "bool",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Swap",
        inputs: [
            {
                name: "pool",
                type: "address",
                indexed: true,
                internalType: "contract ISwap",
            },
            {
                name: "user",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "tokenRef",
                type: "bytes32[]",
                indexed: false,
                internalType: "Token[]",
            },
            {
                name: "delta",
                type: "int128[]",
                indexed: false,
                internalType: "int128[]",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "UserBalance",
        inputs: [
            {
                name: "to",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "from",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "tokenRef",
                type: "bytes32[]",
                indexed: false,
                internalType: "Token[]",
            },
            {
                name: "delta",
                type: "int128[]",
                indexed: false,
                internalType: "int128[]",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Vote",
        inputs: [
            {
                name: "pool",
                type: "address",
                indexed: true,
                internalType: "contract IGauge",
            },
            {
                name: "user",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "voteDelta",
                type: "int256",
                indexed: false,
                internalType: "int256",
            },
        ],
        anonymous: false,
    },

];


function getRandomAmount(min, max) {
    return Math.random() * (max - min) + min;
}

async function getTokenBalance(contract, address) {
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    return ethers.formatUnits(balance, decimals);
}

async function approveAndSwap(vaultContract, tokenInContract, tokenOutAddress, amountIn, wallet) {
    const amountInBigInt = ethers.parseUnits(amountIn.toFixed(6), 6);
    
    await tokenInContract.approve(vault, amountInBigInt);
    
    const amounts = await vaultContract.getAmountsOut.staticCall(
        amountInBigInt,
        [{ from: USDC_EDU, to: tokenOutAddress, stable: false }]
    );

    if (!amounts || amounts.length < 2) {
        throw new Error("Invalid amounts received from getAmountsOut");
    }

    const minAmountOut = amounts[1] * 99n / 100n; // 1% slippage

    const swapTx = await vaultContract.swapExactTokensForTokens(
        amountInBigInt,
        minAmountOut,
        [{ from: USDC_EDU, to: tokenOutAddress, stable: false }],
        wallet.address,
        Math.floor(Date.now() / 1000) + 60 * 20
    );

    const receipt = await swapTx.wait();
    return { receipt, amountOut: amounts[1] };
}

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const usdcContract = new ethers.Contract(USDC_EDU, ERC20Abi, wallet);
    const sailContract = new ethers.Contract(sail, ERC20Abi, wallet);
    const graspContract = new ethers.Contract(grasp, ERC20Abi, wallet);
    const vaultContract = new ethers.Contract(vault, vaultAbi, wallet);

    let totalGasUsed = 0n;
    let totalSwaps = 0;

    console.log("Starting swap process...");

    while (true) {
        const usdcBalance = await getTokenBalance(usdcContract, wallet.address);
        const swapAmount = getRandomAmount(0.01, Math.min(0.1, parseFloat(usdcBalance)));
        
        if (swapAmount < 0.01) {
            console.log("Insufficient USDC balance for minimum swap. Stopping.");
            break;
        }

        const targetToken = totalSwaps % 2 === 0 ? sail : grasp;
        const tokenName = totalSwaps % 2 === 0 ? "SAIL" : "GRASP";
        
        try {
            const { receipt, amountOut } = await approveAndSwap(vaultContract, usdcContract, targetToken, swapAmount, wallet);
            totalGasUsed += receipt.gasUsed;
            totalSwaps++;
            
            console.log(`Swap #${totalSwaps}: ${swapAmount.toFixed(6)} USDC -> ${ethers.formatEther(amountOut)} ${tokenName} | Gas: ${receipt.gasUsed}`);
        } catch (error) {
            console.error(`Error during swap #${totalSwaps + 1}:`, error.message);
            break;
        }

        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    console.log("\nSwap process completed.");
    console.log(`Total swaps: ${totalSwaps} | Total gas used: ${totalGasUsed}`);
    console.log("\nFinal balances:");
    console.log("USDC:", await getTokenBalance(usdcContract, wallet.address));
    console.log("SAIL:", await getTokenBalance(sailContract, wallet.address));
    console.log("GRASP:", await getTokenBalance(graspContract, wallet.address));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error("An error occurred:", error);
        process.exit(1);
    });