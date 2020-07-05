const express = require("express");
const router = express.Router();
const UserService = require("../services/userService");

const userService = UserService();
router.post("/", async (req, res) => {
  const token = await userService.verifyUser(req.body);
  res.send(token);
});

module.exports = router;
