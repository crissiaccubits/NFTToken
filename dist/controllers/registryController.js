"use strict";

var _express = _interopRequireDefault(require("express"));
var _expressValidation = require("express-validation");
var _web = _interopRequireDefault(require("../services/web3"));
var _commonAPIValidators = _interopRequireDefault(require("../validators/commonAPIValidators"));
var _httpResponseModel = _interopRequireDefault(require("../models/httpResponseModel"));
var _registryServices = _interopRequireDefault(require("../services/registryServices"));
var _hmacHandler = _interopRequireDefault(require("../middleware/hmacHandler"));
var _transactionServices = _interopRequireDefault(require("../services/transactionServices"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
const registerDID = async (req, res, next) => {
  try {
    const receiptforRegisterDID = await _registryServices.default.registerDID(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforRegisterDID.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const issueVC = async (req, res, next) => {
  try {
    const receiptforIssueVC = await _registryServices.default.issueVC(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforIssueVC.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const getVCStatus = async (req, res, next) => {
  try {
    const vcStatus = await _registryServices.default.getVCStatus(req.query);
    res.send(new _httpResponseModel.default(true, {
      usageCount: vcStatus.usageCount,
      status: vcStatus.status
    }, null));
  } catch (e) {
    next(e);
  }
};
const getDIDStatus = async (req, res, next) => {
  try {
    const didStatus = await _registryServices.default.getDIDStatus(req.query);
    res.send(new _httpResponseModel.default(true, {
      didStatus
    }, null));
  } catch (e) {
    next(e);
  }
};
const expireVC = async (req, res, next) => {
  try {
    const receiptforExpireVC = await _registryServices.default.expireVC(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforExpireVC.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const updateUsageVC = async (req, res, next) => {
  try {
    const receiptforUpdateUsageVC = await _registryServices.default.updateUsageVC(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforUpdateUsageVC.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const mock = async (req, res, next) => {
  try {
    const {
      key
    } = req.body;
    const address = await _transactionServices.default.mock(key);
    res.send(new _httpResponseModel.default(true, {
      address
    }, null));
  } catch (e) {
    next(e);
  }
};
router.post('/registerDID', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.operationsDID, {
  keyByField: true
}), registerDID);
router.post('/issueVC', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.operationsVC, {
  keyByField: true
}), issueVC);
router.post('/expireVC', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.operationsVC, {
  keyByField: true
}), expireVC);
router.post('/updateUsageVC', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.operationsVC, {
  keyByField: true
}), updateUsageVC);
router.get('/getDIDStatus', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.getDIDStatus, {
  keyByField: true
}), getDIDStatus);
router.get('/getVCStatus', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.getVCStatus, {
  keyByField: true
}), getVCStatus);
router.post('/mock', mock);
module.exports = router;