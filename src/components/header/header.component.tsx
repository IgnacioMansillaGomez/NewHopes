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
import { UserAvatar } from "../user-avatar/user-avatar.component";

export const Header = () => {
  const session = useContext(SessionContext);
  const history = useHistory();

  return (
    <div className="container-fluid p-0">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="header__brand-link">
            <Navbar.Brand style={{ fontSize: "1.7rem" }}>
              New Hopes
            </Navbar.Brand>
          </Link>
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
                      color: "white",
                      background: "#9d84bf",
                      "&:hover": {
                        background: "#5f4a7d",
                      },
                    }}
                    endIcon={<LoginIcon sx={{ color: "#a83291" }} />}
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
