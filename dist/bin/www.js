"use strict";

var _http = _interopRequireDefault(require("http"));
var _app = _interopRequireDefault(require("../app"));
var _env = _interopRequireDefault(require("../config/env"));
var _logger = _interopRequireDefault(require("../middleware/logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Get port from config and store in Express.
 */

const port = normalizePort(_env.default.PORT);
_app.default.set('port', port);

/**
 * Create HTTP server.
 */

const server = _http.default.createServer(_app.default);

/**
 * Listen on provided port, on all network interfaces.
 */
_app.default.on('ready', () => {
  server.listen(port);
  server.keepAliveTimeout = 61 * 1000;
  server.headersTimeout = 65 * 1000;
  server.on('error', onError);
  server.on('listening', onListening);
});

/**
 * Normalize a port into a number, string, or false.
 * @param {*} val Port number
 * @return {*} Normalized port number
 */
function normalizePort(val) {
  const normalizedPort = parseInt(val, 10);
  if (isNaN(normalizedPort)) {
    // named pipe
    return val;
  }
  if (normalizedPort >= 0) {
    // port number
    return normalizedPort;
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 * @param {*} error
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      _logger.default.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      _logger.default.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  _logger.default.info('Listening on ' + bind);
  server.emit('ready');
}
module.exports = server;