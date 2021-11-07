import React, { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { Box, Button, FormControl, FormLabel, InputLabel } from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PetsIcon from "@mui/icons-material/Pets";
import WorkIcon from "@mui/icons-material/Work";
import FaceIcon from "@mui/icons-material/Face";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { Form } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";

import "./admin-solicitud-card.style.css";
import { SolicitudesAPI } from "../../api/solicitudes.api";
import { MessageModal } from "../message-modal/message-moda.component";
import { MascotasAPI } from "../../api/mascotas.api";

export const AdminSolicitudCard = (props: any) => {
  const { solicitud, handleClose, solicitudesProcesadas } = props;

  const [open, setOpen] = useState(true);
  const [rejectRequestMsg, setRejectRequestMsg] = useState(false);
  const [approveRequestMsg, setApproveRequestMsg] = useState(false);

  const handleRechazarSolicitud = (event: any) => {
    SolicitudesAPI.rejectRequest(solicitud.id).then((resp: any) => {
      setRejectRequestMsg(false);
      handleClose(event, true);
    });
  };

  const openRejectRequestMsg = () => {
    setRejectRequestMsg(true);
  };

  const closeRejectRequestMsg = () => {
    setRejectRequestMsg(false);
  };

  const handleAceptarSolicitud = (event: any) => {
    SolicitudesAPI.approveRequest(solicitud.id).then((response: any) => {
      MascotasAPI.updatePet(solicitud.pet.id, {
        adoptado: "true",
        fecha_adopcion: new Date().toDateString(),
      }).then((r: any) => {
        solicitudesProcesadas.forEach((item: any) => {
          if (
            item.id !== solicitud.id &&
            item.estado === "Pendiente" &&
            item.pet.id === solicitud.pet.id
          ) {
            SolicitudesAPI.markFinalized(item.id);
          }
        });
        setRejectRequestMsg(false);
        handleClose(event, true);
      });
    });
  };

  const openApproveRequestMsg = () => {
    setApproveRequestMsg(true);
  };

  const closeApproveRequestMsg = () => {
    setApproveRequestMsg(false);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Datos de {solicitud.pet.nombre}</h2>
          </div>
        </div>

        {/* NOMBRE Y APELLIDO */}

        <div className="row mt-5">
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              {solicitud.nombre_adoptante}
            </Box>
          </div>
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              {solicitud.apellido_adoptante}
            </Box>
          </div>
        </div>

        {/* Sexo */}

        <div className="row mt-4">
          <div className="col-10">
            <FormControl component="fieldset">
              <FormLabel component="legend">Genero</FormLabel>
              {solicitud.sexo_adoptante}
            </FormControl>
          </div>
        </div>

        {/* TELEFONO */}

        <div className="row mt-3">
          <div className="col-12">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <PhoneAndroidIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              {solicitud.telefono_adoptante}
            </Box>
          </div>
        </div>

        <div className="row mt-5">
          {/* E-MAIL */}
          <div className="col-12">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <MailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              {solicitud.email_adoptante}
            </Box>
          </div>
        </div>

        {/* Ciudad y direccion */}

        <div className="row mt-5">
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <HomeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              {solicitud.ciudad_adoptante}
            </Box>
          </div>
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <ApartmentIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              {solicitud.calle_adoptante}
            </Box>
          </div>
        </div>

        {/* Animales */}

        <div className="row mt-5">
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <PetsIcon sx={{ color: "action.active", mr: 1, my: 0.7 }} />
                  ¿Tiene mascota/as *?
                </FormLabel>
                {solicitud.mascotas_adoptante}
              </FormControl>
            </Box>
          </div>
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <FaceIcon sx={{ color: "action.active", mr: 1, my: 0.7 }} />
                  ¿Niños en su hogar *?
                </FormLabel>
                {solicitud.ninos_adoptante}
              </FormControl>
            </Box>
          </div>
        </div>

        {/* Ocupacion */}

        <div className="row mt-3">
          <div className="col-12">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <WorkIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              {solicitud.ocupacion_adoptante}
            </Box>
          </div>
        </div>

        {/* tipo vivienda */}

        <div className="row mt-5">
          <div className="col-12">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <HomeWorkIcon sx={{ color: "action.active", mr: 1, my: 1 }} />
              <FormControl
                variant="standard"
                sx={{ m: 1, mt: 0, minWidth: 120 }}
                fullWidth
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Tipo Vivienda
                </InputLabel>
                {solicitud.vivienda_adoptante}
              </FormControl>
            </Box>
          </div>
        </div>

        {/* Comentarios */}
        <div className="row mt-5">
          <div className="col-12">
            <Form.Group className="mb-3">
              <Form.Label>Cuentanos sobre ti</Form.Label>
              {solicitud.comentario_adoptante}
            </Form.Group>
          </div>
        </div>

        {/* Boton Enviar */}
      </div>
      <div className="row mt-5">
        <div className="col-3">
          {/* estados: Pendiente, Aceptada, Rechazada, Finalizada */}
          {solicitud.estado === "Pendiente" && (
            <>
              {/* se puede aceptar o rechazar */}
              <Button
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
                onClick={openApproveRequestMsg}
              >
                Aceptar Solicitud
              </Button>
              <Button
                variant="contained"
                color="error"
                endIcon={<SendIcon />}
                onClick={openRejectRequestMsg}
              >
                Rechazar Solicitud
              </Button>
            </>
          )}
        </div>
        <div className="col-3">
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancelar
          </Button>
        </div>
      </div>
      <MessageModal
        show={rejectRequestMsg}
        title="Rechazar Solicitud de adopción"
        text={`¿Esta seguro de querer RECHAZAR esta solicitud de adopción?`}
        handleOnClose={closeRejectRequestMsg}
        handleOnSuccess={handleRechazarSolicitud}
      />
      <MessageModal
        show={approveRequestMsg}
        title="Aceptar solicitud adopción"
        text={`¿Esta seguro de querer ACEPTAR esta solicitud de adopción?`}
        handleOnClose={closeApproveRequestMsg}
        handleOnSuccess={handleAceptarSolicitud}
      />
    </>
  );
};
