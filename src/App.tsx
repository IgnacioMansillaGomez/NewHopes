import React from "react";
import { Login } from "./components/login/login.component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Register } from "./components/register/register.component";
import { SessionProvider } from "./contexts/session-manager.context";
import { Home } from "./components/home/home.component";
import { NewPet } from "./components/new-pet/new-pet.component";
import { PetsList } from "./components/pets-list/pets-list.component";

export function App() {
  return (
    <SessionProvider>
      <Router>
        <Switch>
          <Route path="/new-pet">
            <NewPet /> {/* Child de route */}
          </Route>
          <Route path="/pets-list">
            <PetsList />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </SessionProvider>
  );
}
