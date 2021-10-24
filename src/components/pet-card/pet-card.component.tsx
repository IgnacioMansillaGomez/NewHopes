// import { Card, CardGroup, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { DEFAULT_PET_IMAGE } from "../../constants/constants";
import { useRaza } from "../../hooks/use-raza.hook";

export const PetCard = (props: any) => {
  const [pet, setPet] = useState(props.pet);
  const raza = useRaza(pet.id_raza);

  return (
    <Card sx={{ maxWidth: 345, margin: 5, minWidth: 345, minHeight: 469 }}>
      <CardActionArea>
        <Link to={`/full-view-pet/${pet.id}`}>
          <CardMedia
            component="img"
            height="300"
            alt="Imagen Animal"
            image={pet.img_url ? pet.img_url : DEFAULT_PET_IMAGE}
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pet.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <ul>
              <li>Especie: {pet.especie}</li>
              <li>Sexo: {pet.sexo ? "Macho" : "Hembra"}</li>
              <li>Tamaño: {pet.tamano}</li>
              <li>Raza: {raza?.nombre_raza || undefined}</li>
              <li>Edad: {pet.edad_anos} años</li>
              <li>Pelo: {pet.pelaje}</li>
              <li>Vacunas: {pet.vacunas ? "Si" : "No"} esta vacunado.</li>
            </ul>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
