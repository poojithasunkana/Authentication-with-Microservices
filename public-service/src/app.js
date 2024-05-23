const express = require("express");
const config = require("../common/config/config");

const app = express();
const ApiKeyRouter = require("./routes/apiKey.routes");
const UserRouter = require("./routes/user.routers");
const CandidateRouter = require("./routes/candidate.routes");
app.use(express.json());
const port = config.port;
app.use(ApiKeyRouter);
app.use(UserRouter);
app.use(CandidateRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
