import getWeb3Instance from './customWeb3';

const getNonce = async (chain, address) => {
  const web3 = await getWeb3Instance(chain);
  return await web3.eth.getTransactionCount(address);
};
module.exports = { getNonce };
