import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Events from "./Events";
import Event from "./Event";

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
        <Route exact path="/events/:id" render={() => <Event user={user} />} />
        <Route exact path="/events" render={() => <Events user={user} />} />
        <Route exact path="/" render={() => <Home user={user} />} />
      </Switch>
    </main>
  );
};

export default Main;
