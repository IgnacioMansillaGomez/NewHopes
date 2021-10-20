import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { RazasAPI } from "../../api/razas.api";
import { GenericSerializer } from "../../api/generic.serializer";

export const FormularioEditar = (props: any) => {
  const [pet, setPet] = useState(props.pet);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 mb-5 offset-2">
          <h1 className="text-center">¡Conoce a {pet.nombre}!</h1>
        </div>
      </div>
      <div className="col-lg-9 offset-md-3">
        <div className="form-group row ">
          <div className="col-lg-6">
            <TextField
              id="standard-read-only-input"
              label="Nombre"
              defaultValue={pet.nombre}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </div>
          <div className="col-lg-6">
            <TextField
              id="standard-read-only-input"
              label="Especie"
              defaultValue={pet.specie ? "Perro" : "Gato"}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </div>
        </div>

        {/* Vacunas */}

        <div className="form-group row mt-5">
          <div className="col-lg-6">
            <TextField
              id="standard-read-only-input"
              label="Vacunas"
              defaultValue={pet.vaccinated ? "Vacunado" : "No Vacunado"}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </div>

          {/* Raza */}

          <div className="col-lg-6">
            <TextField
              id="standard-read-only-input"
              label="Raza"
              defaultValue={pet.id_raza}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </div>
        </div>

        {/* Pelaje */}

        <div className="form-group row mt-5">
          <div className="col-lg-6">
            <TextField
              id="standard-read-only-input"
              label="Pelaje"
              defaultValue={pet.pelaje}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </div>

          {/* Edad */}

          <div className="col-lg-6">
            <TextField
              id="standard-read-only-input"
              label="Edad"
              defaultValue={pet.edad_anos + " años"}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </div>
        </div>

        {/* Tamaño */}

        <div className="form-group row mt-5">
          <div className="col-lg-6">
            <TextField
              id="standard-read-only-input"
              label="Tamaño"
              defaultValue={pet.tamano}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </div>
          <div className="col-lg-6">
            <TextField
              id="standard-read-only-input"
              label="Fecha Publicación"
              defaultValue={
                pet.fecha_publicacion ? pet.fecha_publicacion : "Desconocida"
              }
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </div>
        </div>
        {/* Boton */}
        <div className="form-group row mt-5 offset-1">
          <div className="col-lg-10">
            <Button variant="contained" color="secondary" fullWidth>
              ¡Quiero Adoptar!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
