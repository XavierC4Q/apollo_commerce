const allFootwearBySubCategory = `
SELECT *
FROM footwear
WHERE sub_category = $1
`

export {
    allFootwearBySubCategory
}