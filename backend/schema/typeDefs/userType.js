import {
    gql
} from 'apollo-server-express'

export default gql `
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    }

    extend type Query {
        allUsers: [User]
        getUser(username: String!): User
    }

    extend type Mutation {
        login(username: String! password: String!): String
        register(username: String! password: String! email: String!): String
        editUser(id: ID! username: String password: String email: String): Boolean!
    }
`