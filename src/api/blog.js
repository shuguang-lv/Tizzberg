import { deleteObj, PAGE_SIZE } from "./common";
const AV = require("leancloud-storage");
const Blog = AV.Object.extend("Blog");

export async function createBlog(blogObj) {
  const blog = new Blog();
  blog.set(blogObj);
  return blog.save();
}

export async function getBlogList(skip = 0, { characterId = "" }) {
  const query = new AV.Query("Blog");
  query.notEqualTo("status", "deleted");
  query.notEqualTo("status", "draft");
  query.equalTo("visibility", "public");
  query.equalTo("characterId", characterId);
  query.limit(PAGE_SIZE);
  query.skip(skip);
  query.descending("createdAt");
  return query.find();
}

export async function deleteBlog(blogId = "") {
  return deleteObj(blogId, "Blog");
}
