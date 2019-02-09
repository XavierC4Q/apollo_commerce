import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory';

import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache()

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('auth_token')
    console.log('AUTH TOKEN', token)
    operation.setContext({
        headers: {
            authorization: token ? token : ''
        }
    })
    return forward(operation)
})

const loggerLink = new ApolloLink((operation, forward) => {
    console.log(`EXCEUTING ${operation.operationName}`)
    return forward(operation).map(data => {
        console.log(`ENDING OPERATION ${operation.operationName}`)
        console.log(JSON.stringify(data, null, 2))
        return data
    })
})

const apiLink = new HttpLink({
    uri: 'http://localhost:3500/graphql'
})

const client = new ApolloClient({
    link: loggerLink.concat(authLink.concat(apiLink)),
    cache: cache
})



ReactDOM.render(
<ApolloProvider client={client}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</ApolloProvider>, document.getElementById('root'));

serviceWorker.unregister();
