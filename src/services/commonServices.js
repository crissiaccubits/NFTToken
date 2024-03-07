import getWeb3Instance from './customWeb3';
import contracts from '../constants/contractDetails.js';
import {
  signTxnWithPrivateKey,
  getGasPrice
} from './transactionServices';

const { NFTCONTRACT } = contracts;

const getContractInstance = async (contractCode, chain) => {
  let abi = contractCode.abi;
  let address = contractCode.address;
  const web3 = await getWeb3Instance(chain);
  return await new web3.eth.Contract(abi, address);
};

const performContractMintAction = async (params ) => {
  let { to, tokenCount,sender} = params;
  if (chain == null) chain = 'ETH';
  const txnInfo = {};
  txnInfo.chain = chain;
  txnInfo.from = sender;
  const myContract = await getContractInstance(NFTCONTRACT, chain);
  txnInfo.to = NFTCONTRACT.address;
  txnInfo.gasLimit = await myContract.methods[action](id).estimateGas({
    from:sender,
  });
  txnInfo.data = await myContract.methods.safeMint(to,tokenCount).encodeABI();
  txnInfo.gasPrice = await getGasPrice(chain);
  const txnReceipt = await signTxnWithPrivateKey(txnInfo);
  return txnReceipt;
};


module.exports = {
  getContractInstance,
  performContractMintAction,
};
