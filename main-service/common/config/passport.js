const passport = require("passport");
const Strategy = require("passport-jwt");
const config = require("./config");
const User = require("../../src/models/User");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;
passport.use(
  "authJwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = await User.findOne({ _id: jwt_payload.id });
    console.log("Auth middleware ", user);
    if (!user) {
      return done("User not found", false);
    } else {
      return done(null, user);
    }
  })
);

const authMiddleware = passport.authenticate("authJwt", { session: false });
module.exports = authMiddleware;
