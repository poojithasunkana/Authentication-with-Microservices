const apiResponseHandler = require("../../common/helpers/apiResponseHandler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const config = require("../../common/config/config");
const ApiKeyMapping = require("../models/ApiKeyMapping");

function signToken(id) {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}
class AuthController {
  async register(req, res) {
    try {
      const { firstName, lastName, password, confirmPassword, email } =
        req.body;
      if (password != confirmPassword) {
        return apiResponseHandler.badRequest(
          res,
          "Cannot register candidate",
          "Password and confirm password should be same"
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
      });
      const apiKey = uuid.v4();
      const apiKeyMapping = await ApiKeyMapping.create({
        userId: user.id,
        ApiKey: apiKey,
      });
      user.apiKey = apiKey;
      return apiResponseHandler.successResponse(
        res,
        "User registered successfully",
        user
      );
    } catch (err) {
      return apiResponseHandler.errorResponse(
        res,
        "Cannot register candidate",
        err.message
      );
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return apiResponseHandler.errorResponse(
          res,
          "Cannot log in",
          "No user found with the given email"
        );
      }
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return apiResponseHandler.badRequest(
          res,
          "Cannot log in",
          "incorrect password"
        );
      }
      const jwtToken = signToken(user._id);

      // update authToken in apikey mapping table
      const result = await ApiKeyMapping.updateOne(
        { userId: user._id },
        { authToken: jwtToken }
      );
      console.log(result);
      return apiResponseHandler.successResponse(
        res,
        "Login successful",
        jwtToken
      );
    } catch (err) {
      return apiResponseHandler.errorResponse(
        res,
        "Cannot log in, please try again",
        err.message
      );
    }
  }
}
module.exports = new AuthController();
