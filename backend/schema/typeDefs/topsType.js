import { gql } from 'apollo-server-express'

export default gql`
    type Tops implements Node {
        id: ID!
        product_id: Int!
        product_name: String!
        sub_category: SubCategory!
    }

    extend type Query {
        allTopsBySubCategory(sub_category: SubCategory!): [Node]
        topsAgeGender(sub_category: SubCategory! selection: AgeGender!): [AdvancedProduct!]!
    }
`