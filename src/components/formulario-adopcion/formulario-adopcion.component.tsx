import { TextField } from "@mui/material";
import React, { useState } from "react";

export const FormularioAdopcion = () => {
  const [nombreAdoptante, setNombreAdoptante] = useState("");
  const [apellidoAdoptante, setApellidoAdoptante] = useState("");

  const handleNombreChange = (e: any) => {
    setNombreAdoptante(e.target.value);
  };
  const handleApellidoChange = (e: any) => {
    setApellidoAdoptante(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>¡ Completa el formulario con tus datos !</h2>
          </div>
        </div>

        {/* NOMBRE Y APELLIDO */}

        <div className="row mt-5">
          <div className="col-6">
            <TextField
              required
              id="standard-required"
              label="Nombre"
              variant="standard"
              onChange={handleNombreChange}
            />
          </div>
          <div className="col-6">
            <TextField
              required
              id="standard-required"
              label="Apellido"
              variant="standard"
              onChange={handleApellidoChange}
            />
          </div>
        </div>

        {/* TELEFONO Y E-MAIL */}

        <div className="row mt-5">
          <div className="col-6">
            <TextField
              required
              id="standard-required"
              label="Telefono Celular"
              variant="standard"
              onChange={handleNombreChange}
            />
          </div>
          <div className="col-6">
            <TextField
              required
              id="standard-required"
              label="E-mail"
              variant="standard"
              onChange={handleApellidoChange}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            <TextField
              required
              id="standard-required"
              label="Nombre"
              variant="standard"
              onChange={handleNombreChange}
            />
          </div>
          <div className="col-6">
            <TextField
              required
              id="standard-required"
              label="Apellido"
              variant="standard"
              onChange={handleApellidoChange}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            <TextField
              required
              id="standard-required"
              label="Nombre"
              variant="standard"
              onChange={handleNombreChange}
            />
          </div>
          <div className="col-6">
            <TextField
              required
              id="standard-required"
              label="Apellido"
              variant="standard"
              onChange={handleApellidoChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
