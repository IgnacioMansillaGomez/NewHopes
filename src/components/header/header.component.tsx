import React, { useContext } from "react";

import { Container, Image, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { SessionContext } from "../../contexts/session-manager.context";

import "./header.component.css";
import { Button } from "@mui/material";

import { UserAvatar } from "../user-avatar/user-avatar.component";

export const Header = () => {
  const session = useContext(SessionContext);
  const history = useHistory();

  return (
    <div className="container-fluid p-0">
      <Navbar variant="dark" className="back">
        <Container>
          <Link to="/" className="header__brand-link">
            <Navbar.Brand style={{ fontSize: "2rem" }}>New Hopes</Navbar.Brand>
          </Link>
          <img
            src={process.env.PUBLIC_URL + "/img/patita.png"}
            width="30"
            height="27"
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
