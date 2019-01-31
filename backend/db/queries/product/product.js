const findProduct = `
SELECT *
FROM products
WHERE id = $1
`

const advancedProductInfo = `
SELECT p.product_name, price, colors, sizes, p.id
FROM products AS p
JOIN prices ON prices.product_id = p.id
JOIN product_colors AS pc ON pc.product_id = prices.product_id
JOIN product_sizes AS ps ON ps.product_id = pc.product_id
WHERE ps.product_id = $1
`

const advancedSearch = `
SELECT p.product_name, price, colors, sizes, p.id
FROM products AS p
JOIN prices ON prices.product_id = p.id
JOIN product_colors AS pc ON pc.product_id = prices.product_id
JOIN product_sizes AS ps ON ps.product_id = pc.product_id
JOIN $1~ AS cat ON cat.product_id = pc.product_id
WHERE cat.sub_category = $2
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

const updateProduct = `
UPDATE products
SET product_name = $1
WHERE id = $2
`

const updatePrice = `
UPDATE prices
SET price = $1
WHERE product_id = $2
`

const updateSizes = `
UPDATE product_sizes
SET sizes = $1
WHERE product_id = $2
`

const updateColors = `
UPDATE product_colors
SET colors = $1
WHERE product_id = $2
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
    removeSizes,
    updateProduct,
    updatePrice,
    updateColors,
    updateSizes,
    advancedSearch,
    advancedProductInfo
}