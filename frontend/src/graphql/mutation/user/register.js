import gql from 'graphql-tag'

export const REGISTER_USER = gql`
    mutation register($username: String! $password: String! $email: String!) {
        register(username: $username password: $password email: $email)
    }
`