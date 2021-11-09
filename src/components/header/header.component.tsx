import React, { useState, useEffect, useContext } from "react";

import { Container, Image, Navbar } from "react-bootstrap";
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
import { UserAvatar } from "../user-avatar/user-avatar.component";

export const Header = () => {
  const session = useContext(SessionContext);
  const history = useHistory();

  return (
    <div className="container-fluid p-0">
      <Navbar variant="dark" className="back">
        <Container>
          <Link to="/" className="header__brand-link">
            <Navbar.Brand style={{ fontSize: "1.7rem" }}>
              New Hopes
            </Navbar.Brand>
          </Link>
          <img
            src={process.env.PUBLIC_URL + "/img/logo-grande.jpg"}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {!session?.session?.uid && (
                <Link to="/login">
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      m: 0,
                    }}
                  >
                    Ingresar
                  </Button>
                </Link>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
          {session?.session?.email && <UserAvatar />}
        </Container>
      </Navbar>
    </div>
  );
};
