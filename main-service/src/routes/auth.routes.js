const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express();

router.post("/api/v1/register", authController.register);
router.post("/api/v1/login", authController.login);
module.exports = router;
