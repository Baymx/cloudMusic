import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './action';
import app from './modules/app';
import play from './modules/play';
import playList from './modules/playList';
// import state from './state';
// import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    app,
    play,
    playList
  },
})
