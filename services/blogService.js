const { Blog, validate } = require("../models/blogs");
const Errors = require("../errors/ErrorWithStatusCode");

function BlogService() {
  const saveBlog = async (blogDTO, isAdmin) => {
    const { error } = validate(blogDTO);
    if (error) {
      throw new Errors(400, error.details[0].message);
    }
    let blog = new Blog({
      title: blogDTO.title,
      content: blogDTO.content,
      isAdmin: isAdmin,
    });
    blog = await blog.save();
    return blog;
  };

  const replaceBlog = async (id, blogDTO) => {
    const { error } = validate(blogDTO);
    if (error) {
      throw new Errors(400, error.details[0].message);
    }
    const blog = await Blog.findById(id);
    blog.title = blogDTO.title;
    blog.content = blogDTO.content;
    await blog.save();
    return blog;
  };
  const getBlogsSortedOnDateDesc = async () => {
    const blogs = await Blog.find().sort({ created_on: -1 });
    return blogs;
  };

  const deleteBlogById = async (id) => {
    const blog = await Blog.findByIdAndRemove(id);
    return blog;
  };

  const getBlogById = async (id) => {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Errors(404, "Blog not found");
    }
    return blog;
  };

  return {
    saveBlog,
    deleteBlogById,
    getBlogsSortedOnDateDesc,
    replaceBlog,
    getBlogById,
  };
}

module.exports = BlogService;
