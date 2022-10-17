"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

var _all_model = require("../database/all_model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const JwtStrategy = _passportJwt.default.Strategy;
const ExtractJwt = _passportJwt.default.ExtractJwt;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoApp"
};

var _default = passport => {
  passport.use(new JwtStrategy(options, async (jwt__payload, done) => {
    try {
      const doesUserExits = await _all_model.UserModel.findById(jwt__payload.user);
      if (!doesUserExits) return done(null, false);
      return done(null, doesUserExits);
    } catch (error) {
      throw new Error(error.message);
    }
  }));
};

exports.default = _default;