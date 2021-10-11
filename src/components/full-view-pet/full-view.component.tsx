import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { Loading } from "../../loading/loading.component";
import { Header } from "../header/header.component";
import { DEFAULT_PET_IMAGE } from "../../constants/constants";
import { RazasAPI } from "../../api/razas.api";

export const FullViewPet = () => {
  const { id }: any = useParams();
  const [pet, setPet] = useState<any>();
  const [raza, setRaza] = useState<any>({ nombre_raza: "" });

  useEffect(() => {
    MascotasAPI.getPet(id).then((respons) => {
      if (respons) {
        const pet = GenericSerializer.serialize(respons);
        debugger;
        setPet(pet);
      } else {
        console.log("No hay nada");
      }
    });
  }, []);

  useEffect(() => {
    debugger;
    if (pet) {
      RazasAPI.getRace(pet.id_raza).then((response) => {
        const raza = GenericSerializer.serialize(response);
        debugger;
        setRaza(raza);
      });
    }
  }, [pet]);

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
                    <li>Raza:{raza.nombre_raza}</li>
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
