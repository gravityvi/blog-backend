const express = require("express");
const blogs = require("../routes/blogs");
const questions = require("../routes/questions");
const auth = require("../routes/auth");
const target = require("../routes/target");
const comments = require("../routes/comments");
const authMiddle = require("../middleware/auth");
const adminMiddle = require("../middleware/admin");
const errorMiddle = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/blogs", [authMiddle], blogs);
  app.use("/api/questions", questions);
  app.use("/api/target", [authMiddle], target);
  app.use("/api/auth", auth);
  app.use("/api/comments", comments);
  app.use(errorMiddle);
};
