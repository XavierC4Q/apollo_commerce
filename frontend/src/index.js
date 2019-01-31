import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
    uri: 'http://localhost:3500/graphql'
})



ReactDOM.render(
<ApolloProvider client={client}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</ApolloProvider>, document.getElementById('root'));

serviceWorker.unregister();
