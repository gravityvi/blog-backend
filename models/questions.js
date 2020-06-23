const joi = require("joi");
const mongoose = require("mongoose");

const schema = {
  question: joi.string().min(3).max(50).required(),
  answer: joi.array().items(joi.string()).min(1).required(),
};

const dbSchema = mongoose.model(
  "Questions",
  new mongoose.Schema({
    question: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150,
    },
    answer: {
      type: [String],
      reuired: true,
      validate: [
        (v) => v.length >= 1,
        "array should contain atleat one element",
      ],
    },
  })
);

const validate = (question) => {
  return joi.validate(question, schema);
};

exports.validate = validate;
exports.Schema = dbSchema;
