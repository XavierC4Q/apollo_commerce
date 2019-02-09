import React from "react";
import { Link } from "react-router-dom";

export const HeaderComponent = () => {
  let loggedIn = localStorage.getItem("auth_token");

  return (
    <div>
      {loggedIn ? (
        <h4>logged in!!</h4>
      ) : (
        <nav>
          <Link to="/login">Login</Link> <Link to="/register">Register</Link>{" "}
          <Link to="/">Home</Link>
        </nav>
      )}
    </div>
  );
};
