// Import required modules
const express = require("express");
const authMiddleware = require("../../common/config/passport");
const candidateController = require("../controllers/candidate.controller");
const apiKeyMiddleware = require("../../common/middlewares/apiKeyMiddleware");

const router = express();

// implemented GET route for fetching candidates
router.get(
  "/api/v1/candidates",
  apiKeyMiddleware,
  authMiddleware,
  candidateController.getCandidatesByUser
);

//implemented POST route for creating a candidate
router.post(
  "/api/v1/candidate",
  authMiddleware,
  candidateController.createCandidate
);
module.exports = router;
