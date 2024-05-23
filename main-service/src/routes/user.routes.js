const express = require("express");

const userController = require("../controllers/user.controller");
const apiKeyMiddleware = require("../../common/middlewares/apiKeyMiddleware");
const authMiddleware = require("../../common/config/passport");

const router = express();

router.get(
  "/api/v1/user",
  apiKeyMiddleware,
  authMiddleware,
  userController.getUser
);
module.exports = router;
