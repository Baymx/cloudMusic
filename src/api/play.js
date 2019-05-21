import {
  get,
  post
} from '../http/api';

/**
 * apiGetSongUrl 获取歌曲url
 * @param options
 * @param callback
 * @returns {Promise<*>}
 */
export const apiGetSongUrl = (options, callback) => {
  return new Promise((resolve, reject) => {
    get('/song/url',options).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error)
    })
  });
}
/**
 * apiGetSongUrl 获取歌曲url
 * @param options
 * @param callback
 * @returns {Promise<*>}
 */
export const apiGetSongDetail = (options, callback) => {
  return new Promise((resolve, reject) => {
    get('/song/detail',options).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error)
    })
  });
}