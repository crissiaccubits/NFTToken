import { pathToRegexp } from 'path-to-regexp';

const OPEN_ACCESS_URLS = [
  { url: '/', methods: ['GET'] },
  { url: '/docs', methods: ['GET'] },
  pathToRegexp('/docs/(.*)'),
];
module.exports = OPEN_ACCESS_URLS;
