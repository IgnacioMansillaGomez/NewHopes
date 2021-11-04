import React, { PureComponent, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { MascotasAPI } from "../../api/mascotas.api";
import { useHistory } from "react-router-dom";
import { MessageModal } from "../message-modal/message-moda.component";
import { AdopcionesAPI } from "../../api/adopciones.api";
import { GenericSerializer } from "../../api/generic.serializer";
import { LoadingButton } from "@mui/lab";

export const DeletePetButton = (props: any) => {
  const { pet, size = "small", onDeleteSuccess } = props;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletePetMessage, setDeletePetMessage] = useState(false);

  const closeDeletePetMessage = () => {
    setDeletePetMessage(false);
  };

  const handleDeletePet = () => {
    setDeletePetMessage(true);
  };

  const deletePet = () => {
    setDeleteLoading(true);
    setDeletePetMessage(false);
    AdopcionesAPI.getRequestByPet(pet.id).then((response) => {
      if (response.size !== 0) {
        const solicitudes = GenericSerializer.serializeAll(response);
        solicitudes.forEach((solicitud: any) => {
          AdopcionesAPI.deleteRequest(solicitud.id);
        });
      }
    });
    MascotasAPI.deletePet(pet.id).then(() => {
      onDeleteSuccess();
    });
  };

  return (
    <>
      {pet && (
        <>
          <LoadingButton
            startIcon={size === "small" ? <DeleteIcon /> : <DeleteIcon />}
            title="Borrar"
            sx={{
              color: "#eb4034",
            }}
            onClick={handleDeletePet}
            loading={deleteLoading}
          >
            {size !== "small" ? "Borrar" : "BORRAR"}
          </LoadingButton>
          <MessageModal
            show={deletePetMessage}
            title="Eliminar Mascota"
            text={`¿Esta seguro de querer borrar esta mascota?
        ${
          pet.adoptado === "true"
            ? `¡Recuerde que ${pet.nombre} ya fue dado en adopción por ende tambien seran eliminados los datos de la misma!`
            : `
            ¡Recuerde que si existen solicitudes de adopción para ${pet.nombre} también seran eliminadas!`
        }`}
            handleOnClose={closeDeletePetMessage}
            handleOnSuccess={deletePet}
          />
        </>
      )}
    </>
  );
};
