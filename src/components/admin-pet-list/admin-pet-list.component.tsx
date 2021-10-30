import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../contexts/session-manager.context";
import { useHistory } from "react-router-dom";
import { Header } from "../header/header.component";
import { MascotasAPI } from "../../api/mascotas.api";
import { GenericSerializer } from "../../api/generic.serializer";
import { Loading } from "../loading/loading.component";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DeletePetButton } from "../delete-pet-button/delete-pet-button.component";

export const AdminPetList = () => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const [petsList, setPetsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionContext && sessionContext.session) {
      const sesion = sessionContext?.session;
      if (sesion?.uid === "") {
        history.push("/login");
      } else if (!sessionContext?.isAdmin()) {
        history.push("/not-allowed");
      }
    }
  }, [sessionContext]);

  useEffect(() => {
    getPets();
  }, []);

  const getPets = () => {
    setLoading(true);
    MascotasAPI.getAllPets().then((response: any) => {
      if (response.size !== 0) {
        const pets = GenericSerializer.serializeAll(response);
        setPetsList(pets);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  const handleOnEditPet = (id: any) => {
    history.push(`/edit-pet/${id}`);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Listado todas mascotas</h2>
          </div>
        </div>
        <div className="row">
          {loading && <Loading />}

          {petsList.length > 0 && (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Especie</th>
                    <th scope="col">Adoptado</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {petsList.map((pet: any, indice) => {
                    return (
                      <tr key={indice}>
                        <th scope="col">{indice + 1}</th>
                        <th scope="col">{pet.nombre}</th>
                        <th scope="col">{pet.especie}</th>
                        <th scope="col">
                          {pet.adoptado === "true" ? "Si" : "No"}
                        </th>
                        <th scope="col">
                          <Button
                            startIcon={<EditIcon />}
                            title="Editar"
                            sx={{
                              color: "#eb9234",
                            }}
                            onClick={() => handleOnEditPet(pet.id)}
                          />
                          <DeletePetButton
                            pet={pet}
                            onDeleteSuccess={getPets}
                          />
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};
