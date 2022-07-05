export const AV = require('leancloud-storage');

export async function sendProfileMessage(userId,content) {
    var status = new AV.Status(null, content);
    status.inboxType = 'profile';
    return AV.Status.sendPrivateStatus(status,userId)
}

export async function getAllProfileMessage() {
    var query = AV.Status.inboxQuery(AV.User.current(), 'profile');
    return query.find()
}
