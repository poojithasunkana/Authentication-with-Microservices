const express = require("express");
const authMiddleware = require("../../common/config/passport");
const candidateController = require("../controllers/candidate.controller");
const apiKeyMiddleware = require("../../common/middlewares/apiKeyMiddleware");

const router = express();

router.get(
  "/api/v1/candidates",
  apiKeyMiddleware,
  authMiddleware,
  candidateController.getCandidatesByUser
);

router.post(
  "/api/v1/candidate",
  authMiddleware,
  candidateController.createCandidate
);
module.exports = router;
