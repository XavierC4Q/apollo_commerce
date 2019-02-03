import React from "react";
import { Mutation } from "react-apollo";

import { LOGIN_USER } from "../../graphql/mutation/user/login";

export default class LoginComponent extends React.Component {
  state = {
    username: "",
    password: "",
    message: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <Mutation mutation={LOGIN_USER}>
        {(login, { data }) => {
          const handleLogin = async event => {
            event.preventDefault();
            try {
              const loginUser = await login({
                variables: { username, password }
              });
              const { data } = loginUser;

              if (!data.login) {
                this.setState({
                  username: "",
                  password: "",
                  message: "Invalid credentials. Check username and password"
                });
              } else {
                this.setState({
                  username: "",
                  password: "",
                  message: "Good Login"
                });
              }
            } catch (err) {
              this.setState({
                username: "",
                password: "",
                message: "Failed to login"
              });
            }
          };

          return (
            <div>
              <h1>Login Page</h1>
              <h3>{message}</h3>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  placeholder="Your username"
                />
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Your password"
                />
                {data && <p>{data.login}</p>}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
