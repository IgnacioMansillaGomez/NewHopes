// import { Card, CardGroup, Col, Row } from "react-bootstrap";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const PetCard = (props: any) => {
  const [pet, setPet] = React.useState(props.pet);

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: 5, minWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            alt="Imagen Animal"
            image={pet.img_url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pet.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <ul>
                <li>Especie: {pet.especie}</li>
                <li>Tamaño: {pet.tamano}</li>
                <li>Vacunas: {pet.vacunas ? "Si" : "No"} esta vacunado.</li>
              </ul>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
