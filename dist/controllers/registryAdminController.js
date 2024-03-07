"use strict";

var _express = _interopRequireDefault(require("express"));
var _expressValidation = require("express-validation");
var _commonAPIValidators = _interopRequireDefault(require("../validators/commonAPIValidators"));
var _httpResponseModel = _interopRequireDefault(require("../models/httpResponseModel"));
var _registryAdminServices = _interopRequireDefault(require("../services/registryAdminServices"));
var _hmacHandler = _interopRequireDefault(require("../middleware/hmacHandler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
const addAdmin = async (req, res, next) => {
  try {
    const receiptforAddAdmin = await _registryAdminServices.default.addAdmin(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforAddAdmin.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const removeAdmin = async (req, res, next) => {
  try {
    const receiptforRemoveAdmin = await _registryAdminServices.default.removeAdmin(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforRemoveAdmin.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const addPlatformWallet = async (req, res, next) => {
  try {
    const receiptforAddPlatformWallet = await _registryAdminServices.default.addPlatformWallet(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforAddPlatformWallet.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const removePlatformWallet = async (req, res, next) => {
  try {
    const receiptforRemovePlatformWallet = await _registryAdminServices.default.removePlatformWallet(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforRemovePlatformWallet.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const registerDID = async (req, res, next) => {
  try {
    const receiptforRegisterDID = await _registryAdminServices.default.registerDID(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforRegisterDID.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const suspendDID = async (req, res, next) => {
  try {
    const receiptforSuspendDID = await _registryAdminServices.default.suspendDID(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforSuspendDID.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const unsuspendDID = async (req, res, next) => {
  try {
    const receiptforUnSuspendDID = await _registryAdminServices.default.unsuspendDID(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforUnSuspendDID.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const terminateDID = async (req, res, next) => {
  try {
    const receiptforterminateDID = await _registryAdminServices.default.terminateDID(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforterminateDID.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const suspendVC = async (req, res, next) => {
  try {
    const receiptforSuspendVC = await _registryAdminServices.default.suspendVC(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforSuspendVC.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const unsuspendVC = async (req, res, next) => {
  try {
    const receiptforUnSuspendVC = await _registryAdminServices.default.unsuspendVC(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforUnSuspendVC.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
const terminateVC = async (req, res, next) => {
  try {
    const receiptforterminateVC = await _registryAdminServices.default.terminateVC(req.body);
    res.send(new _httpResponseModel.default(true, {
      txnHash: receiptforterminateVC.transactionHash
    }, null));
  } catch (e) {
    next(e);
  }
};
router.post('/addAdmin', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.addAdmin, {
  keyByField: true
}), addAdmin);
router.post('/removeAdmin', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.removeAdmin, {
  keyByField: true
}), removeAdmin);
router.post('/addPlatformWallet', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.addPlatformWallet, {
  keyByField: true
}), addPlatformWallet);
router.post('/removePlatformWallet', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.removePlatformWallet, {
  keyByField: true
}), removePlatformWallet);
router.post('/suspendDID', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.operationsDID, {
  keyByField: true
}), suspendDID);
router.post('/unsuspendDID', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.operationsDID, {
  keyByField: true
}), unsuspendDID);
router.post('/terminateDID', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.operationsDID, {
  keyByField: true
}), terminateDID);
router.post('/suspendVC', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.operationsVC, {
  keyByField: true
}), suspendVC);
router.post('/unsuspendVC', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.operationsVC, {
  keyByField: true
}), unsuspendVC);
router.post('/terminateVC', _hmacHandler.default, (0, _expressValidation.validate)(_commonAPIValidators.default.operationsVC, {
  keyByField: true
}), terminateVC);
module.exports = router;