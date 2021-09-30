import React from "react";
import { Login } from "./components/login/login.component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Register } from "./components/register/register.component";
import { Home } from "./components/home/home.component";
import { NewPet } from "./components/new-pet/new-pet.component";
import { PetsList } from "./components/pets-list/pets-list.component";

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/new-pet">
          <NewPet />
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
  );
}
