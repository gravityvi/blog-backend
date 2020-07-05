const express = require("express");
const router = express.Router();
const _ = require("lodash");
const adminMiddle = require("../middleware/admin");
const authMiddle = require("../middleware/auth");
const CommentService = require("../services/CommentService");

const commentService = CommentService();

router.post("/:id", [authMiddle], async (req, res) => {
  const commentDTO = req.body;
  const blog = await commentService.saveComment(
    commentDTO,
    req.params.id,
    req.user.isAdmin
  );
  res.status(200).send(blog);
});

router.delete(
  "/:id/:comment_id",
  [authMiddle, adminMiddle],
  async (req, res) => {
    const blog = await commentService.deleteComment(
      req.params.id,
      req.params.comment_id
    );
    res.status(200).send(blog);
  }
);

router.get("/:id/:comment_id", async (req, res) => {
  const comment = await commentService.getCommentById(
    req.params.id,
    req.params.comment_id
  );
  res.status(200).send(comment);
});

module.exports = router;
