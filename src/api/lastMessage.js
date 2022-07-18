const AV = require('leancloud-storage')
const LastMessage = AV.Object.extend('LastMessage')

export async function updateLastMessage(senderId,receiverId,message) {
    var query = new AV.Query('LastMessage')
    query.containsAll('members',[senderId,receiverId])
    query.find().then((msg) => {
        if (msg.length === 0) {
            const lastMessage = new LastMessage()
            lastMessage.set('members',[senderId,receiverId])
            lastMessage.set('message',message)
            return lastMessage.save()
        } else {
            msg[0].set('members',[senderId,receiverId])
            msg[0].set('message',message)
            return msg[0].save()
        }
    })


}

export async function getLastMessage(members) {
    var query = new AV.Query('LastMessage')
    query.containsAll('members',members)
    return await query.find()
  }