import React, { useState, useEffect } from "react";

import { verifyUser } from "../../services/user";

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

  return (
    <>
      <Nav user={user} />
      <Main user={user} />
      <Footer />
    </>
  );
};

export default Layout;
