const express = require("express");
const router = express.Router();
const _ = require("lodash");
const adminMiddle = require("../middleware/admin");
const { Target, validate } = require("../models/target");

router.get("/", async (req, res) => {
  const target = await Target.findOne().sort({ created_on: -1 });
  res.status(200).send(target);
});

router.post("/", [adminMiddle], async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let target = new Target({
    title: req.body.title,
    content: req.body.content,
    videoLink: req.body.videoLink,
  });
  target = await target.save();
  res.send(target);
});

router.put("/:id", [adminMiddle], async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const target = await Target.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ["title", "content", "videoLink"]),
    {
      new: true,
    }
  );
  res.send(target);
});

router.delete("/:id", [adminMiddle], async (req, res) => {
  const target = await Target.findByIdAndRemove(req.params.id);
  res.status(200).send();
});

router.get("/:id", async (req, res) => {
  const target = await Target.findById(req.params.id);
  if (!target) {
    return res.send(404).send("Invalid Blog Id");
  }
  res.send(target);
});

module.exports = router;
