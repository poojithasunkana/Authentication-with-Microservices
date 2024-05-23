const passport = require("passport");
const authMiddleware = passport.authenticate("authJwt", { session: false });
module.exports = authMiddleware;
