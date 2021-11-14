import React from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Footer } from "../../footer/footer.component";
import { Header } from "../header/header.component";

export const NotAllowed = () => {
  return (
    <div>
      <Header />
      {/* <div className="bg-danger p-5 text-center text-white">
        ¡Debe poseer permisos de administración!
      </div> */}
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>¡ERROR!</AlertTitle>
          No posee permisos de administración — Si posee cuenta autentiquese{" "}
          <Link to="/login">
            <strong>Inicio Sesion</strong>
          </Link>
        </Alert>
      </Stack>
      <Footer />
    </div>
  );
};
