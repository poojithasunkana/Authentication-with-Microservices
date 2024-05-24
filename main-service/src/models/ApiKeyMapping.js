const mongoose = require("mongoose");
// define api Key Mapping Schema
const apiKeyMappingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  ApiKey: {
    type: String,
  },
  authToken: {
    type: String,
  },
});

// create model using api key mapping schema
const ApiKeyMapping = mongoose.model("ApiKeyMapping", apiKeyMappingSchema);
module.exports = ApiKeyMapping;
