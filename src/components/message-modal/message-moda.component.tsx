import React from "react";
import { Button, Modal } from "react-bootstrap";

export const MessageModal = (props: any) => {
  const { handleOnClose, show, title, text, handleOnSuccess } = props;

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleOnSuccess}>
            Ok
          </Button>
          <Button variant="primary" onClick={handleOnClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
