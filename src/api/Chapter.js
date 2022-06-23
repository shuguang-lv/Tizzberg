export const AV = require('leancloud-storage');
import { deleteObj } from '../api/common'
const Chapter = AV.Object.extend('Chapter');

export async function addchapter(chapter_info) {
    const chapter = new Chapter()
    // chapter.set('title', title)
    // chapter.set('decription', decription)
    // chapter.set('content', content)
    // chapter.set('fictionId', fictionId)
    // chapter.set('deleted', deleted)
    // chapter.set('author', author)
    // chapter.set('view_count', view_count)
    chapter.set(chapter_info)
    return chapter.save()
}

export async function deleteChapter(objectId) {
    deleteObj(objectId,'Chapter')
}

export async function editChapter(objectId,config,{title,decription,content,fictionId,deleted,author,view_count}) {
    const query = new AV.Query('Chapter');
    query.equalTo('objectId', objectId);
    query.find().then((res) => {
        const chapter = res
        if (fictionId) {chapter.set('fictionId',fictionId)}
        if (title) {chapter.set('title', title)}
        if (content) {chapter.set('content', content)}
        if (decription) {chapter.set('decription', decription)}
        if (deleted) {chapter.set('deleted', deleted)}
        if (author) {chapter.set('author', author)}
        if (view_count) {chapter.set('view_count', view_count)}
        return chapter.save(null,config);
      });
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