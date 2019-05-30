import Vue from 'vue'
import Vuex from 'vuex'
import { userModule } from '@/storeModules/userModule'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule
  },
  state: {},
  mutations: {},
  actions: {}
})
