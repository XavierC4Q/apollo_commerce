import { gql } from 'apollo-server-express'

export default gql`
    type Product implements Node {
        id: ID!
        product_name: String!
        category: ProductCategory!
    } 

    extend type Query {
        findProduct(id: ID!): Node
        productByCategory(category: ProductCategory!): [Node]
        allProducts: [Node]
        advancedSearch(category: ProductCategory! sub_category: SubCategory!): [AdvancedProduct]
        advancedInfo(id: ID!): AdvancedProduct
    }

    extend type Mutation {
        removeProduct(id: ID!): Boolean!
        updateProduct(
            id: ID! 
            product_name: String
            price: Float
            colors: [String]
            sizes: [String]
        ): Boolean!
        addProduct(
            product_name: String!
            price: Float!
            colors: [String!]!
            sizes: [String!]!
            male: Boolean!
            female: Boolean!
            child: Boolean!
            category: ProductCategory!
            subCategory: SubCategory!
            fit: Fit
            waterproof: Boolean
        ): Boolean!
    }
`