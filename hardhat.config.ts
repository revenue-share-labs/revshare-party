import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "@nomiclabs/hardhat-ethers";

require("@nomicfoundation/hardhat-verify");
require('dotenv').config();
const PRIVATE_KEY = process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : ""
const TESTNET_RPC = process.env.TESTNET_RPC ? process.env.TESTNET_RPC : ""
const MAINNET_RPC = process.env.MAINNET_RPC ? process.env.MAINNET_RPC : ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY ? process.env.ETHERSCAN_API_KEY : ""

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: MAINNET_RPC,
      }
    },
    sepolia_linea: {
      url: TESTNET_RPC,
      accounts: [PRIVATE_KEY],
      chainId: 59141
    },
    linea: {
      url: MAINNET_RPC,
      accounts: [PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    // {
    //   sepolia_linea:,
    // }
    // customChains: [{
    //   '59141': {
    //     verifyUrl: "https://api-sepolia.lineascan.build/api", // The URL to the explorer API for verification
    //     apiKey: ETHERSCAN_API_KEY // API key if required by the explorer

    customChains: [
      {
        network: "sepolia_linea",
        chainId: 59141,
        urls: {
          apiURL: "https://api-sepolia.lineascan.build/api",
          browserURL: "https://api-sepolia.lineascan.build/api"
        }
      }
    ],
  },
}

export default config;
