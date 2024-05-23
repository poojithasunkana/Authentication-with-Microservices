require("dotenv").config({ path: process.cwd() + "/../.env" });

class Config {
  port = process.env.PORT;
  main_service_api = process.env.MAIN_SERVICE_API;
}
module.exports = new Config();
