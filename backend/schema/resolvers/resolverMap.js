export default {
    Node: {
        __resolveType(object){
            console.log(object)
            if(object.product_name){
                return 'Product'
            }
            return null
        }
    }
}