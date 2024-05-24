//Import required modules
const apiResponseHandler = require("../../common/helpers/apiResponseHandler");
const User = require("../models/User");

// define class for handle user operations
class UserController {
  //method for fetching user details
  async getUser(req, res) {
    try {
      // Find the user by ID 
      const user = await User.findOne({ _id: req.user.id });
      return apiResponseHandler.successResponse(
        res,
        "User details fetched successfully",
        user
      );
    } catch (err) {
      return apiResponseHandler.errorResponse(
        res,
        "Unable to fetch user details, please try again",
        err.message
      );
    }
  }
}

module.exports = new UserController();
