const express = require("express");
const config = require("config");
const Joi = require("joi");
const router = express.Router();
const {
  Schema: Question,
  validate: validateQuestion,
} = require("../models/questions");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const data = req.body.data;
  let valid = true;

  for (key in data) {
    const questionObj = await Question.findById(data[key]._id);
    if (!questionObj) {
      res.status(400).send("Invalid Question");
      return;
    }
    const expectedAnswerArray = questionObj.answer;
    const actualAnswer = data[key].answer.toLowerCase();
    if (!expectedAnswerArray.includes(actualAnswer)) {
      res.status(400).send("Invalid Answers");
      return;
    }
  }

  const token = jwt.sign(
    { pass: true, isAdmin: false },
    config.get("jwtPrivateKey")
  );
  res.send(token);
});

const validate = (auth) => {
  const schema = {
    data: Joi.array().min(1).items({
      _id: Joi.objectId().required(),
      answer: Joi.string().required(),
    }),
  };
  return Joi.validate(auth, schema);
};

module.exports = router;
