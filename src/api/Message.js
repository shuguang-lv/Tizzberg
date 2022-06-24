export const AV = require('leancloud-storage');

export async function sendMessage(userId,content) {
    var status = new AV.Status(null, content);
    status.inboxType = 'private';
    return AV.Status.sendPrivateStatus(status,userId)
}
