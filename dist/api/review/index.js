"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _all_model = require("../../database/all_model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Router = _express.default.Router();
/**
 * Route = /:rid
 * does =  Get all review for a particullar restaurant
 * params =rid
 * Access = public
 * Method = GET
 */


Router.get("/:rid", async (req, res) => {
  try {
    const {
      rid
    } = req.params;
    const review = await _all_model.ReviewModel.find({
      restaurant: rid
    }).sort({
      createAt: -1
    });

    if (!review) {
      return res.status(400).json({
        error: "No review Found"
      });
    }

    return res.status(200).json({
      reviews: review
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});
/**
 * Route = /new
 * does =  Post a review or add a review
 * params =None
 * Access = private
 * Method = Post
 */

Router.post("/new", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      _id
    } = req.user;
    const {
      reviewData
    } = req.body;
    const newreview = await _all_model.ReviewModel.create(_objectSpread(_objectSpread({}, reviewData), {}, {
      user: _id
    }));

    if (!newreview) {
      return res.status(400).json({
        error: "user not Found or review is not created"
      });
    }

    return res.status(200).json({
      success: true,
      data: newreview
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});
/**
 * Route = /del/:id
 * does =  delete a review
 * params =None
 * Access = private
 * Method = delete
 */

Router.delete("/del/:id", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const {
      _id
    } = req.params;
    const data = await _all_model.ReviewModel.findOneAndDelete({
      _id: _id,
      user: user._id
    });

    if (!data) {
      return res.status(400).json({
        error: "review is not deleted"
      });
    }

    return res.json({
      success: true,
      message: "successfully delete a review",
      data
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});
var _default = Router;
exports.default = _default;