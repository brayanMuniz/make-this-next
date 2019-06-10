import Vue from 'vue'
import Vuex from 'vuex'
import { userModule } from '@/storeModules/userModule'
import { githubModule } from '@/storeModules/githubModule'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    githubModule
  },
  state: {},
  mutations: {},
  actions: {}
})
