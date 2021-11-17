/* Primero siempre lo de react!!*/
import React from "react";
import { useState, useEffect } from "react";

/*Segundo TODO lo que es libreria externa*/
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";

// import Link from "@mui/material/Link";

import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";

/*Tercer componentes propios */

import { auth } from "../../bd/fireAuth";
import { ModalTerminosCondiciones } from "../modal-terminos-condiciones/modal-terminos-condiciones.component";
import { Header } from "../header/header.component";
import { Footer } from "../../footer/footer.component";

/*Y al final el css*/

export const Register = () => {
  const theme = createTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const history = useHistory();
  /*Montaje*/
  useEffect(() => {
    console.log("Se monto el component for first time");
  }, []);

  /*Update*/
  useEffect(() => {
    console.log("Se redibuja el componente entonces es un update");
  }, [email]); /* variable de estado o props para el array */

  /*Desmontaje*/
  useEffect(() => {
    return () => {
      console.log("Desmontanding...");
    };
  }, []);

  //Funcion crear usuario
  const crearUsuario = () => {
    //Promesa
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        const user = userCredential.user;
      })
      //Manejo de errores en creación de usuario
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setMensajeError("Email inválido");
        } else if (error.code === "auth/weak-password") {
          setMensajeError("Contraseña debe tener como mínimo 6 caractéres");
        } else if (error.code === "auth/email-already-in-use") {
          setMensajeError("El email ya se encuentra registrado");
        } else {
          setMensajeError("No se ha podido completar la operación");
        }
      });
  };

  return (
    <>
      <Header />
      <div className="container login-cont__main bg-white">
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
                  Registrarse
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  variant="standard"
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
                  variant="standard"
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
                  onClick={crearUsuario}
                  sx={{ mt: 3, mb: 0.9 }}
                >
                  Registrarse con correo
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/login">Ya tienes cuenta? Inicia sesion</Link>
                  </Grid>
                </Grid>
                <p>
                  Al registrarse esta aceptando nuestros
                  <strong> Terminos y Condiciones</strong>
                  <ModalTerminosCondiciones />
                </p>
                {mensajeError ? <div>{mensajeError}</div> : <span></span>}
              </Box>
            </Container>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
