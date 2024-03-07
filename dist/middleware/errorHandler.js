"use strict";

var _expressValidation = _interopRequireDefault(require("express-validation"));
var _web = _interopRequireDefault(require("../services/web3"));
var _logger = _interopRequireDefault(require("../middleware/logger.js"));
var _errors = _interopRequireDefault(require("../constants/errors.js"));
var _httpResponseModel = _interopRequireDefault(require("../models/httpResponseModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const errorHandler = async (err, req, res, next) => {
  let errorObj;
  if (err instanceof _expressValidation.default.ValidationError) {
    // Validation Errors
    errorObj = {
      message: _errors.default.VALIDATION_ERROR.message,
      details: err
    };
    _logger.default.error(JSON.stringify(errorObj));
    return res.status(_errors.default.VALIDATION_ERROR.status).send(new _httpResponseModel.default(false, null, errorObj));
  } else if (err && err.name === 'UnauthorizedError' || err.message === 'UnauthorizedError') {
    const ERR = _errors.default.UNAUTHORIZED_ERROR;
    errorObj = {
      message: ERR.message,
      details: err.message
    };
    _logger.default.error(JSON.stringify(errorObj));
    return res.status(ERR.status).send(new _httpResponseModel.default(false, null, errorObj));
  } else if (err && Object.keys(_errors.default).includes(err.message)) {
    //Custom errors
    const ERR = _errors.default[err.message];
    errorObj = {
      message: err.message,
      details: ERR.message
    };
    _logger.default.error(JSON.stringify(errorObj));
    return res.status(ERR.status).send(new _httpResponseModel.default(false, null, errorObj));
  } else {
    // Internal Server errors or EVM errors
    const errorObj = {
      message: _errors.default.SERVER_ERROR.message,
      details: err.message
    };
    if (err.message === 'Returned error: Execution reverted' && err.data !== '0x') {
      errorObj.details = await getRevertReason(err);
    }
    _logger.default.error(JSON.stringify(errorObj));
    return res.status(_errors.default.SERVER_ERROR.status).send(new _httpResponseModel.default(false, null, errorObj));
  }
};
const getRevertReason = async err => {
  try {
    return _web.default.utils.hexToAscii(err.data).slice(68).replace(/[^A-Za-z0-9,!'// ]/gi, '');
  } catch (e) {
    return 'Unable to get more details.';
  }
};
module.exports = errorHandler;