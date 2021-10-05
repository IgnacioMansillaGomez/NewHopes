import React, { useState, useEffect, useContext } from "react";

import { Container, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../../contexts/session-manager.context";

export const Header = () => {
  const session = useContext(SessionContext);
  const history = useHistory();
  const logout = () => {
    session && session.logout && session.logout();
    history.push("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>New Hopes</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Usuario conectado : <span>{session?.session.email}</span>
          </Navbar.Text>
        </Navbar.Collapse>
        {session?.session.email && (
          <button onClick={logout}>Cerrar Sesión</button>
        )}
      </Container>
    </Navbar>
  );
};
