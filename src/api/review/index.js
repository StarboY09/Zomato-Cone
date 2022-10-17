import express from "express";
import passport from "passport";
import { ReviewModel } from "../../database/all_model";
const Router = express.Router();

/**
 * Route = /:rid
 * does =  Get all review for a particullar restaurant
 * params =rid
 * Access = public
 * Method = GET
 */

Router.get("/:rid", async (req, res) => {
  try {
    const { rid } = req.params;

    const review = await ReviewModel.find({ restaurant: rid }).sort({
      createAt: -1,
    });
    if (!review) {
      return res.status(400).json({ error: "No review Found" });
    }
    return res.status(200).json({ reviews: review });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * Route = /new
 * does =  Post a review or add a review
 * params =None
 * Access = private
 * Method = Post
 */

Router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.user;

      const { reviewData } = req.body;

      const newreview = await ReviewModel.create({ ...reviewData, user: _id });

      if (!newreview) {
        return res
          .status(400)
          .json({ error: "user not Found or review is not created" });
      }

      return res.status(200).json({ success: true, data: newreview });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

/**
 * Route = /del/:id
 * does =  delete a review
 * params =None
 * Access = private
 * Method = delete
 */

Router.delete(
  "/del/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;
      const { _id } = req.params;

      const data = await ReviewModel.findOneAndDelete({
        _id: _id,
        user: user._id,
      });

      if (!data) {
        return res.status(400).json({ error: "review is not deleted" });
      }
      return res.json({
        success: true,
        message: "successfully delete a review",
        data,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

export default Router;
