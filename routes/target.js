const express = require("express");
const router = express.Router();
const adminMiddle = require("../middleware/admin");
const TargetService = require("../services/targetService");
const targetService = TargetService();

router.get("/", async (req, res) => {
  const target = await targetService.getOneTargetSortedOnDate();
  res.status(200).send(target);
});

router.post("/", [adminMiddle], async (req, res) => {
  const target = await targetService.saveTarget(req.body);
  res.send(target);
});

router.put("/:id", [adminMiddle], async (req, res) => {
  const target = await targetService.replaceTarget(req.params.id, req.body);
  res.send(target);
});

router.delete("/:id", [adminMiddle], async (req, res) => {
  const target = await targetService.deleteTargetById(req.params.id);
  res.status(200).send(target);
});

router.get("/:id", async (req, res) => {
  const target = await targetService.getTargetById(req.params.id);
  res.send(target);
});

module.exports = router;
