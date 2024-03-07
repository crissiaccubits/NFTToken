"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
require("dotenv/config");
var _morgan = _interopRequireDefault(require("morgan"));
var _customServices = _interopRequireDefault(require("./services/customServices"));
var _env = _interopRequireDefault(require("./config/env"));
var _logger = _interopRequireDefault(require("./middleware/logger"));
var _routes = _interopRequireDefault(require("./routes/routes.js"));
var _corsUrls = _interopRequireDefault(require("./constants/corsUrls"));
var _corsHandler = _interopRequireDefault(require("./middleware/corsHandler"));
var _errorHandler = _interopRequireDefault(require("./middleware/errorHandler.js"));
var _httpResponseModel = _interopRequireDefault(require("./models/httpResponseModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use((0, _morgan.default)('short', {
  stream: _logger.default.stream
}));
if (_env.default.NODE_ENV === 'production') {
  if (_env.default.ALLOW_DOMAIN) {
    const domains = _env.default.ALLOW_DOMAIN.split(',');
    domains.forEach(domain => _corsUrls.default.push(domain.toLowerCase()));
  }
  app.use((0, _cors.default)(_corsHandler.default));
} else {
  app.use((0, _cors.default)());
}
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());

//!TO REMOVE
app.use('/', (req, res, next) => {
  _logger.default.log({
    level: 'debug',
    message: JSON.stringify(req.body)
  });
  next();
});
app.use('/api', _routes.default);
app.use('/', async (req, res, next) => {
  res.send(new _httpResponseModel.default(true));
});
app.use(_errorHandler.default);
(0, _customServices.default)().then(async () => {
  try {
    app.emit('ready');
  } catch (e) {
    _logger.default.error(`Error in connecting ${e}`);
  }
}).catch(e => {
  _logger.default.error(`Error connecting : ${e}`);
});
module.exports = app;