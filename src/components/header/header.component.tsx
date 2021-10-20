import React, { useState, useEffect, useContext } from "react";

import { Container, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { SessionContext } from "../../contexts/session-manager.context";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";

import "./header.component.css";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { color } from "@mui/system";

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
            {!session?.session.uid && (
              <Link to="/login">
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ m: 1, color: "white" }}
                  endIcon={<LoginIcon sx={{ color: "#a83291" }} />}
                >
                  Ingresar
                </Button>
              </Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
        {session?.session.email && (
          <Button
            variant="contained"
            size="small"
            onClick={logout}
            sx={{ m: 0.5, color: "white" }}
            endIcon={<LogoutIcon color="action" />}
          >
            Cerrar Sesion
          </Button>
        )}
      </Container>
    </Navbar>
  );
};
