import typeMap from './typeDefs/typeMap'
import UserType from './typeDefs/userType'
import ProductType from './typeDefs/productType'
import FootwearType from './typeDefs/footwearType'
import AdvancedProductType from './typeDefs/advancedProductType'

import ResolverMap from './resolvers/resolverMap'
import UserResolver from './resolvers/userResolver'
import ProductResolver from './resolvers/productResolver'
import FootwearResolver from './resolvers/footwearResolver'

export default {
    typeDefs: [typeMap, UserType, ProductType, FootwearType, AdvancedProductType],
    resolvers: [ResolverMap, UserResolver, ProductResolver, FootwearResolver]
}