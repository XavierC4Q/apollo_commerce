import bcrypt from 'bcryptjs'
import { db } from '../db/db'
import { getUser } from '../db/queries/user/user'

export const saltAndHashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

export const comparePasswords = async (username, password) => {
    try {
        const user = await db.one(getUser, [username])
        if(user){
            if (bcrypt.compareSync(password, user.password)){
                return user
            }
            return false
        }
        return false
    }
    catch(err){
        return null
    }
}