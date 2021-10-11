import React, { useState, useEffect, useContext } from "react";

import { Container, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { SessionContext } from "../../contexts/session-manager.context";

import "./header.component.css";

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
        <Link to="/home" className="header__brand-link">
          <Navbar.Brand>New Hopes</Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {session?.session.uid && <span>{session?.session.email}</span>}
            {!session?.session.uid && <Link to="/login">Ingresar</Link>}
          </Navbar.Text>
        </Navbar.Collapse>
        {session?.session.email && (
          <button onClick={logout}>Cerrar Sesión</button>
        )}
      </Container>
    </Navbar>
  );
};
