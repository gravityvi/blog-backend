const joi = require("joi");
const mongoose = require("mongoose");

const targetSchema = mongoose.model(
  "Target",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    content: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 5000,
    },
    created_on: {
      type: Date,
      default: Date.now(),
      require: true,
    },
    videoLink: {
      type: String,
      required: true,
    },
  })
);

const schema = {
  title: joi.string().min(3).max(50).required(),
  content: joi.string().min(10).max(5000).required(),
  videoLink: joi.string().min(1).required(),
};

validate = (target) => {
  return joi.validate(target, schema);
};

exports.validate = validate;
exports.Target = targetSchema;
