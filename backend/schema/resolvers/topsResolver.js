import * as queries from '../../db/queries/tops/tops'

export default {
    Query: {
        allTopsBySubCategory: async (_,{ sub_category }, { db }) => {
            try {
                return await db.any(queries.allTopsBySubCategory, [sub_category])
            } catch (err) {
                return null
            }
        },
        topsAgeGender: async (_, { sub_category, selection }, { db }) => {
            try {
                return await db.any(queries.selectTopsByAgeGender,[sub_category.toLowerCase(), selection])
            } catch (err) {
                return err
            }
        }
    }
}