const express = require("express");
const router = express.Router();
const _ = require("lodash");
const adminMiddle = require("../middleware/admin");
const { Blog, validate } = require("../models/blogs");

router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ created_on: -1 });
  res.status(200).send(blogs);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    isAdmin: req.user.isAdmin,
  });
  blog = await blog.save();
  res.send(blog);
});

router.put("/:id", [adminMiddle], async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ["title", "content"]),
    {
      new: true,
    }
  );
  res.send(blog);
});

router.delete("/:id", [adminMiddle], async (req, res) => {
  const blog = await Blog.findByIdAndRemove(req.params.id);
  res.status(200).send();
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).send("Invalid Blog Id");
  }
  res.send(blog);
});

module.exports = router;
