import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { useParams, useHistory } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { Loading } from "../loading/loading.component";
import { Header } from "../header/header.component";
import { DEFAULT_PET_IMAGE } from "../../constants/constants";
import { RazasAPI } from "../../api/razas.api";
import { FormularioAgregarMascotas } from "../formulario-mascotas/formulario-mascotas.component";
import { FormularioEditar } from "../formulario-editar.component/formulario-editar.component";

export const FullViewPet = () => {
  const { id }: any = useParams();
  const [pet, setPet] = useState<any>();
  const [raza, setRaza] = useState<any>({ nombre_raza: "" });
  const history = useHistory();
  useEffect(() => {
    MascotasAPI.getPet(id).then((respons) => {
      if (respons) {
        const pet = GenericSerializer.serialize(respons);
        setPet(pet);
      }
    });
  }, []);

  useEffect(() => {
    if (pet) {
      RazasAPI.getRace(pet.id_raza).then((response) => {
        const raza = GenericSerializer.serialize(response);
        setRaza(raza);
      });
    }
  }, [pet]);

  const handleDeletePet = () => {
    if (window.confirm("¿Esta seguro de eliminar esta mascota?")) {
      MascotasAPI.deletePet(id);
      alert("Se elimino la mascota");
      history.push("/pets-list");
    }
  };

  return (
    <>
      <Header />
      {pet && (
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-lg-3">
              <img
                src={pet.img_url ? pet.img_url : DEFAULT_PET_IMAGE}
                className="img-fluid rounded"
              ></img>
            </div>
            <div className="col-6">
              <FormularioEditar pet={pet} />
            </div>
            <div className="col-1">
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleDeletePet}
              >
                Eliminar
              </Button>
            </div>
            <div className="col-1">
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                Editar
              </Button>
            </div>
          </div>
        </div>
      )}
      {!pet && <Loading />}
    </>
  );
};
