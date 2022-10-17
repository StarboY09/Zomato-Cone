import express from "express";

import { RestaurantModel } from "../../database/all_model";
import {
  ValidateRestaurantCity,
  ValidateSearchString,
} from "../../validation/restaurant.validation";

const Router = express.Router();

/**
 * Route = /new
 * does = create restaurant
 * params =None
 * Access = Public
 * Method = POST
 */

Router.post("/add", async (req, res) => {
  try {
    const { resD } = req.body;
    // console.log(res);

    const data = await RestaurantModel.create(resD);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route = /
 * does = Get restaurant
 * params =None
 * Access = Public
 * Method = GET
 */

Router.get("/", async (req, res) => {
  try {
    //http://localhost:4000/res/?city=ncr
    const { city } = req.query;
    await ValidateRestaurantCity(req.params);
    const restaurant = await RestaurantModel.find({ city });
    if (restaurant.length === 0) {
      return res.json({ error: "No Restaurant Found" });
    }
    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route = /:_id
 * does = Get indivial restaurant by id
 * params = id
 * Access = Public
 * Method = GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const restaurant = await RestaurantModel.findById(_id);
    if (!restaurant) {
      return res.status(400).json({
        error: "Restaurant Not Found",
      });
    }
    return res.json({ restaurant, msg: "id" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route = /search/:searchString
 * does = Get restaurant based on seacrh String
 * params = isearchString
 * Access = Public
 * Method = GET
 */

Router.get("/search/:searchString", async (req, res) => {
  try {
    const { searchString } = req.params;
    await ValidateSearchString(req.params);
    const restaurants = await RestaurantModel.find({
      name: { $regex: searchString, $options: "i" },
    });
    if (restaurants.length === 0) {
      return res.status(404).json({
        error: "No Restaurant found",
      });
    }
    return res.json({ restaurants, msg: "search" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
