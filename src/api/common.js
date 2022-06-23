export const AV = require('leancloud-storage');

export async function deleteObj(id, className) {
  const query = new AV.Query(className);
  query.equalTo('objectId', id);
  try {
      const res = await query.find()
      if (res.length) {
          return res[0].destroy()
      } else {
          return Promise.reject('object does not exist')
      }
  } catch (error) {
      return Promise.reject('deletion failed')
  }
}