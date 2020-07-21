import React, { useState, useEffect } from "react";

import { verifyUser } from "../../services/user";

import Header from "./Header";
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
      <Header user={user} />
      <Main />
      <Footer />
    </>
  );
};

export default Layout;
