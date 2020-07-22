import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const Main = ({ user: propUser, handleLogIn, handleRegister }) => {
  const [user, setUser] = useState(propUser);

  useEffect(() => setUser(propUser), [propUser]);

  return (
    <main>
      {/* <Switch>
        <Route exact path="/" render={() => <Home user={user} />} />
        <Route
          exact
          path="/signin"
          render={() => (user ? <Redirect to="/" /> : <SignIn />)}
        />
        <Route
          exact
          path="/signup"
          render={() => (user ? <Redirect to="/" /> : <SignUp />)}
        />
        <Route exact path="/events/:id" render={() => <Event user={user} />} />
        <Route exact path="/events" render={() => <Events user={user} />} />
      </Switch> */}
    </main>
  );
};

export default Main;
