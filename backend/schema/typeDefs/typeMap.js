import {
    gql
} from 'apollo-server-express'

export default gql `
    interface Node {
        id: ID!
        product_name: String!
    }

    enum AgeGender {
        male
        female
        child
    }

    enum Fit {
        SKINNY
        STRAIGHT_FIT
        RELAXED
        SUPER_SKINNY
    }

    enum ProductCategory {
    FOOTWEAR
    TOPS
    BOTTOMS
    OUTERWEAR
    ACCESSORY
    }

    enum SubCategory {
    SWEATSHIRT
    SHIRT
    TANK_TOP
    DRESS_SHIRT
    SNEAKERS
    BOOTS
    DRESS_SHOE
    JEANS
    PANTS
    JOGGERS_SWEATPANTS
    SHORTS
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