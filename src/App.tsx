import React from "react";
import { Login } from "./components/login/login.component";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Register } from "./components/register/register.component";
import { SessionProvider } from "./contexts/session-manager.context";
import { Pet } from "./components/pet/pet.component";
import { PetsList } from "./components/pets-list/pets-list.component";
import { FullViewPet } from "./components/full-view-pet/full-view.component";
import { NotAllowed } from "./components/not-allowed/not-allowed.component";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdminPetList } from "./components/admin-pet-list/admin-pet-list.component";
import { AdminAdopciones } from "./components/admin-adopciones/admin-adopciones.component";
import { AdminReports } from "./components/admin-reports/admin-reports.component";
import { Adopciones } from "./components/adopciones/adopciones.component";
import { ThemeProvider } from "@mui/material";
import { Theme } from "./components/main-theme/main-theme.component";
import { AdminTableDos } from "./components/admin-table-dos/admin-table-dos.component";
import { AdminTablePage } from "./components/admin-table-page/admin-table-page.component";

export function App() {
  return (
    <ThemeProvider theme={Theme}>
      <SessionProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL + "/"}>
          <Router>
            <Switch>
              <Route path="/new-pet">
                <Pet />
              </Route>
              <Route path="/edit-pet/:id">
                <Pet />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/full-view-pet/:id">
                <FullViewPet />
              </Route>
              <Route path="/not-allowed">
                <NotAllowed />
              </Route>
              <Route path="/admin-adopciones">
                <AdminAdopciones />
              </Route>
              <Route path="/admin-pet-list">
                <AdminPetList />
              </Route>
              <Route path="/admin-reports">
                <AdminReports />
              </Route>
              <Route path="/adopciones">
                <Adopciones />
              </Route>
              <Route path="/admin-table-page">
                <AdminTablePage />
              </Route>
              <Route path="/">
                <PetsList />
              </Route>
            </Switch>
          </Router>
        </BrowserRouter>
      </SessionProvider>
    </ThemeProvider>
  );
}
