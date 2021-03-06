import React, { useState, useEffect } from "react";

import { verifyUser, signOut } from "../../services/user";

import Nav from "./Nav";
import Main from "../Main";

const Layout = () => {
  const [user, setUser] = useState(verifyUser());

  useEffect(() => {
    const verification = async () => {
      const resp = await verifyUser();
      setUser(resp);
    };
    verification();
  }, []);

  const handleLogout = () => {
    setUser(false);
    signOut();
  };

  return (
    <>
      <Nav user={user} handleLogout={handleLogout} />
      <Main user={user} setUser={setUser} />
    </>
  );
};

export default Layout;
