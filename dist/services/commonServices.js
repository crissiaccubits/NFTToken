"use strict";

var _customWeb = _interopRequireDefault(require("./customWeb3"));
var _contractDetails = _interopRequireDefault(require("../constants/contractDetails.js"));
var _transactionServices = require("./transactionServices");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  NETWORKS,
  BIREGISTRY
} = _contractDetails.default;
const getContractInstance = async (contractCode, chain) => {
  let abi = contractCode.abi;
  let address = contractCode.address;
  const web3 = await (0, _customWeb.default)(chain);
  return await new web3.eth.Contract(abi, address);
};
const checkStatus = async (chain, txnId) => {
  const web3 = await (0, _customWeb.default)(chain);
  const status = await web3.eth.getTransactionReceipt(txnId);
  return status;
};
const enumToString = async (enumObj, value) => {
  const keys = Object.keys(enumObj).filter(key => parseInt(enumObj[key]) == value);
  return keys.length > 0 ? keys[0] : null;
};
const performContractAction = async (params, action, paramKey, fromRole) => {
  let {
    [paramKey]: id,
    chain,
    sender
  } = params;
  if (chain == null) chain = 'ETH';
  if (sender == null) sender = NETWORKS[chain][fromRole];
  const txnInfo = {};
  txnInfo.key = fromRole === 'platformwallet' ? 'platformwallet' : 'admin';
  txnInfo.chain = chain;
  txnInfo.from = sender;
  const myContract = await getContractInstance(BIREGISTRY, chain);
  txnInfo.to = BIREGISTRY.address;
  txnInfo.gasLimit = await myContract.methods[action](id).estimateGas({
    from: sender
  });
  txnInfo.data = await myContract.methods[action](id).encodeABI();
  txnInfo.gasPrice = await (0, _transactionServices.getGasPrice)(chain);
  const txnReceipt = await (0, _transactionServices.signTxnWithKMS)(txnInfo);
  return txnReceipt;
};
//const performContractAction = async (params, action, paramKey, fromRole) => {
// let { [paramKey]: id, chain, sender } = params;
// if (chain == null) chain = 'ETH';
// if (sender == null) sender = NETWORKS[chain][fromRole];

// const from = sender;
// const myContract = await getContractInstance(BIREGISTRY, chain);
// const to = BIREGISTRY.address;
// const gasLimit = await myContract.methods[action](id).estimateGas({
//   from,
// });
// const data = await myContract.methods[action](id).encodeABI();
// const gasPrice = await getGasPrice(chain);
// const txnBuild = await buildTransaction(from, to, gasLimit, gasPrice, data, chain);
// const txnReceipt = await signTxnWithPrivateKey(chain, fromRole, txnBuild);
//return txnReceipt;
//};

module.exports = {
  getContractInstance,
  checkStatus,
  enumToString,
  performContractAction
};