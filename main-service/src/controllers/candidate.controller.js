// Import required modules
const apiResponseHandler = require("../../common/helpers/apiResponseHandler");
const Candidate = require("../models/Candidate");

// class for handling candidate related operations
class CandidateController {
  //method for create-candidate
  async createCandidate(req, res) {
    try {
      // extracting details from request
      const { firstName, lastName, email } = req.body;
      // Get authenticated user details
      const user = req.user;
      console.log("User ---->", user);

      // create candidate with userid
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

// Method for fetching candidates by user
  async getCandidatesByUser(req, res) {
    try {
      // Get user ID from request
      const { id } = req.user;
      console.log("bearer token ", req.headers["authorization"]);
      
      // Find candidates associated with the user ID
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
