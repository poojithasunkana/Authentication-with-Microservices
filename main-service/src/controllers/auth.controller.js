// Import required modules
const apiResponseHandler = require("../../common/helpers/apiResponseHandler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const config = require("../../common/config/config");
const ApiKeyMapping = require("../models/ApiKeyMapping");

// Function to generate JWT token
function signToken(id) {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}
// class for handle authentication operations
class AuthController {
  // Method to register a new user
  async register(req, res) {
    try {
      // Extract registration details from request body
      const { firstName, lastName,email, password, confirmPassword} =
        req.body;
      if (password != confirmPassword) {
        return apiResponseHandler.badRequest(
          res,
          "Cannot register candidate",
          "Password and confirm password should be same"
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user in the database
      const user = await User.create({
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
      });
      // Generate API key for the user
      const apiKey = uuid.v4();
      // create entry into api key mapping table
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

  // Method for authenticate user login
  async login(req, res) {
    try {
      // Extract login credentials from request body
      const { email, password } = req.body;

      // Find user by email in the database
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

      // Generate JWT token for authentication
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
