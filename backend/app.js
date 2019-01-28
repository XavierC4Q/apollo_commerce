import express from 'express'
import config from './config'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import verifyToken from './helpers/verifyToken'
import { db } from './db/db'
import schema from './schema/index'

const app = express()
const gqlPath = '/graphql'

const gqlSchema = makeExecutableSchema({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
})


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(gqlPath, verifyToken)

const server = new ApolloServer({
    schema: gqlSchema,
    context: ({ req, res }) => ({
        user: req.user,
        db
    })
})

server.applyMiddleware({ app, gqlPath })

app.use('*', (req, res, next) => {
    let errors = new Error('Cannot navigate to page that does not exist')

    next(errors)
})


app.use((err, req, res) => {
    res.json(err)
})


app.listen(config.port, () => {
    console.log(`Server running on localhost:${config.port}${server.graphqlPath}`)
})