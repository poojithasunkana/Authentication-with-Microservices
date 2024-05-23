const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("../common/config/config");
const session = require("express-session");

const app = express();
const port = config.port;
const AuthRouter = require("./routes/auth.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(
  session({
    secret: config.jwtSecret,
    resave: false,
    saveUninitialized: false,
  })
);

// implemented routes
app.use(AuthRouter);

app.all("*", (req, res) => {
  res.status(404).send({ error: "unknown path for services." });
});

mongoose
  .connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
