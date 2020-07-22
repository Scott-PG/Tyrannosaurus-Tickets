import React from "react";
import "./Layout.css";
import { useHistory, Link } from "react-router-dom";
import logo from "../../assets/t-rex-logo.png";

const Nav = ({ user, handleLogout }) => {
  const history = useHistory();

  const authenticatedOptions = (
    <>
      <Link className="link" to="/events">
        Events
      </Link>
      <button
        className="nav-logout-button"
        onClick={() => {
          handleLogout();
          history.push("/");
        }}
      >
        Logout
      </button>
    </>
  );

  const unauthenticatedOptions = (
    <>
      <Link className="link" to="/signup">
        Sign Up
      </Link>
      <Link className="link" to="/signin">
        Sign In
      </Link>
    </>
  );

  return (
    <header>
      <img className="logo" src={logo} alt="logo" />
      <nav>{user ? authenticatedOptions : unauthenticatedOptions}</nav>
    </header>
  );
};
export default Nav;
