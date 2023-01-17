import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "routes/Navigation";
import Request from "routes/Request";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Navigation userObj={userObj} />
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/request/:tem">
              <Request />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Route exact path="/request/:tem">
              <Request />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
