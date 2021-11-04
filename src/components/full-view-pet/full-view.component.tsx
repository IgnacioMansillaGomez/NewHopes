import React, { useContext, useEffect, useState } from "react";
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
import { SessionContext } from "../../contexts/session-manager.context";
import { DeletePetButton } from "../delete-pet-button/delete-pet-button.component";
import { Footer } from "../../footer/footer.component";

export const FullViewPet = () => {
  const { id }: any = useParams();
  const [pet, setPet] = useState<any>();
  const history = useHistory();
  const sessionContext = useContext(SessionContext);

  useEffect(() => {
    MascotasAPI.getPet(id).then((respons) => {
      if (respons) {
        const pet = GenericSerializer.serialize(respons);
        setPet(pet);
      }
    });
  }, []);

  const handleOnEdit = () => {
    history.push(`/edit-pet/${pet.id}`);
  };

  const handleOnDeletePet = () => {
    history.push("/pets-list");
  };

  return (
    <>
      <Header />
      {pet && (
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6">
              <img
                src={pet.img_url ? pet.img_url : DEFAULT_PET_IMAGE}
                className="img-thumbnail h-675"
                alt="Imagen Mascota"
              ></img>
            </div>
            <div className="col-lg-6">
              <FullViewInformacion pet={pet} />
            </div>
          </div>
        </div>
      )}
      {!pet && <Loading />}
      {sessionContext && sessionContext.isAdmin() && (
        <div className="container">
          <div className="row">
            <div className="col-2">
              <DeletePetButton
                pet={pet}
                onDeleteSuccess={handleOnDeletePet}
                size="big"
              />
            </div>
            <div className="col-2">
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
        </div>
      )}
      <Footer />
    </>
  );
};
