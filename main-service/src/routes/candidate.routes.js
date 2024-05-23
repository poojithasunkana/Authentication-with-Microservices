const express = require("express");
const authMiddleware = require("../../common/middlewares/authMiddleware");
const userController = require("../controllers/user.controller");
const candidateController = require("../controllers/candidate.controller");

const router = express();

router.get(
  "/api/v1/candidates",
  authMiddleware,
  candidateController.getCandidatesByUser
);

router.post(
  "/api/v1/candidate",
  authMiddleware,
  candidateController.createCandidate
);
module.exports = router;
