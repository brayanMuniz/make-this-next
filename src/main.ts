import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from './firebaseConfig'
let auth = firebase.auth
const apolloClient = new ApolloClient({
  uri: 'https://api.github.com/graphql'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  async beforeCreate() {
    await auth.onAuthStateChanged(async user => {
      if (user) {
        store.commit("updateAuthData", user);
        console.log("TCL: created -> user", user);
        await this.$store.dispatch("getAndSetUserData").catch(err => {
          alert("There was a problem getting your data");
        });
      }
    });
  },
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
