import * as queries from '../../db/queries/product/product';

export default {
    Query: {
        findProduct: async (_, {
            id
        }, {
            db
        }) => {
            try {
                return await db.one(queries.findProduct, [id])
            } catch (err) {
                return null
            }
        },
        allProducts: async (_, args, {
            db
        }) => {
            try {
                return await db.any(queries.allProducts)
            } catch (err) {
                return null
            }
        },
        productByCategory: async (_, {
            category
        }, {
            db
        }) => {
            try {
                return await db.any(queries.productByCategory, [category])
            } catch (err) {
                return null
            }
        },
        advancedSearch: async (_, {
            category,
            sub_category
        }, {
            db
        }) => {
            try {
                return await db.any(queries.advancedSearch, [
                    category.toLowerCase(),
                    sub_category
                ])
            } catch (err) {
                return null
            }
        },
        advancedInfo: async (_, {
            id
        }, {
            db
        }) => {
            try {
                return await db.one(queries.advancedProductInfo, [id])
            } catch (err) {
                return null
            }
        }
    },
    Mutation: {
        removeProduct: async (_, {
            product_id
        }, {
            db
        }) => {
            try {
                // YOU MUST REMOVE ALL RELATIONS BEFORE REMOVING FROM PRODUCTS
                // TRIGGER WILL DELETE FROM SUBCATEGORIES FOR YOU
                await db.none(queries.removePrice, [product_id])
                await db.none(queries.removeColors, [product_id])
                await db.none(queries.removeSizes, [product_id])
                await db.none(queries.removeProduct, [product_id])

                return true
            } catch (err) {
                return false
            }
        },
        addProduct: async (_, {
            product_name,
            price,
            colors,
            sizes,
            male,
            female,
            child,
            category,
            subCategory,
            fit,
            waterproof
        }, {
            db
        }) => {
            try {
                // INSERT INTO PRODUCTS TABLE FIRST
                return await db.one(queries.insertProduct, [
                    product_name,
                    category.toUpperCase()
                ]).then(async newProduct => {
                    // INSERT INTO PRODUCT CATEGORY
                    if (fit) {
                        // FOR BOTTOM PRODUCTS
                        return await db.one(queries.insertBottoms, [
                            newProduct.id, product_name, subCategory.toUpperCase(), fit.toUpperCase()
                        ])
                    } else if (waterproof !== undefined) {
                        // FOR OUTERWEAR PRODUCTS
                        return await db.one(queries.insertOuterwear, [
                            newProduct.id, product_name, subCategory.toUpperCase(), waterproof
                        ])
                    } else {
                        // FOR ALL OTHER KINDS OF PRODUCTS FOR NOW
                        return await db.one(queries.insertProductCategory, [
                            category.toLowerCase(), newProduct.id, product_name, subCategory.toUpperCase()
                        ])
                    }
                }).then(async product => {
                    // INSERT INTO SUB CATEGORY
                    return await db.one(queries.insertProductSubCategory, [
                        subCategory.toLowerCase(), product.product_id,
                        product_name, male, female, child
                    ])
                }).then(async data => {
                    // INSERT INTO PRICES, COLORS AND SIZES
                    await db.none(queries.insertIntoPrices, [data.product_id, price])
                    await db.none(queries.insertIntoProductColors, [data.product_id, colors])
                    await db.none(queries.insertIntoProductSizes, [data.product_id, sizes])
                }).then(() => {
                    return true
                })
            } catch (err) {
                return false
            }
        },
        updateProduct: async (_, {
            id,
            product_name,
            price,
            colors,
            sizes
        }, {
            db
        }) => {
            try {
                if (product_name) {
                    await db.none(queries.updateProduct, [product_name, id])
                }
                if (price !== undefined) {
                    await db.none(queries.updatePrice, [price, id])
                }
                if (colors && colors.length) {
                    await db.none(queries.updateColors, [colors, id])
                }
                if (sizes && sizes.length) {
                    await db.none(queries.updateSizes, [sizes, id])
                }

                return true
            } catch (err) {
                return false
            }
        }
    }
}