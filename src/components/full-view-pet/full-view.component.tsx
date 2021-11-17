import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";

import { useParams, useHistory } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { Loading } from "../loading/loading.component";
import { Header } from "../header/header.component";
import { DEFAULT_PET_IMAGE } from "../../constants/constants";

import EditIcon from "@mui/icons-material/Edit";
import { FullViewInformacion } from "../full-view-informacion/full-view-informacion.component";
import { SessionContext } from "../../contexts/session-manager.context";
import { DeletePetButton } from "../delete-pet-button/delete-pet-button.component";
import { Footer } from "../../footer/footer.component";

import "./full-view.style.css";

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
      <div className="container ">
        {pet && (
          <div className="container mt-5 ">
            <div className="row ">
              <div className="col-lg-6">
                <img
                  src={pet.img_url ? pet.img_url : DEFAULT_PET_IMAGE}
                  className="img-fluid"
                  alt="Imagen Mascota"
                ></img>
              </div>
              <div className="col-lg-6 ">
                <FullViewInformacion pet={pet} />
                {sessionContext && sessionContext.isAdmin() && (
                  <div className="row mt-3 offset-4 mb-5">
                    <div className="col-lg-6 ">
                      {/* <div className="col-6"> */}
                      <DeletePetButton
                        pet={pet}
                        onDeleteSuccess={handleOnDeletePet}
                        size="big"
                      />
                      {/* </div> */}
                      {/* <div className="col-6 "> */}
                      <Button
                        startIcon={<EditIcon />}
                        sx={{
                          color: "#e6be0b",
                        }}
                        onClick={handleOnEdit}
                      >
                        Editar
                      </Button>
                      {/* </div> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {!pet && <Loading />}
      </div>
      <Footer />
    </>
  );
};
