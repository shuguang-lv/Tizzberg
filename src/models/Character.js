import { isString, isArray } from "lodash";

export default class Character {
  constructor(character = {}) {
    this.name = isString(character.name) ? character.name : "";
    this.picture = isString(character.picture) ? character.picture : "";
    this.userId = isString(character.userId) ? character.userId : "";
    this.followedTags = isArray(character.followedTags)
      ? character.followedTags
      : [];
    this.savedPosts = isArray(character.savedPosts) ? character.savedPosts : [];
  }
}
