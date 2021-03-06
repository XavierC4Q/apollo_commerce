const allFootwearBySubCategory = `
SELECT *
FROM footwear
WHERE sub_category = $1
`

const selectFootwearByAgeGender = `
SELECT p.product_name, price, colors, sizes, p.id
FROM products AS p
JOIN prices ON prices.product_id = p.id
JOIN product_colors AS pc ON pc.product_id = prices.product_id
JOIN product_sizes AS ps ON ps.product_id = pc.product_id
JOIN footwear AS f ON f.product_id = pc.product_id
JOIN $1~ AS sub_cat ON sub_cat.product_id = f.product_id
WHERE $2~ = TRUE
`

export {
    allFootwearBySubCategory,
    selectFootwearByAgeGender
}