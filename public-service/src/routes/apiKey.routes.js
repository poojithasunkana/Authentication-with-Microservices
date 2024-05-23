const express = require("express");
const apiKeyMiddleware = require("../../common/middlewares/apiKeyMiddleware");
const apiKeyController = require("../controllers/apiKey.controller");

const router = express.Router();

router.get("/api/v1/public/apiKey", apiKeyController.getApiKeyByUserId);

module.exports = router;
