const apiResponseHandler = require("../../common/helpers/apiResponseHandler");
const ApiKeyMapping = require("../models/ApiKeyMapping");

class ApiKeyMappingController {
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
}

module.exports = new ApiKeyMappingController();
