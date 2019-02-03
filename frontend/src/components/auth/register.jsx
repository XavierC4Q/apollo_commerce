import React from 'react';
import { Mutation } from 'react-apollo'
import { REGISTER_USER } from '../../graphql/mutation/user/register'

export default class RegisterComponent extends React.Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmEmail: ''
    }

    handleChange = event => {

    }
    render(){
        return(
            <div></div>
        )
    }
}