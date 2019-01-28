import jsonwebtoken from 'jsonwebtoken'

export default (req, res, next) => {
    const tokenPresent = req.headers['authorization']
    if(tokenPresent){
        jsonwebtoken.verify(tokenPresent, config.jwtSecret, (err, valid) => {
            if(valid){
                req.user = valid
            }
        })
    }
    next()
}