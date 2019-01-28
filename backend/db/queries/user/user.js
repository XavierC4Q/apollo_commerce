const allUsers = `
SELECT * 
FROM users
`
const getUser = `
SELECT * 
FROM users 
WHERE username = $1
`
const register = `
INSERT INTO users (username, password, email)
VALUES ($1, $2, $3) 
RETURNING id, username
`
const editUser = `
UPDATE users 
SET username = $1, password = $2, email = $3
WHERE id = $4
`

export {
    allUsers,
    getUser,
    register,
    editUser
}