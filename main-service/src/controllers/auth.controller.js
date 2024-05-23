const apiResponseHandler = require("../../common/helpers/apiResponseHandler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const config = require("../../common/config/config");
const ApiKeyMapping = require("../models/ApiKeyMapping");
class AuthController {
  async signToken(id) {
    return jwt.sign({ id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
  }

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
      const apiKey = uuid();
      const apiKeyMapping = await ApiKeyMapping.create({
        userId: user.id,
        apiKey,
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
      const user = User.findOne({ email });
      if (!user) {
        return apiResponseHandler.errorResponse(
          res,
          "Cannot log in",
          "No user found with the given email"
        );
      }
      if (user.password != password) {
        return apiResponseHandler.badRequest(
          res,
          "Cannot log in",
          "incorrect email/password"
        );
      }
      const jwtToken = this.signToken(user._id);

      // update authToken in apikey mapping table
      await ApiKeyMapping.updateOne({ id: user._id }, { authToken: jwtToken });

      return apiResponseHandler.successResponse(
        res,
        "Login successful",
        jwtToken
      );
    } catch (err) {
      return apiResponseHandler.login(
        res,
        "Cannot log in, please try again",
        err.message
      );
    }
  }
}
module.exports = new AuthController();
