import {
  get,
  post
} from '../http/api';

/**
 * apiGetSongListDetail 获取歌单详情
 * @param options
 * @param callback
 * @returns {Promise<*>}
 */
export const apiGetSongListDetail = (options, callback) => {
  return new Promise((resolve, reject) => {
    get('/playlist/detail',options).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error)
    })
  });
}