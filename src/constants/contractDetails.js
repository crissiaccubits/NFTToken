import ABIS from './abis';
module.exports = Object.freeze({
  NFTCONTRACT: {
    address: process.env.NFT_CONTRACT_ADDRESS,
    abi: ABIS.NFTCONTRACT,
  },
  NETWORKS: {
    ETH: {
      admin: process.env.ETH_ADMIN_ADDRESS,
      platformWallet : process.env.ETH_PLATFORM_WALLET_ADDRESS,
      chain: 'ETH',
    }
  }
});
