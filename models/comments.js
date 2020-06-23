const joi = require("joi");
const mongoose = require("mongoose");

const commnetSchema = new mongoose.Schema({
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
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const commentModel = mongoose.model("Comments", commnetSchema);

const schema = {
  content: joi.string().min(3).max(100).required(),
};

validate = (comment) => {
  return joi.validate(comment, schema);
};

exports.validate = validate;
exports.Comment = commentModel;
exports.Schema = commnetSchema;
