require('dotenv').config()

export default {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    db: process.env.DB
}