const express = require("express");
const apiKeyMiddleware = require("../../common/middlewares/apiKeyMiddleware");
const userController = require("../controllers/user.controller");

const candidatesController = require("../controllers/candidates.controller");

const router = express.Router();

router.get(
  "/api/v1/public/candidates",
  apiKeyMiddleware,
  candidatesController.getAllCandidates
);

module.exports = router;
