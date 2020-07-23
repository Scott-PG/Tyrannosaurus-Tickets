import React, { useState, useEffect } from "react";

import { verifyUser, signOut } from "../../services/user";

import Nav from "./Nav";
import Main from "../Main";
import Footer from "./Footer";

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
      <div>{user ? `Welcome, ${user.user_real_name}` : ""}</div>
      <Main user={user} setUser={setUser} />
      <Footer />
    </>
  );
};

export default Layout;
