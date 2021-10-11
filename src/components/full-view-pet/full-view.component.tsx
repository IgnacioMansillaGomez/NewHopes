import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { Loading } from "../../loading/loading.component";
import { Header } from "../header/header.component";
import { DEFAULT_PET_IMAGE } from "../../constants/constants";

export const FullViewPet = () => {
  const { id }: any = useParams();
  const [pet, setPet] = useState<any>();

  useEffect(() => {
    debugger;
    MascotasAPI.getPet(id).then((respons) => {
      if (respons) {
        const pet = GenericSerializer.serialize(respons);

        setPet(pet);
      } else {
        console.log("No hay nada");
      }
    });
  }, []);

  return (
    <>
      <Header />
      {pet && (
        <div className="row">
          <Card
            sx={{ maxWidth: 345, margin: 5, minWidth: 345, minHeight: 469 }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                alt="Imagen Animal"
                image={pet.img_url ? pet.img_url : DEFAULT_PET_IMAGE}
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
                    <li>Raza:</li>
                  </ul>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      )}
      {!pet && <Loading />}
    </>
  );
};
