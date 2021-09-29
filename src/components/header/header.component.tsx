import React, { useState, useEffect } from "react";

import { Avatar, Checkbox, FormControlLabel } from "@mui/material";
import { Container, Navbar } from "react-bootstrap";
import { auth } from "../../bd/fireConfig";

export const Header = () => {
  const [usuario, setUsuario] = useState<string | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        setUsuario(user.email);
      }
    });
  }, []);

  const cerrarSesion = () => {
    auth.signOut();
    setUsuario(null);
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">New Hopes</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Usuario conectado : <span>Mark Otto</span>
          </Navbar.Text>
        </Navbar.Collapse>
        {usuario ? (
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
        ) : (
          <span></span>
        )}
      </Container>
    </Navbar>
  );
};
