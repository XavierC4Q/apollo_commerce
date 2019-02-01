export default {
    Node: {
        __resolveType(object){
            console.log(object)
            const topSubCats = ["SWEATSHIRT", "DRESS_SHIRT", "TANK_TOP", "SHIRT"]
            const footwearSubCats = ["SNEAKERS", "BOOTS", "DRESS_SHOE"]
            const bottomsSubCats = ["JEANS", "PANTS", "JOGGERS_SWEATPANTS", "SHORTS"]
            if(object.sub_category){
                if(topSubCats.includes(object.sub_category)){
                    return 'Tops'
                }
                if(footwearSubCats.includes(object.sub_category)){
                    return 'Footwear'
                }
                if(bottomsSubCats.includes(object.sub_category)){
                    return 'Bottoms'
                }
                return null
            }
            if(object.product_name){
                return 'Product'
            }
            return null
        }
    }
}