const { Comment, validate } = require("../models/comments");
const { Blog } = require("../models/blogs");
const BlogService = require("./blogService");
const ErrorWithStatusCode = require("../errors/ErrorWithStatusCode");

const blogService = BlogService();

function CommentService() {
  const saveComment = async (commentDTO, blogId, isAdmin) => {
    const { error } = validate(commentDTO);
    if (error) {
      throw new ErrorWithStatusCode(400, error.details[0].message);
    }
    const blog = await blogService.getBlogById(blogId);
    if (!blog) {
      throw new ErrorWithStatusCode(404, "Blog not found");
    }
    let comment = new Comment({
      content: commentDTO.content,
      isAdmin: isAdmin,
    });
    blog.comments.push(comment);
    await blog.save();
    return blog;
  };

  const deleteComment = async (blogId, commentId) => {
    const blog = await blogService.getBlogById(blogId);
    if (!blog) {
      throw new ErrorWithStatusCode(404, "Blog not found");
    }
    const comment = blog.comments.id(commentId);
    if (!comment) {
      throw new ErrorWithStatusCode(404, "Comment not found");
    }
    await comment.remove();
    await blog.save();
    return blog;
  };

  const getCommentById = async (blogId, commentId) => {
    const blog = await blogService.getBlogById(blogId);
    if (!blog) {
      throw new ErrorWithStatusCode(404, "Blog not found");
    }
    const comment = blog.comments.id(commentId);
    if (!comment) {
      throw new ErrorWithStatusCode(404, "Comment not found");
    }
    return comment;
  };

  return {
    saveComment,
    deleteComment,
    getCommentById,
  };
}

module.exports = CommentService;
