import contracts from '../constants/contractDetails.js';
import cmnServices from './commonServices';

const { NFTCONTRACT } = contracts;


const mintNFT = async (params) => {
  //params include to, tokenCount, sender
  return cmnServices.performContractMintAction(params);
};


const getNFTBlance = async (params) => {
  let { user } = params;
  if (chain == null) chain = 'ETH';
  const myContract = await cmnServices.getContractInstance(NFTCONTRACT, chain);
  const data = await myContract.methods.getBalance(user).call();
  return data;
};

const getTotalSupply = async () => {
  if (chain == null) chain = 'ETH';
  const myContract = await cmnServices.getContractInstance(NFTCONTRACT, chain);
  const data = await myContract.methods.getTotalSupply().call();
  return data;
};


module.exports = {
  mintNFT,
  getNFTBlance,
  getTotalSupply
};
