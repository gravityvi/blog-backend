const winston = require("winston");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();

app.use(cors());
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 8000;
app.listen(port, () => winston.info(`server started on port ${port}...`));
