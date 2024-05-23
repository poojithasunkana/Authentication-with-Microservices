const { default: axios } = require("axios");
const apiResponseHandler = require("../../helpers/apiResponseHandler");
const config = require("../../common/config/config");

class CandidateController {
  async getAllCandidates(req, res) {
    try {
      const apiKey = req.headers["x-api-key"];
      const response = await axios.get(
        `${config.main_service_api}/candidates`,
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      const candidates = response.data.data;
      return apiResponseHandler.successResponse(
        res,
        "Candidates fetched successfully",
        candidates
      );
    } catch (err) {
      let errorMessage = err.message;
      if (err.data && err.data.message) {
        errorMessage = err.data.message;
      }
      return apiResponseHandler.errorResponse(
        res,
        "Cannot fetch candidates, please try again",
        errorMessage
      );
    }
  }
}

module.exports = new CandidateController();
