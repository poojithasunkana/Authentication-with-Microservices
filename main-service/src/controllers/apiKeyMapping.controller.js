const apiResponseHandler = require("../../common/helpers/apiResponseHandler");
const ApiKeyMapping = require("../models/ApiKeyMapping");

class ApiKeyMappingController {
  async getTokenByApiKey(apiKey) {
    try {
      const mapping = await ApiKeyMapping.findOne({ ApiKey: apiKey });
      return mapping.authToken;
    } catch (err) {
      throw err;
    }
  }
  async getMappingByApikey(req, res) {
    try {
      const { apiKey } = req.params;
      const mapping = await ApiKeyMapping.findOne({ ApiKey: apiKey });
      return apiResponseHandler.successResponse(
        res,
        "Mapping fetched successfully",
        mapping
      );
    } catch (err) {
      return apiResponseHandler.errorResponse(
        res,
        "Unable to fetch mapping, please try again",
        err.message
      );
    }
  }

  async getMappingByUserId(req, res) {
    try {
      const { userId } = req.params;
      console.log("In getMappingByUserId ---> ", userId);
      const mapping = await ApiKeyMapping.findOne({ userId });
      return apiResponseHandler.successResponse(
        res,
        "Mapping fetched successfully",
        mapping
      );
    } catch (err) {
      return apiResponseHandler.errorResponse(
        res,
        "Unable to fetch mapping, please try again",
        err.message
      );
    }
  }
}

module.exports = new ApiKeyMappingController();
