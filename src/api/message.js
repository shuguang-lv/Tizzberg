// import { realtime } from '@/main';
// import { getUserById } from './user';
import { realtime } from '@/main';
export const AV = require('leancloud-storage');
export const { TextMessage, ConversationQuery, createIMClient  } = require('leancloud-realtime');
let messageIterator = null

export async function sendMessage(receiverId,content) {
    let currentUserId = AV.User.current().get('objectId')
    let client = await realtime.createIMClient(currentUserId)
    let conversationQuery = client.getQuery().containsAll('m', [receiverId,currentUserId])
    let queryResult = await conversationQuery.find()
    return await queryResult[0].send(new TextMessage(content))
}

export async function getFriendList() {
    let user = AV.User.current()
    let {followers,followees} = await user.getFollowersAndFollowees()
    let friendList = followers.concat(followees)
    console.log(friendList)
    return friendList
}

export async function getMessageList(conversationQuery) {
    if (messageIterator !== null) {
        return await messageIterator.next()

    } else {
        let queryResult = await conversationQuery.first()
        createMessageIterator(queryResult)
        return await messageIterator.next()
    }
}

export async function createMessageIterator(conversation) {
    messageIterator = conversation.createMessagesIterator({ limit: 10 });
}

export function resetMessageIterator() {
    messageIterator = null
}