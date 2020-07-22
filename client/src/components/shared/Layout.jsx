import React, { useState, useEffect } from "react";

import { verifyUser, signOut } from "../../services/user";

import Nav from "./Nav";
import Main from "../Main";
import Footer from "./Footer";

const Layout = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const resp = await verifyUser();
      setUser(resp);
    };
    checkUser();
  }, [user]);

  const handleLogout = () => {
    signOut();
    setUser(false);
  };

  return (
    <>
      <Nav user={user} handleLogout={handleLogout} />
      <Main user={user} />
      <Footer />
    </>
  );
};

export default Layout;
