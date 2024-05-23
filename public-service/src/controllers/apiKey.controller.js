const config = require("../../common/config/config");
const apiResponseHandler = require("../../helpers/apiResponseHandler");
const axios = require("axios");
class ApiKeyController {
  async getApiKeyByUserId(req, res) {
    try {
      const { userId } = req.query;

      const response = await axios.get(
        `${config.main_service_api}/apiKeyMappingByUserId/${userId}`
      );
      const apiKey = response.data.data.ApiKey;
      return apiResponseHandler.successResponse(
        res,
        "Api key fetched successfully",
        { apiKey }
      );
    } catch (err) {
      return apiResponseHandler.errorResponse(
        res,
        "Cannot fetch apiKey, please try again",
        err.message
      );
    }
  }
}

module.exports = new ApiKeyController();
