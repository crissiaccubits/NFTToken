"use strict";

var _express = _interopRequireDefault(require("express"));
var _registryController = _interopRequireDefault(require("../controllers/registryController"));
var _registryAdminController = _interopRequireDefault(require("../controllers/registryAdminController"));
var _authController = _interopRequireDefault(require("../controllers/authController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.use('/auth', _authController.default);
router.use('/registry', _registryController.default);
router.use('/registry/admin', _registryAdminController.default);
module.exports = router;