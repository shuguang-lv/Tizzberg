export const AV = require('leancloud-storage');
const Tag = AV.Object.extend('Tag');

export async function addTag({title="",content="",post=[],fiction=[],deleted=false,creator='',view_count=0,num_member=0,visibility=''}) {
    const tag = new Tag()
    tag.set('post', post)
    tag.set('title', title)
    tag.set('content', content)
    tag.set('fiction', fiction)
    tag.set('deleted', deleted)
    tag.set('creator', creator)
    tag.set('view_count', view_count)
    tag.set('num_member', num_member)
    tag.set('visibility', visibility)
    return tag.save()
}

export async function deleteTag({objectId=''}) {
    const tag = AV.Status.createWithoutData('Tag', objectId);
    return tag.destroy();
}

export async function editTag(objectId,config,{title,content,post,fiction,deleted,creator,view_count,num_member,visibility}) {
    const tag = AV.Object.createWithoutData('Tag', objectId);
    if (post) {tag.set('post',post)}
    if (title) {tag.set('title', title)}
    if (content) {tag.set('content', content)}
    if (fiction) {tag.set('fiction', fiction)}
    if (deleted) {tag.set('deleted', deleted)}
    if (creator) {tag.set('creator', creator)}
    if (view_count) {tag.set('view_count', view_count)}
    if (num_member) {tag.set('num_member', num_member)}
    if (visibility) {tag.set('visibility', visibility)}
    return tag.save(null,config);
}

export async function getAllTag() {
    const query = new AV.Query('Tag');
    return query.find()
}

export async function getVisibityTag(visibility) {
    const query = new AV.Query('Tag');
    query.equalTo('visibility', visibility);
    return query.find()
}