"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _all_model = require("../../database/all_model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Router = _express.default.Router();
/**
 * Route = /list/:_id
 * does =  Get menu based on id
 * params =_id
 * Access = public
 * Method = GET
 */


Router.get("/list/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;

    const menus = _all_model.MenuModel.findOne({
      _id
    });

    if (!menus) {
      return res.status(404).json({
        error: "No menu present for this restaurant"
      });
    }

    return res.json({
      menus
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});
/**
 * Route = /image
 * does =  Get all list of menus images with id
 * params =_id
 * Access = public
 * Method = GET
 */

Router.get("/image/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const menuImages = await _all_model.ImageModel.findOne({
      _id
    });

    if (!menuImages) {
      return res.status(404).json({
        error: "No image Found"
      });
    }

    return res.json({
      menuImages
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});
var _default = Router;
exports.default = _default;