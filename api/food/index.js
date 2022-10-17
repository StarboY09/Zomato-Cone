import express from "express";

import { FoodModel } from "../../database/food";
import {
  ValidateCategory,
  ValidateID,
} from "../../validation/comman.validation";

const Router = express.Router();

/**
 * Route = /:id
 * does = Get Food based on id
 * params _id
 * Access = Public
 * Method = GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ValidateID(req.params);

    const food = await FoodModel.findById(_id);

    return res.json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    const { _id } = req.params;
    await ValidateID(req.params);
    const foods = FoodModel.find({
      restaurant: _id,
    });
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    const { category } = req.params;
    await ValidateCategory(req.params);
    const foods = FoodModel.find({
      category: { $regex: category, $options: "i" },
    });
    if (!foods)
      return res
        .status(404)
        .json({ error: `No food matched with ${category}` });
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
