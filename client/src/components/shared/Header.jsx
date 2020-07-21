import React from "react";
import { useHistory, Link } from "react-router-dom";
import logo from "../../assets/t-rex-logo.png";

const Header = ({ user, handleLogout }) => {
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
      <Link className="link" to="/register">
        Sign Up
      </Link>
      <Link className="link" to="/login">
        Sign In
      </Link>
    </>
  );

  return (
    <header>
      <img src={logo} alt="logo" />
      <nav>{user ? authenticatedOptions : unauthenticatedOptions}</nav>
    </header>
  );
};
export default Header;
