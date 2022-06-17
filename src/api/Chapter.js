export const AV = require('leancloud-storage');
const Chapter = AV.Object.extend('Chapter');

export async function addchapter({title="",decription='',content="",fictionId='',deleted=false,author=[],view_count=0}) {
    const chapter = new Chapter()
    chapter.set('title', title)
    chapter.set('decription', decription)
    chapter.set('content', content)
    chapter.set('fictionId', fictionId)
    chapter.set('deleted', deleted)
    chapter.set('author', author)
    chapter.set('view_count', view_count)
    return chapter.save()
}

export async function deleteChapter(objectId) {
    const chapter = AV.Status.createWithoutData('Chapter', objectId);
    return chapter.destroy();
}

export async function editChapter(objectId,config,{title,decription,content,fictionId,deleted,author,view_count}) {
    const chapter = AV.Object.createWithoutData('Chapter', objectId);
    if (fictionId) {chapter.set('fictionId',fictionId)}
    if (title) {chapter.set('title', title)}
    if (content) {chapter.set('content', content)}
    if (decription) {chapter.set('decription', decription)}
    if (deleted) {chapter.set('deleted', deleted)}
    if (author) {chapter.set('author', author)}
    if (view_count) {chapter.set('view_count', view_count)}
    return chapter.save(null,config);
}

export async function getAllChapter(fictionId) {
    const query = new AV.Query('Chapter');
    query.equalTo('fictionId', fictionId);
    return query.find()
}

export async function getChapter(objectId) {
    const query = new AV.Query('Chapter');
    query.equalTo('objectId', objectId);
    return query.find()
}