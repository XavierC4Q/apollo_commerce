import { gql } from 'apollo-server-express'

export default gql`
    type AdvancedProduct {
        id: ID!
        product_name: String!
        price: Float!
        colors: [String!]!
        sizes: [String!]!
    }
`