"use strict";

var _express = _interopRequireDefault(require("express"));
var _httpResponseModel = _interopRequireDefault(require("../models/httpResponseModel"));
var _authServices = _interopRequireDefault(require("../services/authServices"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
const createHMAC = async (req, res, next) => {
  try {
    const computedHMAC = await _authServices.default.createHMAC(req);
    res.send(new _httpResponseModel.default(true, {
      computedHMAC
    }, null));
  } catch (e) {
    next(e);
  }
};
router.post('/createHMAC', createHMAC);
module.exports = router;