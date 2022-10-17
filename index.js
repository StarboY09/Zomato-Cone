import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import ConfigRoute from "./config/route.config";
import googleAuthConfig from "./config/google.config";

import ConnectDB from "./database/connection";
import Auth from "./api/auth";
import Food from "./api/food";
import Menu from "./api/menu";
import Order from "./api/order";
import Review from "./api/review";
import Image from "./api/images";

import restaurant from "./api/restaurant";
import user from "./api/user";
import session from "express-session";

dotenv.config();
const Zomato = express();

ConfigRoute(passport);
googleAuthConfig(passport);

Zomato.use(express.json());
Zomato.use(session({ secret: process.env.KEY }));
Zomato.use(passport.initialize());
Zomato.use(passport.session());

Zomato.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});
Zomato.use("/auth", Auth);
Zomato.use("/food", Food);
Zomato.use("/res", restaurant);
Zomato.use("/user", user);
Zomato.use("/menu", Menu);
Zomato.use("/order", Order);
Zomato.use("/review", Review);
Zomato.use("/image", Image);

Zomato.listen(4000, () => {
  // console.log("server is running!!!!");
  ConnectDB()
    .then(() => {
      console.log("server is running and database is connected");
    })
    .catch((err) => {
      console.log(
        "server is running but database is not connected(failed......)"
      );
      console.log(err);
    });
});
