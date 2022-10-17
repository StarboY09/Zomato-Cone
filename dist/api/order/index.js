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
 * Route = /:_id
 * does =  Get all order by user ID
 * params =_id
 * Access = PRIVATE
 * Method = GET
 */


Router.get("/", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const userorder = await _all_model.OrderModel.findOne({
      user: user._id
    });

    if (!userorder) {
      return res.status(400).json({
        error: "No user Found"
      });
    }

    return res.status(200).json({
      orders: userorder
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});
/**
 * Route = /new
 * does =  Add new order
 * params =NONE
 * Access = PRIVATE
 * Method = Post or Put
 */

Router.put("/new", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const {
      orderdetail
    } = req.body;
    const addNewOrder = await _all_model.OrderModel.findOneAndUpdate({
      user: user._id
    }, {
      $push: {
        orderDetails: orderdetail
      }
    }, {
      new: true
    });
    return res.state(200).json({
      order: addNewOrder
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});
var _default = Router;
exports.default = _default;