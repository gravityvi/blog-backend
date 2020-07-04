const express = require("express");
const router = express.Router();
const _ = require("lodash");
const adminMiddle = require("../middleware/admin");

const BlogService = require("../services/blogService");

const blogService = BlogService();

router.get("/", async (req, res) => {
  const blogs = await blogService.getBlogsSortedOnDateDesc();
  res.status(200).send(blogs);
});

router.post("/", async (req, res) => {
  const blogDTO = req.body;
  const blog = await blogService.saveBlog(
    blogDTO,
    req.user && req.user.isAdmin
  );
  res.send(blog);
});

router.put("/:id", [adminMiddle], async (req, res) => {
  const blogDTO = req.body;
  const blog = await blogService.replaceBlog(req.params.id, blogDTO);
  res.send(blog);
});

router.delete("/:id", [adminMiddle], async (req, res) => {
  const blog = await blogService.deleteBlogById(req.params.id);
  res.status(200).send(blog);
});

router.get("/:id", async (req, res) => {
  const blog = await blogService.getBlogById(req.params.id);
  res.send(blog);
});

module.exports = router;
