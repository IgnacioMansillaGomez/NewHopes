import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { AdminSolicitudCard } from "../admin-solicitud-card/admin-solicitud-card.component";

import "./modal-adopcion.style.css";

export const AdminModalAdopcion = (props: any) => {
  const { handleClose, solicitud, show, solicitudesProcesadas } = props;
  return (
    <>
      <Modal show={show} handleClose={handleClose}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Datos Personales Adoptante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminSolicitudCard
            solicitud={solicitud}
            handleClose={handleClose}
            solicitudesProcesadas={solicitudesProcesadas}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
