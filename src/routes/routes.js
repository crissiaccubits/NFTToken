import express from 'express';
const router = express.Router();

import nftAPIs from '../controllers/nftController';

router.use('/nft', nftAPIs);

module.exports = router;
