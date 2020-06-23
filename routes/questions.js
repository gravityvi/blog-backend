const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { Schema: Question, validate } = require("../models/questions");
const authMiddle = require("../middleware/auth");
const adminMiddle = require("../middleware/admin");

router.get("/", async (req, res) => {
  const questions = await Question.find().select("_id question");
  res.status(200).send(questions);
});

router.post("/", [authMiddle, adminMiddle], async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let question = new Question({
    question: req.body.question,
    answer: req.body.answer,
  });
  question = await question.save();
  res.send(question);
});

router.put("/:id", [authMiddle, adminMiddle], async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const question = await Question.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ["question", "answer"]),
    {
      new: true,
    }
  );

  res.send(question);
});

router.delete("/:id", [authMiddle, adminMiddle], async (req, res) => {
  const question = await Question.findByIdAndRemove(req.params.id);
  res.status(200).send();
});

router.get("/:id", async (req, res) => {
  const question = await Question.findById(req.params.id).select(
    "_id question"
  );
  res.send(question);
});

module.exports = router;
