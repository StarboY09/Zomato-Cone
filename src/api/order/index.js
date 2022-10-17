import express from "express";
import { OrderModel } from "../../database/all_model";
import passport from "passport";

const Router = express.Router();

/**
 * Route = /:_id
 * does =  Get all order by user ID
 * params =_id
 * Access = PRIVATE
 * Method = GET
 */

Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;

      const userorder = await OrderModel.findOne({ user: user._id });

      if (!userorder) {
        return res.status(400).json({ error: "No user Found" });
      }
      return res.status(200).json({ orders: userorder });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

/**
 * Route = /new
 * does =  Add new order
 * params =NONE
 * Access = PRIVATE
 * Method = Post or Put
 */

Router.put(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;

      const { orderdetail } = req.body;

      const addNewOrder = await OrderModel.findOneAndUpdate(
        { user: user._id },
        {
          $push: {
            orderDetails: orderdetail,
          },
        },
        {
          new: true,
        }
      );

      return res.state(200).json({ order: addNewOrder });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

export default Router;
