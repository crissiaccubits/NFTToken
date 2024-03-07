"use strict";

var _common = _interopRequireDefault(require("@ethereumjs/common"));
var _tx = require("@ethereumjs/tx");
var _bignumber = _interopRequireDefault(require("bignumber.js"));
var _ethereumjsTx = require("ethereumjs-tx");
var _env = _interopRequireDefault(require("../config/env"));
var _web = _interopRequireDefault(require("./web3.js"));
var _customWeb = _interopRequireDefault(require("./customWeb3"));
var _networks = _interopRequireDefault(require("../constants/networks"));
var _nonceManagerService = require("./nonceManagerService");
var _kmsServices = _interopRequireDefault(require("./kmsServices"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getRawTransaction = async (from, to, gasLimit, gasPrice, data, chain, value = '0x0') => {
  const nonceCount = await (0, _nonceManagerService.getNonce)(chain, from);
  const txObject = {
    from,
    to,
    nonce: await _web.default.utils.toHex(nonceCount),
    gasPrice,
    gasLimit: await _web.default.utils.toHex(gasLimit),
    value,
    data
  };
  return txObject;
};
const buildTransaction = async (from, to, gasLimit, gasPrice, data, chain, value = '0x0') => {
  const txObject = await getRawTransaction(from, to, gasLimit, gasPrice, data, chain, value);
  const common = _common.default.custom(_networks.default[chain][_env.default.NETWORK]);
  return _tx.Transaction.fromTxData(txObject, {
    common
  });
};
const signTxnWithPrivateKey = async (chain, signer, txnBuild) => {
  const common = _common.default.custom(_networks.default[chain][_env.default.NETWORK]);
  const txn = _tx.Transaction.fromTxData(txnBuild, {
    common
  });
  let privateKey;
  if (signer.toLowerCase() === 'admin') {
    privateKey = Buffer.from(process.env.ADMIN1_PRIVATE_KEY, 'hex');
  } else if (signer.toLowerCase() === 'platformwallet') {
    privateKey = Buffer.from(process.env.ADMIN2_PRIVATE_KEY, 'hex');
  }
  const signedTxn = txn.sign(privateKey);
  const serializedTx = signedTxn.serialize();
  const customWeb3 = await (0, _customWeb.default)(chain);
  const receipt = await customWeb3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
  return receipt;
};
const getGasPrice = async chain => {
  const web3 = await (0, _customWeb.default)(chain);
  const currentGasPrice = await web3.eth.getGasPrice();
  const gasPriceBN = (0, _bignumber.default)(currentGasPrice);
  const gasPriceAddOnBn = (0, _bignumber.default)(_env.default.GAS_ADD_ON[chain]);
  return '0x' + gasPriceBN.plus(gasPriceAddOnBn).toString(16);
};
const signTxnWithKMS = async params => {
  const {
    from,
    to,
    gasLimit,
    gasPrice,
    data,
    chain,
    key
  } = params;
  const fetchSign = await _kmsServices.default.fetchSignature(key);
  const rawTransaction = await getRawTransaction(from, to, gasLimit, gasPrice, data, chain);
  // Setting up r,s,v in rawTransaction
  rawTransaction.r = fetchSign.r;
  rawTransaction.s = fetchSign.s;
  rawTransaction.v = fetchSign.v;
  const common = _common.default.custom(_networks.default[chain][_env.default.NETWORK]);
  const tx = new _ethereumjsTx.Transaction(rawTransaction, {
    common
  });
  const txHash = tx.hash(false);
  const serializedTx = await _kmsServices.default.fetchSerializedTx(txHash, tx, key);
  const receipt = await _web.default.eth.sendSignedTransaction(serializedTx);
  return receipt;
};
//! REMOVE
const mock = async key => {
  return _kmsServices.default.fetchSignature(key);
};
module.exports = {
  buildTransaction,
  signTxnWithPrivateKey,
  getGasPrice,
  signTxnWithKMS,
  mock
};