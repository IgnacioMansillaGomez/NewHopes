import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { RazasAPI } from "../../api/razas.api";
import { GenericSerializer } from "../../api/generic.serializer";
import { Raza, useRaza } from "../../hooks/use-raza.hook";

export const FormularioEditar = (props: any) => {
  const [pet, setPet] = useState(props.pet);
  const raza = useRaza(pet.id_raza);

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
              value={pet.especie}
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
              defaultValue={pet.vacunas ? "Vacunado" : "No Vacunado"}
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
              defaultValue=""
              value={raza?.nombre_raza}
              InputProps={{
                readOnly: true,
              }}
              label="Raza"
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
              label="Sexo"
              defaultValue={pet.sexo ? "Macho" : "Hembra"}
              // ? pet.fecha_publicacion : "Desconocida"
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
