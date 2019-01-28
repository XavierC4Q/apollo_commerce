const findProduct = `
SELECT *
FROM products
WHERE id = $1
`
const productByCategory = `
SELECT *
FROM products
WHERE category = $1
`

const allProducts = `
SELECT *
FROM products
`

const insertProduct = `
INSERT INTO products (product_name, category)
VALUES ($1, $2)
RETURNING id, product_name
`

const insertProductCategory = `
INSERT INTO $1~ (product_id, product_name, sub_category)
VALUES ($2, $3, $4)
RETURNING product_id, product_name
`

const insertProductSubCategory = `
INSERT INTO $1~ (product_id, product_name, male, female, child)
VALUES ($2, $3, $4, $5, $6)
RETURNING product_id, product_name
`

const insertIntoPrices = `
INSERT INTO prices (product_id, price)
VALUES($1, $2)
`

const insertIntoProductColors = `
INSERT INTO product_colors (product_id, colors)
VALUES($1, $2)
`

const insertIntoProductSizes = `
INSERT INTO product_sizes (product_id, sizes)
VALUES($1, $2)
`

const removeProduct = `
DELETE FROM products
WHERE id = $1
`

const removePrice = `
DELETE FROM prices
WHERE product_id = $1
`

const removeColors = `
DELETE FROM product_colors
WHERE product_id = $1
`

const removeSizes = `
DELETE FROM product_sizes
WHERE product_id = $1
`

export {
    findProduct,
    productByCategory,
    allProducts,
    insertProduct,
    insertProductCategory,
    insertProductSubCategory,
    insertIntoPrices,
    insertIntoProductColors,
    insertIntoProductSizes,
    removeProduct,
    removePrice,
    removeColors,
    removeSizes
}