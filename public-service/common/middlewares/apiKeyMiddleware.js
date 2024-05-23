const axios = require("axios");
const apiResponseHandler = require("../../helpers/apiResponseHandler");
const config = require("../config/config");

const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return apiResponseHandler.unAuthorized(
      res,
      "Api Key is required in headers"
    );
  }
  next(); // Proceed to the next middleware or route handler
};

module.exports = apiKeyMiddleware;
