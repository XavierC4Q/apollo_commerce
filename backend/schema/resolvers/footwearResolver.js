import * as queries from '../../db/queries/footwear/footwear'

export default {
    Query: {
        allFootwearBySubCategory: async (_, {
            sub_category
        }, {
            db
        }) => {
            try {
                return await db.any(queries.allFootwearBySubCategory, [sub_category])
            } catch (err) {
                return null
            }
        },
        footwearAgeGender: async (_,{
            sub_category,
            selection
        }, { db }) => {
            try {
                return await db.any(queries.selectFootwearByAgeGender,[sub_category.toLowerCase(), selection])
            } catch (err) {
                return err
            }
        }
    }
}