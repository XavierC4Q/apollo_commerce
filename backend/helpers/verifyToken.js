import jsonwebtoken from 'jsonwebtoken'
import config from '../config'

export default (req, res, next) => {
    const tokenPresent = req.headers['authorization']
    if(tokenPresent){
        jsonwebtoken.verify(tokenPresent, config.jwtSecret, (err, valid) => {
            if (err){
                console.log('JSON TOKEN ERROR',err)
            }
            if(valid){
                console.log('VALID JSON TOKEN',valid)
                req.user = valid
            }
        })
    }
    next()
}