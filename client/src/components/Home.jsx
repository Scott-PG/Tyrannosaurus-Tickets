import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Home = ({ user, setUser }) => {
  const [signInToggle, setSignInToggle] = useState(true);

  const signInToggleFalse = () => {
    setSignInToggle(false);
  };

  const signInToggleTrue = () => {
    setSignInToggle(true);
  };

  return (
    <>
      <div className="home-dynamic">
        {!user ? (
          signInToggle ? (
            <SignIn setUser={setUser} signInToggleFalse={signInToggleFalse} />
          ) : (
            <SignUp setUser={setUser} signInToggleTrue={signInToggleTrue} />
          )
        ) : (
          "Signed IN!"
        )}
      </div>
    </>
  );
};

export default Home;
