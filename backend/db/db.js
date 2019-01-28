import pgp from 'pg-promise'
import config from '../config'

const connection = pgp({})
export const db = connection(config.db)