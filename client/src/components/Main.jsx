import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Events from "./Events";

const Main = ({ user, setUser }) => {
  return (
    <main>
      <Switch>
        <Route
          path="/signin"
          render={() =>
            user ? <Redirect to="/" /> : <SignIn setUser={setUser} />
          }
        />
        <Route
          path="/signup"
          render={() =>
            user ? <Redirect to="/" /> : <SignUp setUser={setUser} />
          }
        />
        {/* <Route exact path="/events/:id" render={() => <Event user={user} />} /> */}
        <Route path="/events" render={() => <Events user={user} />} />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </main>
  );
};

export default Main;
