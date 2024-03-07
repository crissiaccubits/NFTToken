"use strict";

var _customWeb = _interopRequireDefault(require("./customWeb3"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getNonce = async (chain, address) => {
  const web3 = await (0, _customWeb.default)(chain);
  return await web3.eth.getTransactionCount(address);
};
module.exports = {
  getNonce
};