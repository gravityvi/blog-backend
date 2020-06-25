const { Blog } = require("../models/blogs");

function BlogService() {
  const slaveBlog = async (blogDT, isAdmin) => {
    let blog = new Blog({
      title: blogDTO.title,
      content: blogDTO.content,
      isAdmin: isAdmin,
    });
    blog = await blog.save();
    return blog;
  };

  const getBlogsSortedOnDateDesc = async () => {
    const blogs = await Blog.find().sort({ created_on: -1 });
    return blogs;
  };

  const replaceBlog = async (id, blogDTO) => {
    const blog = await Blog.findByIdAndUpdate(
      id,
      _.pick(blogDTO, ["title", "content"]),
      {
        new: true,
      }
    );
    return blog;
  };

  const deleteBlogByID = async (id) => {
    const blog = await Blog.findByIdAndRemove(req.params.id);
    return blog;
  };

  const getBlogById = async (id) => {
    const blog = await Blog.findById(req.params.id);
    return blog;
  };

  return {
    slaveBlog,
    deleteBlogByID,
    getBlogsSortedOnDateDesc,
    replaceBlog,
    getBlogById,
  };
}

module.exports = BlogService;
