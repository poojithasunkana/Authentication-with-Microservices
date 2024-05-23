const apiResponseHandler = require("../../common/helpers/apiResponseHandler");
const Candidate = require("../models/Candidate");

class CandidateController {
  async createCandidate(req, res) {
    try {
      const { firstName, lastName, email } = req.body;
      const user = req.user;
      console.log("User ---->", user);

      const candidate = await Candidate.create({
        firstName,
        lastName,
        email,
        userId: user._id,
      });
      return apiResponseHandler.successResponse(
        res,
        "Candidate created successfully",
        candidate
      );
    } catch (err) {
      return apiResponseHandler.errorResponse(
        res,
        "Cannot create candidate, please try again",
        err.message
      );
    }
  }

  async getCandidatesByUser(req, res) {
    try {
      const { id } = req.user;
      console.log("bearer token ", req.headers["authorization"]);
      const candidates = await Candidate.find({ userId: id });
      return apiResponseHandler.successResponse(
        res,
        "Candidates fetched successfully",
        candidates
      );
    } catch (err) {
      return apiResponseHandler.errorResponse(
        res,
        "Cannot fetch candidates",
        err.message
      );
    }
  }
}

module.exports = new CandidateController();
