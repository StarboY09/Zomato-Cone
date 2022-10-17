"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _all_model = require("../../database/all_model");

var _auth = require("../../validation/auth.validataion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Router = _express.default.Router();
/**
 * Route = /signup
 * does =   create a user
 * params =None
 * Access = Private
 * Method = post
 */


Router.post("/signup", async (req, res) => {
  try {
    await (0, _auth.ValidateSignup)(req.body.credentials);
    await _all_model.UserModel.findByEmailAndPhone(req.body.credentials);
    const newUser = await _all_model.UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return res.status(200).json({
      token,
      status: "success"
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
/**
 * Route = /signin
 * does =  signin user
 * params =None
 * Access = Private
 * Method = post
 */

Router.post("/signin", async (req, res) => {
  try {
    await (0, _auth.ValidateSignin)(req.body.credentials);
    const user = await _all_model.UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({
      token,
      status: "success login "
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
Router.get("/google", _passport.default.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]
}));
Router.get("/google/callback", _passport.default.authenticate("google", {
  failureRedirect: "/"
}), (req, res) => {
  // return res.status(200).json({
  //   token: req.session.passport.user.token,
  // });
  return res.redirect(`http://localhost:3000/google/${req.session.passport.user.token}`);
});
var _default = Router; // http://localhost:4000/auth/google

exports.default = _default;