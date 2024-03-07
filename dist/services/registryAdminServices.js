"use strict";

var _commonServices = _interopRequireDefault(require("./commonServices"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const addAdmin = async params => {
  return _commonServices.default.performContractAction(params, 'addAdmin', 'admin', 'admin');
};
const removeAdmin = async params => {
  return _commonServices.default.performContractAction(params, 'removeAdmin', 'admin', 'admin');
};
const addPlatformWallet = async params => {
  return _commonServices.default.performContractAction(params, 'addPlatformWallet', 'platformWallet', 'admin');
};
const removePlatformWallet = async params => {
  return _commonServices.default.performContractAction(params, 'removePlatformWallet', 'platformWallet', 'admin');
};
const suspendDID = async params => {
  return _commonServices.default.performContractAction(params, 'suspendDID', 'did', 'admin');
};
const unsuspendDID = async params => {
  return _commonServices.default.performContractAction(params, 'unSuspendDID', 'did', 'admin');
};
const terminateDID = async params => {
  return _commonServices.default.performContractAction(params, 'terminateDID', 'did', 'admin');
};
const suspendVC = async params => {
  return _commonServices.default.performContractAction(params, 'suspendVC', 'vcHash', 'admin');
};
const unsuspendVC = async params => {
  return _commonServices.default.performContractAction(params, 'unSuspendVC', 'vcHash', 'admin');
};
const terminateVC = async params => {
  return _commonServices.default.performContractAction(params, 'terminateVC', 'vcHash', 'admin');
};
module.exports = {
  addAdmin,
  removeAdmin,
  addPlatformWallet,
  removePlatformWallet,
  suspendDID,
  unsuspendDID,
  terminateDID,
  suspendVC,
  unsuspendVC,
  terminateVC
};