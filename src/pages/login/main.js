import Vue from 'vue'
import Vuex from 'vuex';
import store from '@/store/index';
import App from './index'
Vue.use(Vuex);

const app = new Vue({
  ...App,
  store
})
app.$mount()
