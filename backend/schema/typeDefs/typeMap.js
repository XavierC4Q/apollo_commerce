import {
    gql
} from 'apollo-server-express'

export default gql `
    interface Node {
        id: ID!
        product_name: String!
    }

    enum ProductCategory {
    FOOTWEAR
    TOPS
    BOTTOMS
    OUTERWEAR
    ACCESSORY
    }

    enum Sleeve {
    SHORT
    LONG
    NONE
    }

    enum SubCategory {
    SWEATSHIRT
    SHIRT
    TANK_TOP
    DRESS_SHIRT
    CASUAL
    SNEAKERS
    BOOTS
    DRESS_SHOE
    }

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subsciption {
        _: Boolean
    }
`