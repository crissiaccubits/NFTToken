import express from 'express';
const router = express.Router();

import httpResponse from '../models/httpResponseModel';
import nftService from '../services/nftServices';



const mintTokens = async (req, res, next) => {
  try {

    const {to, tokenCount} = req.body;
    //Validation for mininting count
    if (tokenCount > 9) {
      throw("mininting limit reached");
    }
    //Validation for totalSupply
    const totalSupply  = await nftService.getTotalSupply();

    if (totalSupply > 999 ) {
      throw("Contract Supply is exceeded");
    }
    const receiptformintNFT = await nftService.mintNFT(req.body);
    res.send(
      new httpResponse(
        true,
        { txnHash: receiptformintNFT.transactionHash },
        null
      )
    );
  } catch (e) {
    next(e);
  }
};



const getUserBalance = async (req, res, next) => {
  try {
    const userBalance = await nftService.getUserBalance(owner);
    res.send(new httpResponse(true, { userBalance }, null));
  } catch (e) {
    next(e);
  }
};


router.post('/mintNFT', mintTokens);
router.get('/userBalance', getUserBalance);


module.exports = router;
