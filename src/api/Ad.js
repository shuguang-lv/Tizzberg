import { deleteObj } from '../api/common'
export const AV = require('leancloud-storage');
const Ad = AV.Object.extend('Ad');

export async function addAd(ad_info) {
    const ad = new Ad()
    // ad.set('title', title)
    // ad.set('URL', URL)
    // ad.set('imgURL', imgURL)
    // ad.set('num_click', num_click)
    // ad.set('description', description)
    ad.set(ad_info)
    return ad.save()
}

export async function deleteAd({objectId=''}) {
    deleteObj(objectId,'Ad')
}

/**
 * use object id to find and edit ad
 * @param {*} objectId 
 * @param {*} config 
 * @param {*} param2 
 */
export async function editAd(objectId,config,{title,URL,imgURL,num_click,description}) {
    const query = new AV.Query('Ad');
    query.equalTo('objectId', objectId);
    query.find().then((res) => {
        const ad = res
        if (URL) {ad.set('URL',URL)}
        if (title) {ad.set('title', title)}
        if (imgURL) {ad.set('imgURL', imgURL)}
        if (num_click) {ad.set('num_click', num_click)}
        if (description) {ad.set('description', description)}
        return ad.save(null,config);
      });
      

}

export async function getAllAd() {
    const query = new AV.Query('Ad');
    return query.find()
}

export async function getAd(objectId) {
    const query = new AV.Query('Ad');
    query.equalTo('objectId', objectId);
    return query.find()
}