import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Avatar } from "@mui/material";

import { useHistory } from "react-router-dom";

import { SessionContext } from "../../contexts/session-manager.context";
import { Header } from "../header/header.component";
import { ModalAdopcion } from "../modal-adopcion/modal-adopcion.component";
import { Footer } from "../../footer/footer.component";

export const Login: React.FC = (props) => {
  const theme = createTheme();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const sessionContext = useContext(SessionContext);

  const ingresoUsuario = () => {
    if (sessionContext !== undefined) {
      sessionContext
        .ingresoUsuario(email, password)
        .then(() => {
          history.push("/");
        })

        .catch((error) => {
          console.log(error);
          if (error.code === "auth/wrong-password") {
            setMensajeError("Contraseña inválida");
          }
          if (error.code === "auth/invalid-email") {
            setMensajeError("Email inválido");
          }
          if (error.code === "auth/internal-error") {
            setMensajeError("Campo contraseña no puede quedar vacío");
          }
        });
    }
  };

  return (
    <>
      <Header />
      <div className="container login-cont__main">
        <div className="row ">
          <div className="col">
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
                <Typography component="h1" variant="h5">
                  Ingresar
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  variant="standard"
                  sx={{ mt: 3 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  variant="standard"
                  sx={{ mt: 3 }}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  onClick={ingresoUsuario}
                  sx={{ mt: 3 }}
                >
                  Ingresar
                </Button>
                {mensajeError ? <div>{mensajeError}</div> : <span></span>}
                <Grid container>
                  <Grid item className="mt-3">
                    <Link to="/register">
                      ¿No tienes cuenta? ¡Registrate aqui!
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
