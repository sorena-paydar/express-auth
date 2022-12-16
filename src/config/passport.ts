import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { PRIVATE_KEY } from ".";
import db from "../models";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PRIVATE_KEY,
  algorithms: ["RS256"],
};

passport.use(
  new JwtStrategy(options, async function (jwt_payload, done) {
    try {
      const user = await db.User.findOne({ where: { id: jwt_payload.sub } });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);
