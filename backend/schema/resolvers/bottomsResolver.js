import * as queries from '../../db/queries/bottoms/bottoms'

export default {
    Query: {
        allBottomsBySubCategory: async (_, {
            sub_category
        }, {
            db
        }) => {
            try {
                return await db.any(queries.allBottomsBySubCategory, [sub_category])
            } catch (err) {
                return null
            }
        },
        bottomsByFit: async (_, {
            sub_category,
            fit
        }, {
            db
        }) => {
            try {
                return await db.any(queries.getBottomsByFit, [sub_category.toLowerCase(), fit])
            } catch (err) {
                return null
            }
        },
        bottomsAgeGender: async (_, {
            sub_category,
            selection
        }, {
            db
        }) => {
            try {
                return db.any(queries.selectBottomsByAgeGender, [sub_category.toLowerCase(), selection])
            } catch (err) {
                return err
            }
        }
    }
}