"use strict";

var _corsUrls = _interopRequireDefault(require("../constants/corsUrls"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const corsOptionsDelegate = (req, callback) => {
  // eslint-disable-next-line max-len
  // if (req.header('Origin') && corsEnabledURLs.indexOf(req.header('Origin').toLowerCase()) !== -1) {
  callback(null, true);
  // } else {
  //   callback(new Error('CORS_DISABLED')); // disable CORS for this request
  // }
};
module.exports = corsOptionsDelegate;