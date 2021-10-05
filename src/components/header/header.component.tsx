import React, { useState, useEffect, useContext } from "react";

import { Container, Navbar } from "react-bootstrap";
import { auth } from "../../bd/fireAuth";
import { SessionContext } from "../../contexts/session-manager.context";

export const Header = () => {
  const [usuario, setUsuario] = useState<string | null>(null);

  const usuarioActivo = useContext(SessionContext);

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
        <Navbar.Brand>New Hopes</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Usuario conectado : <span>{usuario}</span>
          </Navbar.Text>
        </Navbar.Collapse>
        {usuario && <button onClick={cerrarSesion}>Cerrar Sesión</button>}
      </Container>
    </Navbar>
  );
};
