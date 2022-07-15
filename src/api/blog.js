import { deleteObj } from "./common";
const AV = require("leancloud-storage");
const Blog = AV.Object.extend("Blog");

export async function createBlog(blogObj) {
  const blog = new Blog();
  blog.set(blogObj);
  return blog.save();
}

export async function getBlogList(skip = 0) {
  const query = new AV.Query("Blog");
  query.notEqualTo("status", "deleted");
  query.notEqualTo("status", "draft");
  query.equalTo("visibility", "public");
  query.limit(10);
  query.skip(skip);
  query.descending("createdAt");
  return query.find();
}

export async function deleteBlog(blogId = "") {
  return deleteObj(blogId, "Blog");
}
