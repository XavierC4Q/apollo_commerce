const getBottomsByFit = `
SELECT p.product_name, p.id, sub_category
FROM products AS p
JOIN bottoms AS b ON b.product_id = p.id
JOIN $1~ AS sub_cat ON sub_cat.product_id = b.product_id
WHERE fit = $2
`

const allBottomsBySubCategory = `
SELECT *
FROM bottoms
WHERE sub_category = $1
`

const selectBottomsByAgeGender = `
SELECT p.product_name, price, colors, sizes, p.id
FROM products AS p
JOIN prices ON prices.product_id = p.id
JOIN product_colors AS pc ON pc.product_id = prices.product_id
JOIN product_sizes AS ps ON ps.product_id = pc.product_id
JOIN bottoms AS b ON b.product_id = pc.product_id
JOIN $1~ AS sub_cat ON sub_cat.product_id = b.product_id
WHERE $2~ = TRUE
`

export {
    getBottomsByFit,
    allBottomsBySubCategory,
    selectBottomsByAgeGender
}