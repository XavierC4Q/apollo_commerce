import gql from 'graphql-tag'

export default {
    defaults: {
        loggedIn: false,
        currentUser: null
    },
    resolvers: {
        Query: {},
        Mutation: {}
    }
}