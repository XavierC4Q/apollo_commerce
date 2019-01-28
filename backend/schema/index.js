import typeMap from './typeDefs/typeMap'
import UserType from './typeDefs/userType'
import ProductType from './typeDefs/productType'

import ResolverMap from './resolvers/resolverMap'
import UserResolver from './resolvers/userResolver'
import ProductResolver from './resolvers/productResolver'

export default {
    typeDefs: [typeMap, UserType, ProductType],
    resolvers: [ResolverMap, UserResolver, ProductResolver]
}