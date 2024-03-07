"use strict";

module.exports = Object.freeze({
  SERVER_ERROR: {
    status: 500,
    message: 'Internal Server Error.'
  },
  VALIDATION_ERROR: {
    status: 400,
    message: 'Validation Failed.'
  },
  UNAUTHORIZED_ERROR: {
    status: 401,
    message: 'Unauthorized Error'
  },
  CORS_DISABLED: {
    status: 403,
    message: 'CORS Disabled'
  }
});