import * as queries from '../../db/queries/user/user'
import jsonwebtoken from 'jsonwebtoken'
import config from '../../config'
import {
    comparePasswords,
    saltAndHashPassword
} from '../../helpers/auth'

export default {
    Query: {
        allUsers: async (_, args, {
            db
        }) => {
            try {
                return await db.any(queries.allUsers)
            } catch (err) {
                return null
            }
        },
        getUser: async (_, {
            username
        }, {
            db
        }) => {
            try {
                return await db.one(queries.getUser, [username])
            } catch (err) {
                return null
            }
        },
    },
    Mutation: {
        login: async (_, {
            username,
            password
        }) => {
            const validPassword = await comparePasswords(username, password);
            if (validPassword) {
                return jsonwebtoken.sign({ ...validPassword
                }, config.jwtSecret, {
                    expiresIn: "1d"
                });
            }
            return "";
        },
        register: async (_, {
            username,
            password,
            email
        }) => {
            try {
                const newUser = await db.one(queries.registerUser, [
                    username,
                    saltAndHashPassword(password),
                    email
                ]);
                return jsonwebtoken.sign({ ...newUser
                }, config.jwtSecret, {
                    expiresIn: "1y"
                });
            } catch (err) {
                return "";
            }
        },
        editUser: async (_, {
            id,
            username,
            password,
            email
        }, {
            db
        }) => {
            if (password) {
                password = saltAndHashPassword(password);
            }
            try {
                await db.none(queries.editUser, [username, password, email, id]);
                return true;
            } catch (err) {
                return false;
            }
        }
    }
}