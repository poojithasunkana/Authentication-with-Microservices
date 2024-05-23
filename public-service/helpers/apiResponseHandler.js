class ApiResponseHandler {
  async successResponse(res, message, data) {
    res.status(200).json({
      message,
      data,
    });
  }

  async badRequest(res, message, error) {
    res.status(400).json({
      message,
      error,
    });
  }

  async unAuthorized(res, message) {
    res.status(401).json({
      message,
    });
  }

  async forbiddenResponse(res, message) {
    res.status(403).json({
      message,
    });
  }

  async errorResponse(res, message, error) {
    res.status(500).json({
      message,
      error,
    });
  }
}

module.exports = new ApiResponseHandler();
