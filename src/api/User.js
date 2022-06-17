export const AV = require('leancloud-storage');

export async function userSignUp({username='',firstName="",lastName="",email="",emailVerified='',mobilePhoneNumber='',password='',identity=[],currentIdentity=''}) {
    const user = new AV.User()
    user.setUsername(username)
    user.set('firstName', firstName)
    user.set('lastName', lastName)
    user.set('firstName', identity)
    user.set('lastName', currentIdentity)
    user.setEmail(email)
    user.set('emailVerified', emailVerified)
    user.setMobilePhoneNumber(mobilePhoneNumber)
    user.setPassword(password)
    return user.signUp()
}

export async function deleteUser({objectId=''}) {
    const user = AV.User.createWithoutData('user', objectId);
    return user.destroy();
}

//TODO: authentication ?
export async function editUser(objectId,config,{username,firstName,lastName,identity,currentIdentity,email,emailVerified,mobilePhoneNumber}) {
    const user = AV.User.createWithoutData('User', objectId);
    if (username) {user.set('username',username)}
    if (firstName) {user.set('firstName', firstName)}
    if (lastName) {user.set('lastName', lastName)}
    if (identity) {user.set('identity', identity)}
    if (currentIdentity) {user.set('currentIdentity', currentIdentity)}
    if (email) {user.set('email', email)}
    if (emailVerified) {user.set('emailVerified', emailVerified)}
    if (mobilePhoneNumber) {user.set('mobilePhoneNumber', mobilePhoneNumber)}
    return user.save(null,config);
}


export async function userSignIn(username,password) {
    return AV.User.logIn(username, password)
}

export async function emailVerify(email) {
    return AV.User.requestEmailVerify(email);
}

export async function passwordResetByEmail(email) {
    return AV.User.requestPasswordReset(email);
}

export async function changeIdentity(identity,config) {
    const user = AV.User.current();
    if (identity) {user.set('identity',identity)}
    return user.save(null,config);
}

export async function getUserPost(objectId) {
    const query_user = new AV.Query('_User');
    const author = query_user.equalTo('objectId', objectId);
    const query_post = new AV.Query('Post');
    query_post.equalTo('author', author);
    return query_post.find()
}

export async function getUserFiction() {
    const author = AV.User.current();
    const query = new AV.Query('Fiction');
    query.equalTo('author', author);
    return query.find()
}

export async function getAllMessage() {
    let query = AV.Status.inboxQuery(AV.User.current(),'private');
    return query.find()
}

export async function getUnreadMessageCount() {
    let res = AV.Status.countUnreadStatuses(AV.User.current(),'private')
    return res
}

export async function followUser(user_object_id) {
    return AV.User.current().follow(user_object_id)
}

export async function unfollowUser(user_object_id) {
    return AV.User.current().unfollow(user_object_id)
}

export async function getAllFollower(user_object_id) {
    var query = AV.User.current().followerQuery();
    query.include('follower');
    return query.find();
}

export async function getAllFans(user_object_id) {
    var query = AV.User.current().followeeQuery();
    query.include('followee');
    return query.find();
}
