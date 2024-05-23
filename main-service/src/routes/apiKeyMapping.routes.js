const express = require("express");
const authMiddleware = require("../../common/middlewares/authMiddleware");
const authController = require("../controllers/auth.controller");
const apiKeyMappingController = require("../controllers/apiKeyMapping.controller");

const router = express();

// api for fetching mapping
router.get(
  "/api/v1/mapping/:apiKey",
  apiKeyMappingController.getMappingByApikey
);
