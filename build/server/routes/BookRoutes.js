"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _bookController = _interopRequireDefault(require("../controllers/bookController"));

var router = (0, _express.Router)();
router.get('/', _bookController["default"].getAllBooks);
router.post('/', _bookController["default"].addBook);
router.get('/:id', _bookController["default"].getABook);
router.put('/:id', _bookController["default"].updatedBook);
router["delete"]('/:id', _bookController["default"].deleteBook);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=BookRoutes.js.map