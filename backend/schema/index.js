import typeMap from './typeDefs/typeMap'
import UserType from './typeDefs/userType'
import ProductType from './typeDefs/productType'
import FootwearType from './typeDefs/footwearType'
import AdvancedProductType from './typeDefs/advancedProductType'
import TopsType from './typeDefs/topsType'
import BottomsType from './typeDefs/bottomsType'

import ResolverMap from './resolvers/resolverMap'
import UserResolver from './resolvers/userResolver'
import ProductResolver from './resolvers/productResolver'
import FootwearResolver from './resolvers/footwearResolver'
import TopsResolver from './resolvers/topsResolver'
import BottomsResolver from './resolvers/bottomsResolver'

export default {
    typeDefs: [
        typeMap, 
        UserType, 
        ProductType, 
        FootwearType, 
        AdvancedProductType, 
        TopsType,
        BottomsType
    ],
    resolvers: [
        ResolverMap, 
        UserResolver, 
        ProductResolver, 
        FootwearResolver, 
        TopsResolver,
        BottomsResolver
    ]
}