"use strict";

var _winston = require("winston");
var _winstonDailyRotateFile = _interopRequireDefault(require("winston-daily-rotate-file"));
var _logOptions = _interopRequireDefault(require("../config/logOptions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let transportOptions = null;
const file = _logOptions.default.jsonFormat ? _logOptions.default.jsonFile : _logOptions.default.textFile;
const alignFormat = _winston.format.printf(({
  timestamp,
  level,
  message,
  stack
}) => {
  if (stack) {
    return `${timestamp} : [ ${level} ] : ${message}\n${stack}`;
  }
  return `${timestamp} : [ ${level} ] : ${message}`;
});
transportOptions = [new _winstonDailyRotateFile.default(file), new _winston.transports.Console({
  format: _winston.format.combine(_winston.format.errors({
    stack: true
  }), _winston.format.colorize(), alignFormat)
})];
const logger = (0, _winston.createLogger)({
  level: _logOptions.default.level,
  format: _logOptions.default.jsonFormat ? _winston.format.combine(_winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), _winston.format.json()) : _winston.format.combine(_winston.format.errors({
    stack: true
  }), _winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), alignFormat),
  transports: transportOptions,
  exitOnError: false
});
logger.stream = {
  write: function (message, encoding) {
    logger.http(message);
  }
};
module.exports = logger;