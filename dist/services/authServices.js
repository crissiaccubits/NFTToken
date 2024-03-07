"use strict";

var _env = require("../config/env");
const crypto = require('crypto');
const createHMAC = async params => {
  const input = params.body || params.params;
  const hmac = crypto.createHmac('sha256', _env.HMAC_SECRET_KEY);
  hmac.update(JSON.stringify(input));
  const computedHMAC = hmac.digest('hex');
  return computedHMAC;
};
module.exports = {
  createHMAC
};