import { default as Common } from '@ethereumjs/common';
import { Transaction as Tx } from '@ethereumjs/tx';
import BigNumber from 'bignumber.js';


import config from '../config/env';
import web3 from './web3.js';
import getCustomWeb3 from './customWeb3';
import getWeb3Instance from './customWeb3';
import network from '../constants/networks';
import { getNonce } from './nonceManagerService';


const getRawTransaction = async (from, to, gasLimit, gasPrice,  data, chain, value = '0x0') => {
 
  const nonceCount = await getNonce(chain, from);
  const txObject = {
    from,
    to,
    nonce: await web3.utils.toHex(nonceCount),
    gasPrice,
    gasLimit: await web3.utils.toHex(gasLimit),
    value,
    data,
  };
  return txObject;
};

const buildTransaction = async (from, to, gasLimit,gasPrice, data, chain, value = '0x0') => {
  const txObject = await getRawTransaction(from, to, gasLimit, gasPrice, data, chain, value);
  const common = Common.custom(network[chain][config.NETWORK]);
  return Tx.fromTxData(txObject, {
    common,
  });
};

const signTxnWithPrivateKey = async (chain, txnBuild) => {
  const common = Common.custom(network[chain][config.NETWORK]);
  const txn = Tx.fromTxData(txnBuild, { common });
  let privateKey = Buffer.from(process.env.ADMIN_PRIVATE_KEY, 'hex');
  const signedTxn = txn.sign(privateKey);
  const serializedTx = signedTxn.serialize();
  const customWeb3 = await getCustomWeb3(chain);
  const receipt = await customWeb3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
  return receipt;
};
const getGasPrice = async (chain) => {
  const web3 = await getWeb3Instance(chain);
  const currentGasPrice = await web3.eth.getGasPrice();
  const gasPriceBN = BigNumber(currentGasPrice);
  const gasPriceAddOnBn = BigNumber(config.GAS_ADD_ON[chain]);
  return '0x' + gasPriceBN.plus(gasPriceAddOnBn).toString(16);
};

module.exports = {
  buildTransaction,
  signTxnWithPrivateKey,
  getGasPrice
};
