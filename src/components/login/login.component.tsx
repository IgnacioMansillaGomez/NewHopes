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
          history.push("/home");
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
    <ThemeProvider theme={theme}>
      <Header />
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
          <Avatar sx={{ m: 1, bgcolor: "ButtonFace" }}></Avatar>
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
            <Grid item>
              <Link to="/register">No tienes cuenta? Registrate aqui!</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
