const { default: axios } = require("axios");
const apiResponseHandler = require("../../helpers/apiResponseHandler");
const config = require("../../common/config/config");

class UserController {
  async getUserDetails(req, res) {
    try {
      const apiKey = req.headers["x-api-key"];
      const response = await axios.get(`${config.main_service_api}/user`, {
        headers: {
          "x-api-key": apiKey,
        },
      });
      const user = response.data.data;
      console.log(response);
      const userDetails = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      return apiResponseHandler.successResponse(
        res,
        "User details fetched successfully",
        userDetails
      );
    } catch (err) {
      let errorMessage = err.message;
      if (err.data && err.data.message) {
        errorMessage = err.data.message;
      }
      return apiResponseHandler.errorResponse(
        res,
        "Cannot fetch user details, please try again",
        errorMessage
      );
    }
  }
}

module.exports = new UserController();
