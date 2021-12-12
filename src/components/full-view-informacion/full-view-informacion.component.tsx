import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { ModalAdopcion } from "../modal-adopcion/modal-adopcion.component";
import { useRaza } from "../../hooks/use-raza.hook";

import "./full-view-informacion.style.css";

export const FullViewInformacion = (props: any) => {
  const [pet, setPet] = useState(props.pet);
  const raza = useRaza(pet.id_raza);
  const [showModal, setShowModal] = useState(false);
  const [razaValue, setRazaValue] = useState(raza?.nombre_raza);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChangeRaza = (event: any, child: React.ReactNode) => {};

  return (
    <div className="container full-view-informacion__main">
      <div className="row ">
        <div className="col-lg-12 mb-5">
          <h1 className="text-center fw-bold">¡Conoce a {pet.nombre}!</h1>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="form-group row mt-3">
          <div className="col-lg-6">
            <ListGroup variant="flush">
              <ListGroup.Item>Mi Nombre es</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-lg-6">
            <TextField
              fullWidth
              id="standard-basic"
              variant="standard"
              defaultValue={pet.nombre}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        {/* Vacunas */}
        <div className="form-group row mt-3">
          <div className="col-6">
            <ListGroup variant="flush">
              <ListGroup.Item>Actualmente</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              id="standard-basic"
              variant="standard"
              defaultValue={
                pet.vacunas ? "Tengo mis Vacunas" : "No poseo mis vacunas"
              }
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>{" "}
        {/* Sexo */}
        <div className="form-group row mt-3">
          <div className="col-6">
            <ListGroup variant="flush">
              <ListGroup.Item>Soy</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              id="standard-basic"
              variant="standard"
              defaultValue={`${pet.sexo ? "Macho" : "Hembra"}`}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        {/* Pelaje */}
        <div className="form-group row mt-3">
          <div className="col-6">
            <ListGroup variant="flush">
              <ListGroup.Item>Mi pelo es</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              id="standard-basic"
              variant="standard"
              defaultValue={pet.pelaje}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        {/* Edad */}
        <div className="form-group row mt-3">
          <div className="col-6">
            <ListGroup variant="flush">
              <ListGroup.Item>Tengo</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              id="standard-basic"
              variant="standard"
              defaultValue={pet.edad_anos + " años"}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        {/* TAMAÑO */}
        <div className="form-group row mt-3">
          <div className="col-6">
            <ListGroup variant="flush">
              <ListGroup.Item>Mi tamaño es</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              id="standard-basic"
              variant="standard"
              defaultValue={pet.tamano}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        <div className="form-group row mt-3">
          <div className="col-6">
            <ListGroup variant="flush">
              <ListGroup.Item>El color de mi pelaje es</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-6">
            <TextField
              fullWidth
              id="standard-basic"
              variant="standard"
              defaultValue={pet.color}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        {/* Boton */}
        {pet.adoptado ? (
          pet.adoptado === "No" && (
            <div className="form-group row mt-5 offset-1">
              <div className="col-lg-10">
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleShow}
                >
                  ¡Quiero Adoptar!
                </Button>
              </div>
              <ModalAdopcion show={showModal} handleClose={handleClose} />
            </div>
          )
        ) : (
          <div className="form-group row mt-5 offset-1">
            <p>¡Ya me han adoptado!</p>
          </div>
        )}
      </div>
    </div>
  );
};
