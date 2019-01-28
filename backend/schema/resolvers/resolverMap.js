export default {
    Node: {
        __resolveType(object){
            console.log(object)
            console.log(Object.keys(object))
            if(object.product_name){
                return 'Product'
            }
            return null
        }
    }
}