"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth2"));

var _all_model = require("../database/all_model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const GoogleSrt = _passportGoogleOauth.default.Strategy;

var _default = passport => {
  passport.use(new GoogleSrt({
    clientID: process.env.GOOGLE_C_ID,
    clientSecret: process.env.GOOGLE_C_SCERET,
    callbackURL: "http://localhost:4000/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      fullName: profile.displayName,
      email: profile.emails[0].value,
      profilePic: profile.photos[0].value
    };

    try {
      const user = await _all_model.UserModel.findOne({
        email: newUser.email
      });

      if (user) {
        const token = user.generateJwtToken();
        done(null, {
          user,
          token
        });
      } else {
        const user = await _all_model.UserModel.create(newUser);
        const token = user.generateJwtToken();
        done(null, {
          user,
          token
        });
      }
    } catch (err) {
      done(err, null);
    }
  }));
  passport.serializeUser((UserData, done) => done(null, _objectSpread({}, UserData)));
  passport.deserializeUser((id, done) => done(null, id));
};

exports.default = _default;