import React from "react";
import { Redirect } from "react-router-dom";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../../graphql/mutation/user/register";

export default class RegisterComponent extends React.Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
    errors: {}
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      password,
      confirmPassword,
      email,
      confirmEmail,
      errors
    } = this.state;
    return (
      <Mutation mutation={REGISTER_USER}>
        {(register, { loading, err }) => {
          const handleRegister = async event => {
            event.preventDefault();
            let registerErrors = {};

            validate(
              username,
              registerErrors,
              password,
              confirmPassword,
              email,
              confirmEmail
            );

            if (Object.keys(registerErrors).length) {
              this.setState({
                username: "",
                password: "",
                email: "",
                confirmEmail: "",
                confirmPassword: "",
                errors: registerErrors
              });
            } else {
              try {
                const registerUser = await register({
                  variables: { username, password, email }
                });

                const { data } = registerUser;

                localStorage.setItem("auth_token", data.register);
                this.setState({
                  username: "",
                  password: "",
                  email: "",
                  confirmEmail: "",
                  confirmPassword: "",
                  errors: {}
                });
              } catch (err) {
                console.log("FAILURE TO REGISTER", err);
              }
            }
          };
          const loggedIn = localStorage.getItem("auth_token");
          if (loggedIn) {
            return <Redirect to="/" />;
          }
          return (
            <div>
              <h1>Register Here</h1>
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  onChange={this.handleChange}
                  value={username}
                />
                <div>
                  {errors.username ? errors.username : ""}
                  {errors.usernameLength ? errors.usernameLength : ""}
                </div>
                <input
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={this.handleChange}
                />
                <div>
                  {errors.password ? errors.password : ""}
                  {errors.passwordLength ? errors.passwordLength : ""}
                </div>
                <input
                  type="text"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={this.handleChange}
                />
                <div>
                  {errors.matchingPassword ? errors.matchingPassword : ""}
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={this.handleChange}
                />
                <div>
                  {errors.email ? errors.email : ""}
                  {errors.validEmail ? errors.validEmail : ""}
                </div>
                <input
                  type="text"
                  name="confirmEmail"
                  placeholder="Confirm your email"
                  value={confirmEmail}
                  onChange={this.handleChange}
                />
                <div>{errors.matchingEmail ? errors.matchingEmail : ""}</div>
                <div>
                  <button type="submit">Register</button>
                </div>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

const validate = (
  username,
  registerErrors,
  password,
  confirmPassword,
  email,
  confirmEmail
) => {
  if (!username) registerErrors.username = "USERNAME REQUIRED";
  if (username && username.length < 5)
    registerErrors.usernameLength = "USERNAME MUST BE AT LEAST 5 CHARACTERS";
  if (!password) registerErrors.password = "PASSWORD IS REQUIRED";
  if (password && password.length < 7)
    registerErrors.passwordLength = "PASSWORD MUST BE AT LEAST 7 CHARACTERS";
  if (password && password !== confirmPassword)
    registerErrors.matchingPassword = "PASSWORDS MUST MATCH";
  if (!email) registerErrors.email = "EMAIL IS REQUIRED";
  if (email && email.indexOf("@") === -1)
    registerErrors.validEmail = "EMAIL IS NOT VALID";
  if (email && email !== confirmEmail)
    registerErrors.matchingEmail = "EMAILS MUST MATCH";
  return null;
};
