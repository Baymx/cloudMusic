import {
  get,
  post
} from '../http/api';

export const apiTest = (options, callback) => {
  return new Promise((resolve, reject) => {
    get('http://v.juhe.cn/toutiao/index').then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error)
    })
  });
}

/**
 * apiGetMvFirst 获取最新的mv
 * @param options
 * @param callback
 * @returns {Promise<*>}
 */
export const apiGetMvFirst = (options, callback) => {
  return new Promise((resolve, reject) => {
    get('/mv/first',options).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error)
    })
  });
}
/**
 * apiGetBanner 获取轮播图信息
 * @param options
 * @param callback
 * @returns {Promise<*>}
 */
export const apiGetBanner = (options, callback) => {
  return new Promise((resolve, reject) => {
    get('/banner',options).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error)
    })
  });
}
/**
 * apiGetPersonalized 获取推荐歌单
 * @param options
 * @param callback
 * @returns {Promise<*>}
 */
export const apiGetPersonalized = (options, callback) => {
  return new Promise((resolve, reject) => {
    get('/personalized',options).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error)
    })
  });
}
/**
 * apiGetPersonalized 获取推荐歌单
 * @param options
 * @param callback
 * @returns {Promise<*>}
 */
export const apiGetNewsong = (options, callback) => {
  return new Promise((resolve, reject) => {
    get('/personalized/newsong',options).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error)
    })
  });
}

/**
 * apiGetDJprogram 获取推荐电台
 * @param options
 * @param callback
 * @returns {Promise<*>}
 */
export const apiGetDJprogram = (options, callback) => {
  return new Promise((resolve, reject) => {
    get('/personalized/djprogram',options).then(function (res) {
      resolve(res);
    }).catch(function (error) {
      reject(error)
    })
  });
}

