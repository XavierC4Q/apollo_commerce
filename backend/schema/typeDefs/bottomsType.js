import {
    gql
} from 'apollo-server-express'

export default gql`
    type Bottoms implements Node {
        id: ID!
        product_id: Int!
        product_name: String!
        sub_category: SubCategory!
        fit: Fit!
    }

    extend type Query {
        allBottomsBySubCategory(sub_category: SubCategory!): [Node]
        bottomsByFit(sub_category: SubCategory! fit: Fit!): [Node]
        bottomsAgeGender(sub_category: SubCategory! selection: AgeGender!): [AdvancedProduct!]!
    }
`