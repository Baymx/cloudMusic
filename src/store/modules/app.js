/**
 * store/modules/app.js
 */

import Vue from "vue";
import {
  APP_LOADING,
  APP_HIDELOADING,
  APP_TOAST,
  APP_SUCCESS,
  APP_FAILURE,
  APP_GET_STOTAGE,
  APP_SET_STOTAGE
} from "../mutation-types";
import { apiTest } from "../../api/app";
const state = {
  appMsg: "",
  token: ""
};

const getters = {};

const actions = {
  /**
   * demo
   * @param commit
   * @param params
   * @returns {Promise<*>}
   */
  apiGetDemo({ commit }, params) {
    return apiTest(params ? params : {});
  },
  /**
   * showLoading
   * @param commit
   * @param params
   */
  showLoading({ commit }, params) {
    commit(APP_LOADING, params);
  },
  /**
   * showToast
   * @param commit
   * @param params
   */
  showToast({ commit }, params) {
    commit(APP_TOAST, params);
  },
  /**
   * getStorage
   * @param commit
   * @param params
   */
  getStorage({ commit }, params) {
    commit(APP_GET_STOTAGE, params);
  },
  /**
   * setStorage
   * @param commit
   * @param params
   */
  setStorage({ commit }, params) {
    commit(APP_SET_STOTAGE, params);
  }
};
const mutations = {
  /**
   * APP_LOADING 全局的loading
   * @param state
   * @param data
   */
  [APP_LOADING](state, data) {
    wx.showLoading({
      title: data && data.text ? data.text : "加载中"
    });
  },
  /**
   * APP_HIDELOADING 全局的loading的隐藏
   * @param state
   * @param data
   */
  [APP_HIDELOADING](state, data) {
    wx.hideLoading();
  },
  /**
   * APP_TOAST 全局的toast
   * @param state
   * @param data
   */
  [APP_TOAST](state, data) {
    wx.showToast({
      title:
        typeof data == "object" && data.title
          ? data.title
          : data
            ? data
            : "未知消息",
      icon: typeof data == "object" && data.icon ? data.icon : "none",
      mask: true,
      duration: 2500
    });
  },
  /**
   * APP_GET_STOTAGE 全局的获取stotage
   * @param state
   * @param data
   */
  async [APP_GET_STOTAGE](state, data) {
    return await new Promise((resolve, reject) => {
      wx.getStorage({
        key: data.key,
        success: res => {
          resolve(res);
        },
        fail: error => {
          reject(error);
        }
      });
    });
  },
  /**
   * APP_SET_STOTAGE 全局的设置stotage
   * @param state
   * @param data
   */
  async [APP_SET_STOTAGE](state, data) {
    return await new Promise((resolve, reject) => {
      wx.setStorage({
        key: data.key,
        data : data.value,
        success: res => {
          resolve(res);
        },
        fail: error => {
          reject(error);
        }
      });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
