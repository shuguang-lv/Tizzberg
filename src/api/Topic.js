import { deleteObj } from '../api/common'
export const AV = require('leancloud-storage');
const Topic = AV.Object.extend('Topic');

export async function addTopic(topic_info) {
    const topic = new Topic()
    // topic.set('title', title)
    // topic.set('content', content)
    // topic.set('deleted', deleted)
    // topic.set('author', author)
    // topic.set('view_count', view_count)
    // topic.set('likeUser', likeUser)
    // topic.set('tag', tag)
    // topic.set('visibility', visibility)
    topic.set(topic_info)
    return topic.save()
}

export async function deleteTopic(objectId='') {
    deleteObj(objectId,'Topic')
}

/**
 * change the pinned status of topic
 * @returns 
 */
export async function pinTopic() {
    // const user = AV.User.current();
    // user.add('pinned',topicId);
    // return user.save(null,config);
}

export async function editTopic(objectId,config,{title,content,deleted,author,view_count,likeUser,tag,visibility}) {
    const query = new AV.Query('Topic');
    query.equalTo('objectId', objectId);
    query.find().then((res) => {
        const topic = res
        if (title) {topic.set('title', title)}
        if (content) {topic.set('content', content)}
        if (deleted) {topic.set('deleted', deleted)}
        if (author) {topic.set('author', author)}
        if (view_count) {topic.set('view_count', view_count)}
        if (likeUser) {topic.set('likeUser', likeUser)}
        if (tag) {topic.set('tag', tag)}
        if (visibility) {topic.set('visibility', visibility)}
        return topic.save(null,config);
      });
}

/**
 * like a topic
 * @returns 
 */
 export async function likeTopic(config,topicId,userId) {
    const query = new AV.Query('Topic');
    query.equalTo('objectId', topicId);
    query.find().then((res) => {
        const topic = res
        topic.add('likeUser',userId);
        topic.save(null,config);
      });
}

/**
 * unlike a topic
 * @returns 
 */
 export async function unlikeTopic(config,topicId,userId) {
    const query = new AV.Query('Topic');
    query.equalTo('objectId', topicId);
    query.find().then((res) => {
        const topic = res
        topic.remove('likeUser',userId)
        topic.save(null,config);
      });
}

/**
 * hide a topic
 * @returns 
 */
 export async function hideTopic(config,topicId) {
    const user = AV.User.current();
    user.add('hidedTopic',topicId);
    user.save(null,config);
}

/**
 * save a topic
 * @returns 
 */
 export async function saveTopic(config,topicId) {
    const user = AV.User.current();
    user.add('savedTopic',topicId);
    user.save(null,config);
}

/**
 * 
 * @returns 
 */
export async function getAllTopic() {
    const query = new AV.Query('Topic');
    return await query.find()
}

/**
 * 
 * @param {*} classify the topics with different visibilities
 * @returns 
 */
export async function getVisibityTopic(visibility) {
    const query = new AV.Query('Topic');
    query.equalTo('visibility', visibility);
    return await query.find()
}

/**
 * 
 * @param {*} get topic
 */
 export async function getTopic(topicId) {
    const query = new AV.Query('Topic');
    query.equalTo('objectId', topicId);
    return await query.find()
}