import React from "react";
import "./Layout.css";
import { useHistory, Link } from "react-router-dom";
import logo from "../../assets/t-rex-logo.png";
import { withRouter } from "react-router-dom"

const Nav = ({ user, handleLogout, location }) => {
  const history = useHistory();

  // we want to not show the logout button if the path is 
  // /event/:id 
  // so empty string before /event/ and nonempty string after 
  const eventSandwich = location.pathname.split('/event/')

  let onEventPage = false 

  if (eventSandwich[0] === '' && eventSandwich[1] !== '') {
    onEventPage = true 
  }

  const authenticatedOptions = (
    <>
      <Link className="link" to="/events">
        Events
      </Link>

      {
        onEventPage ? null : (
        <button
          className="nav-logout-button"
          onClick={() => {
            handleLogout();
            history.push("/");
          }}
        >Logout
        </button>
        ) 
      }
        
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
export default withRouter(Nav);
