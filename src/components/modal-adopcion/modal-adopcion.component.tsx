import { AnyCnameRecord } from "dns";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FormularioAdopcion } from "../formulario-adopcion/formulario-adopcion.component";

export const ModalAdopcion = (props: any) => {
  console.log(props);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal show={props.show} handleClose={props.handleClose}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Formulario Adoptante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioAdopcion />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Enviar
          </Button>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
