const joi = require("joi");
const mongoose = require("mongoose");
const { Schema: commentSchema } = require("./comments");
const blogSchema = mongoose.model(
  "Blogs",
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
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    comments: {
      type: [commentSchema],
      default: [],
      required: true,
    },
  })
);

const schema = {
  title: joi.string().min(3).max(50).required(),
  content: joi.string().min(10).max(5000).required(),
};

validate = (blog) => {
  return joi.validate(blog, schema);
};

exports.validate = validate;
exports.Blog = blogSchema;
