import express from "express";

import { UserModel } from "../../database/all_model";
import passport from "passport";

const Router = express.Router();
/**
 * Route = /
 * does =  Get authorized user data(review)
 * params =None
 * Access = Private
 * Method = get
 */

Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { email, phoneNumber, fullName, address } = req.user;
      return res.json({ user: { email, phoneNumber, fullName, address } });
    } catch (err) {
      return res.status(500).json({
        Error: err.message,
      });
    }
  }
);

/**
 * Route = /:_id
 * does =  Get user data
 * params =None
 * Access = Public
 * Method = get
 */
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const getuser = await UserModel.findById(_id);
    if (!getuser) {
      return res.status(404).json({ error: "User Not Found" });
    }
    const { fullName } = getuser;
    return res.json({ user: { fullName } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route = /:_id
 * does =  Update user data
 * params =None
 * Access = Private
 * Method = PUT
 */

Router.put(
  "/update/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;
      const user_data = req.body.user_data;
      user_data.password = undefined;
      console.log(user_data);
      const update_user = await UserModel.findByIdAndUpdate(
        _id,
        {
          $set: user_data,
        },
        {
          new: true,
        }
      );
      return res.json({ user: update_user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
 * Route = /:_id
 * does =  delete user data
 * params =None
 * Access = Private
 * Method = delete
 */

Router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;
      const del = await UserModel.deleteOne({ _id });
      return res.status(200).json({ sucess: true, del });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
