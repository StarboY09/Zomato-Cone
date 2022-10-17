"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _food = require("../../database/food");

var _comman = require("../../validation/comman.validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Router = _express.default.Router();
/**
 * Route = /:id
 * does = Get Food based on id
 * params _id
 * Access = Public
 * Method = GET
 */


Router.get("/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _comman.ValidateID)(req.params);
    const food = await _food.FoodModel.findById(_id);
    return res.json({
      food
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
/*
 *
 * Route = /r/:_id
 * does = Get Food based on restaurant
 * params _id
 * Access = Public
 * Method = GET
 */

Router.get("/r/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _comman.ValidateID)(req.params);

    const foods = _food.FoodModel.find({
      restaurant: _id
    });

    return res.json({
      foods
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
/*
 *
 * Route = /c/:category
 * does = Get Food based on category
 * params category
 * Access = Public
 * Method = GET
 */

Router.get("/c/:category", async (req, res) => {
  try {
    const {
      category
    } = req.params;
    await (0, _comman.ValidateCategory)(req.params);

    const foods = _food.FoodModel.find({
      category: {
        $regex: category,
        $options: "i"
      }
    });

    if (!foods) return res.status(404).json({
      error: `No food matched with ${category}`
    });
    return res.json({
      foods
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;