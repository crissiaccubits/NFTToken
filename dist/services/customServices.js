"use strict";

var _env = require("../config/env");
const connectServices = async () => {
  if (_env.NODE_ENV === 'production') {} else {}
  return;
};
module.exports = connectServices;