/* Primero siempre lo de react!!*/
import * as React from "react";
import { useState, useEffect } from "react";

/*Segundo TODO lo que es libreria externa*/
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FcGoogle } from "react-icons/fc";
import { createTheme, ThemeProvider } from "@mui/material/styles";
/*Tercer componentes propios */
import { auth } from "../../bd/fireAuth";
/*Y al final el css*/

export const Register = () => {
  const theme = createTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  /*Monaje  , se puede usar con desmontaje*/
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
      /**/
    };
  }, []);

  const crearUsuario = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
        if (error.code === "auth/invalid-email") {
          setMensajeError("Email inválido");
        } else if (error.code === "auth/weak-password") {
          setMensajeError("Contraseña debe tener como mínimo 6 caractéres");
        } else if (error.code === "auth/email-already-in-use") {
          setMensajeError("El email ya se encuentra registrado");
        } else {
          setMensajeError("No funca che ");
        }
      });
  };

  const provider = new GoogleAuthProvider();
  auth.languageCode = "es";
  const registroGoogle = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });

  //LogOut
  function logout() {
    auth.signOut();
  }

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
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
            onClick={crearUsuario}
            sx={{ mt: 3 }}
          >
            Registrarse con correo
          </Button>
          <Button
            variant="contained"
            type="button"
            fullWidth
            sx={{ mt: 1, mb: 2 }}
            endIcon={<FcGoogle />}
            onClick={registroGoogle}
          >
            Ingresar con Google
          </Button>
          {mensajeError ? <div>{mensajeError}</div> : <span></span>}
          <Grid container>
            <Grid item>
              <Link to="/login">Ya tienes cuenta? Inicia sesion</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
