"use strict";

var _pathToRegexp = require("path-to-regexp");
const OPEN_ACCESS_URLS = [{
  url: '/',
  methods: ['GET']
}, {
  url: '/docs',
  methods: ['GET']
}, (0, _pathToRegexp.pathToRegexp)('/docs/(.*)')];
module.exports = OPEN_ACCESS_URLS;