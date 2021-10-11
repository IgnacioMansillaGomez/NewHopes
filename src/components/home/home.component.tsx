import React from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../header/header.component";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box, width } from "@mui/system";

export const Home = () => {
  const history = useHistory();
  const handleNew = () => {
    history.push("/new-pet");
  };
  const handlePetsList = () => {
    history.push("/pets-list");
  };

  return (
    <>
      <Header />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            p: 3,
          }}
        >
          <CardActionArea
            onClick={handleNew}
            sx={{
              height: 50,
              backgroundColor: "#f2da99",
              padding: 12,
            }}
          >
            <Typography variant="h2">
              <h2>Cargar Nueva Mascota</h2>
            </Typography>
          </CardActionArea>
        </Box>
        <Box
          sx={{
            p: 3,
          }}
        >
          <CardActionArea
            onClick={handlePetsList}
            sx={{
              height: 50,
              backgroundColor: "#f2da99",
              padding: 12,
            }}
          >
            <Typography variant="h2">
              <h2>Ver Listado Mascotas</h2>
            </Typography>
          </CardActionArea>
        </Box>
        <Box
          sx={{
            p: 3,
          }}
        >
          <CardActionArea
            onClick={handleNew}
            sx={{
              height: 50,
              backgroundColor: "#f2da99",
              padding: 12,
            }}
          >
            <Typography variant="h2">
              <h2>Cargar Nueva Mascota</h2>
            </Typography>
          </CardActionArea>
        </Box>
        <Box
          sx={{
            p: 3,
          }}
        >
          <CardActionArea
            onClick={handleNew}
            sx={{
              height: 50,
              backgroundColor: "#f2da99",
              padding: 12,
            }}
          >
            <Typography variant="h2">
              <h2>Cargar Nueva Mascota</h2>
            </Typography>
          </CardActionArea>
        </Box>
      </div>
    </>
  );
};
