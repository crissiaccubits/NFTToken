"use strict";

var _expressValidation = require("express-validation");
const schema = {
  operationsDID: {
    body: _expressValidation.Joi.object({
      did: _expressValidation.Joi.string().length(42).required(),
      chain: _expressValidation.Joi.string().valid('ETH').optional()
    })
  },
  operationsVC: {
    body: _expressValidation.Joi.object({
      vcHash: _expressValidation.Joi.string().required(),
      chain: _expressValidation.Joi.string().valid('ETH').optional()
    })
  },
  getDIDStatus: {
    query: _expressValidation.Joi.object({
      did: _expressValidation.Joi.string().length(42).required(),
      chain: _expressValidation.Joi.string().valid('ETH').optional()
    })
  },
  getVCStatus: {
    query: _expressValidation.Joi.object({
      vcHash: _expressValidation.Joi.string().required(),
      chain: _expressValidation.Joi.string().valid('ETH').optional()
    })
  },
  addAdmin: {
    body: _expressValidation.Joi.object({
      admin: _expressValidation.Joi.string().length(42).required(),
      chain: _expressValidation.Joi.string().valid('ETH').optional()
    })
  },
  removeAdmin: {
    body: _expressValidation.Joi.object({
      admin: _expressValidation.Joi.string().length(42).required(),
      chain: _expressValidation.Joi.string().valid('ETH').optional()
    })
  },
  addPlatformWallet: {
    body: _expressValidation.Joi.object({
      platformWallet: _expressValidation.Joi.string().length(42).required(),
      chain: _expressValidation.Joi.string().valid('ETH').optional()
    })
  },
  removePlatformWallet: {
    body: _expressValidation.Joi.object({
      platformWallet: _expressValidation.Joi.string().length(42).required(),
      chain: _expressValidation.Joi.string().valid('ETH').optional()
    })
  }
};
module.exports = schema;