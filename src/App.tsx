import React from "react";
import { Login } from "./components/login/login.component";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Register } from "./components/register/register.component";
import { Header } from "./components/header/header.component";
import { SessionProvider } from "./contexts/session-manager.context";

export function App() {
  return (
    <SessionProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <Header />
          </Route>
          <Route path="/">
            <Register />
          </Route>
        </Switch>
      </Router>
    </SessionProvider>
  );
}
