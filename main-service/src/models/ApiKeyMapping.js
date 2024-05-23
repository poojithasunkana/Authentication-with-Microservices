const mongoose = require("mongoose");

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

const ApiKeyMapping = mongoose.model("ApiKeyMapping", apiKeyMappingSchema);
module.exports = ApiKeyMapping;
