export const AV = require('leancloud-storage')

export async function deleteObj(id, className) {
  const query = new AV.Query(className)
  query.equalTo('objectId', id)
  try {
    const res = await query.first()
    console.log(res)
    return res.destroy()
  } catch (error) {
    return Promise.reject('deletion failed')
  }
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
