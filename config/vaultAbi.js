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

module.exports = vaultAbi;