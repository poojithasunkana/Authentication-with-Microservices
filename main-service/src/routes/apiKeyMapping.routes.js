const express = require("express");
const apiKeyMappingController = require("../controllers/apiKeyMapping.controller");

const router = express();

// api for fetching api key mapping using userId
router.get(
  "/api/v1/apiKeyMappingByUserId/:userId",
  apiKeyMappingController.getMappingByUserId
);

// api for fetching api key mapping using apiKey
router.get(
  "/api/v1/apiKeyMapping/:apiKey",
  apiKeyMappingController.getMappingByApikey
);

module.exports = router;
