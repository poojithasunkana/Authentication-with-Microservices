const apiResponseHandler = require("../../common/helpers/apiResponseHandler");
const apiKeyMappingController = require("../../src/controllers/apiKeyMapping.controller");
const config = require("../config/config");

const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey) {
    try {
      const authToken = await apiKeyMappingController.getTokenByApiKey(apiKey);
      if (!authToken) {
        return apiResponseHandler.forbiddenResponse(res, "Invalid Api Key");
      }
      req.headers["authorization"] = `Bearer ${authToken}`;
    } catch (err) {
      return apiResponseHandler.forbiddenResponse(res, "Invalid Api Key");
    }
  }
  next();
};

module.exports = apiKeyMiddleware;
