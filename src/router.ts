import Vue from 'vue'
import Router from 'vue-router'
import landing from './views/landing.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: landing
    },
  ]
})
