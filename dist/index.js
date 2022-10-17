"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _passport = _interopRequireDefault(require("passport"));

var _route = _interopRequireDefault(require("./config/route.config"));

var _google = _interopRequireDefault(require("./config/google.config"));

var _connection = _interopRequireDefault(require("./database/connection"));

var _auth = _interopRequireDefault(require("./api/auth"));

var _food = _interopRequireDefault(require("./api/food"));

var _menu = _interopRequireDefault(require("./api/menu"));

var _order = _interopRequireDefault(require("./api/order"));

var _review = _interopRequireDefault(require("./api/review"));

var _images = _interopRequireDefault(require("./api/images"));

var _restaurant = _interopRequireDefault(require("./api/restaurant"));

var _user = _interopRequireDefault(require("./api/user"));

var _expressSession = _interopRequireDefault(require("express-session"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const Zomato = (0, _express.default)();
(0, _route.default)(_passport.default);
(0, _google.default)(_passport.default);
Zomato.use(_express.default.json());
Zomato.use((0, _expressSession.default)({
  secret: process.env.KEY
}));
Zomato.use(_passport.default.initialize());
Zomato.use(_passport.default.session());
Zomato.get("/", (req, res) => {
  res.json({
    message: "server is running"
  });
});
Zomato.use("/auth", _auth.default);
Zomato.use("/food", _food.default);
Zomato.use("/res", _restaurant.default);
Zomato.use("/user", _user.default);
Zomato.use("/menu", _menu.default);
Zomato.use("/order", _order.default);
Zomato.use("/review", _review.default);
Zomato.use("/image", _images.default);
Zomato.listen(4000, () => {
  // console.log("server is running!!!!");
  (0, _connection.default)().then(() => {
    console.log("server is running and database is connected");
  }).catch(err => {
    console.log("server is running but database is not connected(failed......)");
    console.log(err);
  });
});