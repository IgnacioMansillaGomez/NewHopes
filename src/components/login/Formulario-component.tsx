// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// export const formulario = () => {
//   return (
//     <>
//       <form className="p-4 p-md-5 border rounded-3 bg-light">

import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {} from "../../bd/fireConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Avatar, Checkbox, FormControlLabel } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

export const Formulario = () => {
  const theme = createTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const crearUsuario = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

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
          <Box
            component="form"
            onSubmit={crearUsuario}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Registrarse con correo
            </Button>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 1, mb: 2 }}
              endIcon={<FcGoogle />}
            >
              Registrarse con google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
