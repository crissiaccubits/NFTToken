"use strict";

var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logOptions = {
  level: 'debug',
  jsonFormat: false,
  textFile: {
    filename: 'log',
    dirname: _path.default.join(__dirname, '/../../logs'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    utc: true,
    extension: '.txt'
  },
  jsonFile: {
    filename: 'log',
    dirname: _path.default.join(__dirname, '/../../logs'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    utc: true,
    extension: '.json'
  }
};
module.exports = logOptions;