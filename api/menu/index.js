import express from "express";
import { MenuModel, ImageModel } from "../../database/all_model";
const Router = express.Router();

/**
 * Route = /list/:_id
 * does =  Get menu based on id
 * params =_id
 * Access = public
 * Method = GET
 */

Router.get("/list/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menus = MenuModel.findOne({ _id });
    if (!menus) {
      return res
        .status(404)
        .json({ error: "No menu present for this restaurant" });
    }
    return res.json({ menus });
  } catch (err) {
    return res.status(500).json({ error: err.message });
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
    const { _id } = req.params;
    const menuImages = await ImageModel.findOne({ _id });
    if (!menuImages) {
      return res.status(404).json({ error: "No image Found" });
    }

    return res.json({ menuImages });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default Router;
