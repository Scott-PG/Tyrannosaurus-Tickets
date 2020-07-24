import React from "react";
import "./Layout.css";
import { useHistory, withRouter } from "react-router-dom";

const Nav = ({ user, handleLogout, location }) => {
  const history = useHistory();

  // we want to not show the logout button if the path is
  // /event/:id
  // so empty string before /event/ and nonempty string after
  const eventSandwich = location.pathname.split("/event");

  let onEventPage = false;

  if (eventSandwich[0] === "" && eventSandwich[1] !== "") {
    onEventPage = true;
  }

  const logoutButton = (
    <>
      {onEventPage ? null : (
        <button
          className="logout-button"
          onClick={() => {
            handleLogout();
            history.push("/");
          }}
        >
          Logout
        </button>
      )}
    </>
  );

  return (
    <header>
      <nav>{user ? logoutButton : ""}</nav>
    </header>
  );
};
export default withRouter(Nav);
