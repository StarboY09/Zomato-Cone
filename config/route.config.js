import jwtpassport from "passport-jwt";

import { UserModel } from "../database/all_model";

const JwtStrategy = jwtpassport.Strategy;
const ExtractJwt = jwtpassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoApp",
};

export default (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt__payload, done) => {
      try {
        const doesUserExits = await UserModel.findById(jwt__payload.user);
        if (!doesUserExits) return done(null, false);
        return done(null, doesUserExits);
      } catch (error) {
        throw new Error(error.message);
      }
    })
  );
};
