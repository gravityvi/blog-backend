const config = require("config");
module.exports = function () {
  const jwtPrivageKey = config.get("jwtPrivateKey");
  if (!jwtPrivageKey) {
    throw new Error("FATAL ERROR: jwtPrivateKey key is not defined");
    process.exit(1);
  }
};
