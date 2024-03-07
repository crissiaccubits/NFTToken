"use strict";

var _env = require("../config/env");
const crypto = require('crypto');
const verifyHMAC = (req, res, next) => {
  const params = req.body;
  const receivedHMAC = req.headers['x-hmac'];
  const hmac = crypto.createHmac('sha256', _env.HMAC_SECRET_KEY);
  hmac.update(JSON.stringify(params));
  const computedHMAC = hmac.digest('hex');
  if (receivedHMAC === computedHMAC) {
    next();
  } else {
    const unauthorizedError = new Error('UnauthorizedError');
    next(unauthorizedError);
  }
};
module.exports = verifyHMAC;