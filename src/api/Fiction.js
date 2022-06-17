export const AV = require('leancloud-storage');
const Fiction = AV.Object.extend('Fiction');

export async function addfiction({title="",content="",chapterId=[],TagId=[],deleted=false,author=[],view_count=0,edit_access=''}) {
    const fiction = new Fiction()
    fiction.set('title', title)
    fiction.set('content', content)
    fiction.set('chapterId', chapterId)
    fiction.set('TagId', TagId)
    fiction.set('deleted', deleted)
    fiction.set('author', author)
    fiction.set('view_count', view_count)
    fiction.set('edit_access', edit_access)
    return fiction.save()
}

export async function deletefiction({objectId=''}) {
    const fiction = AV.Status.createWithoutData('Fiction', objectId);
    return fiction.destroy();
}

export async function editfiction(objectId,config,{title,content,chapterId,TagId,deleted,author,view_count,edit_access}) {
    const fiction = AV.Object.createWithoutData('Fiction', objectId);
    if (chapterId) {fiction.set('chapterId',chapterId)}
    if (title) {fiction.set('title', title)}
    if (content) {fiction.set('content', content)}
    if (TagId) {fiction.set('TagId', TagId)}
    if (deleted) {fiction.set('deleted', deleted)}
    if (author) {fiction.set('author', author)}
    if (view_count) {fiction.set('view_count', view_count)}
    if (edit_access) {fiction.set('edit_access', edit_access)}
    return fiction.save(null,config);
}

export async function getAllFiction() {
    const query = new AV.Query('Fiction');
    return query.find()
}

export async function getUserFiction(userId) {
    const query = new AV.Query('Fiction');
    query.equalTo('author', userId);
    return query.find()
}

export async function getFiction(objectId) {
    const query = new AV.Query('Fiction');
    query.equalTo('objectId', objectId);
    return query.find()
}

export async function getVisibityfiction(edit_access) {
    if (edit_access) {
        const query = new AV.Query('Fiction');
        query.equalTo('edit_access', edit_access);
        return query.find()
    }
}