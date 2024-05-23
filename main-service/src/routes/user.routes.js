const express = require("express");
const authMiddleware = require("../../common/middlewares/authMiddleware");
const userController = require("../controllers/user.controller");

const router = express();

router.get("/api/v1/user", authMiddleware, userController.getUser);
module.exports = router;
