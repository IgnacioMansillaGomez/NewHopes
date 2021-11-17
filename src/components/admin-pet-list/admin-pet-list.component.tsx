import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../contexts/session-manager.context";
import { Link, useHistory } from "react-router-dom";
import { Header } from "../header/header.component";
import { MascotasAPI } from "../../api/mascotas.api";
import { GenericSerializer } from "../../api/generic.serializer";
import { Loading } from "../loading/loading.component";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { DeletePetButton } from "../delete-pet-button/delete-pet-button.component";

import "./admin-pet-list.style.css";
import { AdminTable } from "../admin-table/admin-table.component";
import { Footer } from "../../footer/footer.component";

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

  const exportCvs = () => {
    let csvContent = `#,Nombre,Especie,Tamaño,Edad,Adoptado\n`;
    petsList.forEach((pet: any, id) => {
      csvContent =
        csvContent +
        `${id + 1},${pet.nombre},${pet.especie},${pet.tamano},${
          pet.edad_anos
        },${pet.adoptado == "true" ? "Si" : "No"}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "mascotas.csv");
    link.click();
  };

  return (
    <div className="admin-pet__main">
      <Header />
      <div className="container admin-pet__main-container">
        <div className="row pt-5 pb-4 text-center titulo">
          <div className="col">
            <h2>Listado todas nuestras mascotas</h2>
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
                    <th scope="col">Tamaño</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Adoptado</th>
                    <th scope="col"></th>
                    <th scope="col">
                      <button
                        onClick={exportCvs}
                        className="btn btn-info btn-sm"
                      >
                        Exportar
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {petsList.map((pet: any, indice) => {
                    return (
                      <tr key={indice}>
                        <th scope="col">{indice + 1}</th>
                        <th scope="col">
                          <Link
                            to={`/full-view-pet/${pet.id}`}
                            className="link-table"
                          >
                            {pet.nombre}
                          </Link>
                        </th>
                        <th scope="col">{pet.especie}</th>
                        <th scope="col">{pet.tamano}</th>
                        <th scope="col">{pet.edad_anos} años</th>
                        <th scope="col">
                          {pet.adoptado === "true" ? "Si" : "No"}
                        </th>
                        <th scope="col"></th>

                        <th scope="col">
                          <Button
                            startIcon={<EditIcon />}
                            title="Editar"
                            sx={{
                              color: "#eb9234",
                              marginRight: 8,
                            }}
                            onClick={() => handleOnEditPet(pet.id)}
                          >
                            Editar
                          </Button>
                          <DeletePetButton pet={pet} onDeleteSuccess={getPets}>
                            Borrar
                          </DeletePetButton>
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
      {/* <div className="container">
        <div className="row">
          <div className="col-10">
            <AdminTable />
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
};
