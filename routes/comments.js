const express = require("express");
const router = express.Router();
const _ = require("lodash");
const adminMiddle = require("../middleware/admin");
const authMiddle = require("../middleware/auth");
const { Comment, validate } = require("../models/comments");
const { Blog } = require("../models/blogs");

router.post("/:id", [authMiddle], async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).send("Invalid Blog Id");
  }
  let comment = new Comment({
    content: req.body.content,
    isAdmin: req.user.isAdmin,
  });
  blog.comments.push(comment);
  await blog.save();
  res.status(200).send(comment);
});

router.delete(
  "/:id/:comment_id",
  [authMiddle, adminMiddle],
  async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Invalid Blog Id");
    }
    const comment = blog.comments.id(req.params.comment_id);
    if (!comment) {
      return res.status(404).send("Invalid Comment Id");
    }
    await comment.remove();
    await blog.save();
    res.send();
  }
);

router.get("/:id/:comment_id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).send("Invalid Blog Id");
  }
  const comment = blog.comments.id(req.params.comment_id);
  if (!comment) {
    return res.status(404).send("Invalid Comment Id");
  }
  res.send(comment);
});

module.exports = router;
