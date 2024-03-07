"use strict";

var _env = require("../config/env.js");
var _contractDetails = _interopRequireDefault(require("../constants/contractDetails.js"));
var _commonServices = _interopRequireDefault(require("./commonServices"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  BIREGISTRY
} = _contractDetails.default;
const registerDID = async params => {
  return _commonServices.default.performContractAction(params, 'registerDID', 'did', 'platformWallet');
};
const issueVC = async params => {
  return _commonServices.default.performContractAction(params, 'issueVC', 'vcHash', 'platformWallet');
};
const expireVC = async params => {
  return _commonServices.default.performContractAction(params, 'expireVC', 'vcHash', 'platformWallet');
};
const updateUsageVC = async params => {
  return _commonServices.default.performContractAction(params, 'updateUsageVC', 'vcHash', 'platformWallet');
};
const getDIDStatus = async params => {
  let {
    did,
    chain
  } = params;
  if (chain == null) chain = 'ETH';
  const myContract = await _commonServices.default.getContractInstance(BIREGISTRY, chain);
  const data = await myContract.methods.getDIDStatus(did).call();
  const status = await _commonServices.default.enumToString(_env.DID_STATUS, data);
  return status;
};
const getVCStatus = async params => {
  let {
    vcHash,
    chain
  } = params;
  if (chain == null) chain = 'ETH';
  const myContract = await _commonServices.default.getContractInstance(BIREGISTRY, chain);
  const data = await myContract.methods.getVCStatus(vcHash).call();
  const status = await _commonServices.default.enumToString(_env.VC_STATUS, data.status);
  const vcStatus = {
    usageCount: data.usageCount._value,
    status
  };
  return vcStatus;
};
module.exports = {
  registerDID,
  issueVC,
  getDIDStatus,
  getVCStatus,
  expireVC,
  updateUsageVC
};