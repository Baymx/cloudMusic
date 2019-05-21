/**
 * store/modules/app.js
 */
import {
  apiGetSongUrl,
  apiGetSongDetail
} from "../../api/play";
const state = {};

const getters = {};

const actions = {
  /**
   * getPersonalized 获取推荐歌单
   * @param commit
   * @param params
   * @returns {Promise<*>}
   */
  getSongUrl({
    commit
  }, params) {
    return apiGetSongUrl(params ? params : {});
  },
  /**
   * getSongDetail 获取歌曲详情
   * @param commit
   * @param params
   * @returns {Promise<*>}
   */
  getSongDetail({
    commit
  }, params) {
    return apiGetSongDetail(params ? params : {});
  }
};
const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations
};
