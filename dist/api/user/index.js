"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _all_model = require("../../database/all_model");

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Router = _express.default.Router();
/**
 * Route = /
 * does =  Get authorized user data(review)
 * params =None
 * Access = Private
 * Method = get
 */


Router.get("/", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      email,
      phoneNumber,
      fullName,
      address
    } = req.user;
    return res.json({
      user: {
        email,
        phoneNumber,
        fullName,
        address
      }
    });
  } catch (err) {
    return res.status(500).json({
      Error: err.message
    });
  }
});
/**
 * Route = /:_id
 * does =  Get user data
 * params =None
 * Access = Public
 * Method = get
 */

Router.get("/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const getuser = await _all_model.UserModel.findById(_id);

    if (!getuser) {
      return res.status(404).json({
        error: "User Not Found"
      });
    }

    const {
      fullName
    } = getuser;
    return res.json({
      user: {
        fullName
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
/**
 * Route = /:_id
 * does =  Update user data
 * params =None
 * Access = Private
 * Method = PUT
 */

Router.put("/update/:_id", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const user_data = req.body.user_data;
    user_data.password = undefined;
    console.log(user_data);
    const update_user = await _all_model.UserModel.findByIdAndUpdate(_id, {
      $set: user_data
    }, {
      new: true
    });
    return res.json({
      user: update_user
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
/**
 * Route = /:_id
 * does =  delete user data
 * params =None
 * Access = Private
 * Method = delete
 */

Router.delete("/:_id", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const del = await _all_model.UserModel.deleteOne({
      _id
    });
    return res.status(200).json({
      sucess: true,
      del
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;