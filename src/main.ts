import Vue from 'vue'
// import VueApollo from 'vue-apollo'
// import ApolloClient from 'apollo-boost'
import App from './App.vue'
import router from './router'
import store from './store'

// const apolloClient = new ApolloClient({
//   uri: 'https://api.github.com/graphql'
// })

// const apolloProvider = new VueApollo({
//   defaultClient: apolloClient,
// })

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  // apolloProvider,
  render: h => h(App)
}).$mount('#app')
