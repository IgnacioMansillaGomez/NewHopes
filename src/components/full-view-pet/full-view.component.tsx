import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { useParams, useHistory } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { Loading } from "../loading/loading.component";
import { Header } from "../header/header.component";
import { DEFAULT_PET_IMAGE } from "../../constants/constants";
import { MessageModal } from "../message-modal/message-moda.component";
import EditIcon from "@mui/icons-material/Edit";
import { FullViewInformacion } from "../full-view-informacion/full-view-informacion.component";
import { Figure } from "react-bootstrap";

export const FullViewPet = () => {
  const { id }: any = useParams();
  const [pet, setPet] = useState<any>();
  const history = useHistory();
  const [deletePetMessage, setDeletePetMessage] = useState(false);

  useEffect(() => {
    MascotasAPI.getPet(id).then((respons) => {
      if (respons) {
        const pet = GenericSerializer.serialize(respons);
        setPet(pet);
      }
    });
  }, []);

  const handleDeletePet = () => {
    setDeletePetMessage(true);
  };

  const handleOnEdit = () => {
    history.push(`/edit-pet/${pet.id}`);
  };

  const closeDeletePetMessage = () => {
    setDeletePetMessage(false);
  };

  const deletePet = () => {
    MascotasAPI.deletePet(id).then(() => {
      history.push("/pets-list");
    });
  };

  return (
    <>
      <Header />
      {pet && (
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-lg-6">
              <img
                src={pet.image_url ? pet.image_URL : DEFAULT_PET_IMAGE}
                className="img-thumbnail h-675"
                alt="Imagen Mascota"
              ></img>
            </div>
            <div className="col-6">
              <FullViewInformacion pet={pet} />
            </div>
          </div>
          <MessageModal
            show={deletePetMessage}
            title="Eliminar Mascota"
            text="¿Esta seguro de querer borrar esta mascota?"
            handleOnClose={closeDeletePetMessage}
            handleOnSuccess={deletePet}
          />
        </div>
      )}
      {!pet && <Loading />}
      <div className="row">
        <div className="col-1">
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDeletePet}
            sx={{
              color: "red",
            }}
          >
            Eliminar
          </Button>
        </div>
        <div className="col-1">
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{
              color: "#e6be0b",
            }}
            onClick={handleOnEdit}
          >
            Editar
          </Button>
        </div>
      </div>
    </>
  );
};
