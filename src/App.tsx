import React from "react";
import { Login } from "./components/login/login.component";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Register } from "./components/register/register.component";

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}
