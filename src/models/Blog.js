import { isString, isNumber, isArray } from "lodash";

export default class Blog {
  constructor(blog = {}) {
    this.title = isString(blog.title) ? blog.title : "";
    this.content = isString(blog.content) ? blog.content : "";
    this.tags = isArray(blog.tags) ? blog.tags : [];
    this.authorId = isString(blog.authorId) ? blog.authorId : "";
    this.characterId = isString(blog.characterId) ? blog.characterId : "";
    this.visibility = isString(blog.visibility) ? blog.visibility : "public";
    this.status = isString(blog.status) ? blog.status : ""; // deleted, draft
    this.view_count = isNumber(blog.view_count) ? blog.view_count : 0;
  }
}
