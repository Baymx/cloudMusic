/**
 * store/modules/app.js
 */
import {
  apiGetSongListDetail
} from "../../api/playList";
const state = {};

const getters = {};

const actions = {
  /**
   * songListDetail 获取歌单详情
   * @param commit
   * @param params
   * @returns {Promise<*>}
   */
  songListDetail({
    commit
  }, params) {
    return apiGetSongListDetail(params ? params : {});
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
