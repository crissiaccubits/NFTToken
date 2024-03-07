"use strict";

var _abis = _interopRequireDefault(require("./abis"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
module.exports = Object.freeze({
  BIREGISTRY: {
    address: process.env.BIREGISTRY_CONTRACT_ADDRESS,
    abi: _abis.default.BIRegistry
  },
  NETWORKS: {
    ETH: {
      admin: process.env.ETH_ADMIN_ADDRESS,
      platformWallet: process.env.ETH_PLATFORM_WALLET_ADDRESS,
      chain: 'ETH'
    }
  }
});