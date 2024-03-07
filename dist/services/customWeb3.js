"use strict";

var _web = _interopRequireDefault(require("web3"));
var _env = _interopRequireDefault(require("../config/env.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getWeb3Instance = chain => {
  const web3 = new _web.default(new _web.default.providers.HttpProvider(_env.default.RPC_URL[chain]));
  web3.eth.handleRevert = true;
  return web3;
};
module.exports = getWeb3Instance;