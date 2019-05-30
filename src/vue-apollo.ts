import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
    uri: 'https://api.github.com/graphql'
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})
// ! Not able to export for some reason 
export default {
    apolloProvider
}