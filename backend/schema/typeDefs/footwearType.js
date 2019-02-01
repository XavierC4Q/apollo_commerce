import {
    gql
} from 'apollo-server-express'

export default gql `
    type Footwear implements Node {
        id: ID!
        product_id: Int!
        product_name: String!
        sub_category: SubCategory!
    }

    extend type Query {
        allFootwearBySubCategory(sub_category: SubCategory!): [Node]
        footwearAgeGender(sub_category: SubCategory! selection: AgeGender!): [AdvancedProduct!]!
    }
`