const apiResponseHandler = require("../../common/helpers/apiResponseHandler");
const User = require("../models/User");

class UserController {
  async getUser(req, res) {
    try {
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
