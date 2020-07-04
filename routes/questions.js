const express = require("express");
const router = express.Router();
const { Schema: Question, validate } = require("../models/questions");
const authMiddle = require("../middleware/auth");
const adminMiddle = require("../middleware/admin");
const QuestionService = require("../services/questionService");

const questionService = QuestionService();

router.get("/", async (req, res) => {
  const question = await questionService.getQuestions();
  res.status(200).send(question);
});

router.post("/", [authMiddle, adminMiddle], async (req, res) => {
  const question = await questionService.saveQuestion(req.body);
  res.send(question);
});

router.put("/:id", [authMiddle, adminMiddle], async (req, res) => {
  const question = await questionService.replaceQuestion(
    req.params.id,
    req.body
  );
  res.send(question);
});

router.delete("/:id", [authMiddle, adminMiddle], async (req, res) => {
  const question = await questionService.deleteQuestionById(req.params.id);
  res.status(200).send(question);
});

router.get("/:id", async (req, res) => {
  const question = await questionService.getQuestionById(req.params.id);
  res.send(question);
});

module.exports = router;
