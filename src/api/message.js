// import { realtime } from '@/main';
// import { getUserById } from './user';
import { realtime } from '@/main';
export const AV = require('leancloud-storage');
export const { TextMessage, ConversationQuery, createIMClient  } = require('leancloud-realtime');

export async function sendMessage(receiverId,content) {
    let currentUserId = AV.User.current().get('objectId')
    let client = await realtime.createIMClient(currentUserId)
    let conversationQuery = client.getQuery().containsAll('m', [receiverId,currentUserId])
    let queryResult = await conversationQuery.find()
    return await queryResult[0].send(new TextMessage(content))
}

export async function getFriendList() {
    let user = AV.User.current()
    let friendList = user.getFollowersAndFollowees()
    for (let friend in friendList) {
        let currentUserId = AV.User.current().get('objectId')
        let client = await realtime.createIMClient(currentUserId)
        let conversationQuery = client.getQuery().containedIn('m', [friendList[friend].objectId,currentUserId])
        let queryResult = await conversationQuery.find()[0].withLastMessagesRefreshed(true);
        console.log(queryResult)
    }
    return user.getFollowersAndFollowees()
}

export async function getMessageList(conversationQuery) {
    let queryResult = await conversationQuery.find()
    //console.log(await queryResult[0].queryMessages())
    return await queryResult[0].queryMessages() 
}