"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _BookRoutes = _interopRequireDefault(require("./server/routes/BookRoutes"));

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
var port = process.env.PORT || 7000;
app.use('/api/v1/books', _BookRoutes["default"]);
app.get('*', function (req, res) {
  return res.status(200).send({
    message: 'this is the api'
  });
});
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=index.js.map