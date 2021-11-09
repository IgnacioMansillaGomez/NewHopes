import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../contexts/session-manager.context";
import { useHistory } from "react-router-dom";
import { Header } from "../header/header.component";
import { GenericSerializer } from "../../api/generic.serializer";
import { Loading } from "../loading/loading.component";
import { Footer } from "../../footer/footer.component";
import { SolicitudesAPI } from "../../api/solicitudes.api";
import { MascotasAPI } from "../../api/mascotas.api";
import { AdminModalAdopcion } from "../admin-modal-adopcion/admin-modal-adopcion.component";
import { Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const AdminAdopciones = () => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const [solicitudesProcesadas, setSolicitudesProcesadas] = useState<any[]>([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleClose = (_: any, shouldRefresh?: false) => {
    setShowModal(false);
    if (shouldRefresh) {
      getSolicitudes();
    }
  };

  const handleShow = (solicitud: any) => {
    setSolicitudSeleccionada(solicitud);
    setShowModal(true);
  };

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
    getSolicitudes();
    getPets();
  }, []);

  useEffect(() => {
    if (solicitudes.length > 0 && pets.length > 0) {
      const newSolicitudes: any[] = [];
      solicitudes.forEach((solicitud: any) => {
        const mascota = pets.find((pet: any) => {
          return pet.id === solicitud.id_mascota_peticion;
        });
        solicitud.pet = mascota;
        newSolicitudes.push(solicitud);
      });
      setLoading(false);
      setSolicitudesProcesadas(newSolicitudes);
    }
  }, [solicitudes, pets]);

  const getSolicitudes = () => {
    setLoading(true);
    SolicitudesAPI.getAllRequest().then((response: any) => {
      if (response.size !== 0) {
        const solicitudes = GenericSerializer.serializeAll(response);
        setSolicitudes(solicitudes);
      } else {
        setLoading(false);
      }
    });
  };

  const getPets = () => {
    setLoading(true);
    MascotasAPI.getAllPets().then((response: any) => {
      if (response.size !== 0) {
        const mascotas = GenericSerializer.serializeAll(response);
        setPets(mascotas);
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="container">
          <div className="row mt-5 mb-4 text-center titulo">
            <div className="col">
              <h2>Listado todas las Solicitudes</h2>
            </div>
          </div>
          <div className="row">
            {loading && <Loading />}

            {solicitudesProcesadas.length > 0 && (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Fecha</th>
                      <th scope="col">Nombre Mascota</th>
                      <th scope="col">Nombre Adoptante</th>
                      <th scope="col">Estado Actual</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudesProcesadas.map((solicitud: any, indice) => {
                      return (
                        <tr
                          key={indice}
                          className={
                            solicitud.estado === "Pendiente"
                              ? "table-white"
                              : solicitud.estado === "Aceptada"
                              ? "table-success"
                              : solicitud.estado === "Rechazada"
                              ? "table-danger"
                              : "table-secondary"
                          }
                        >
                          <th scope="col">{solicitud.fecha_emision}</th>
                          <th scope="col">{solicitud.pet.nombre}</th>
                          <th scope="col">{solicitud.nombre_adoptante}</th>
                          <th scope="col">{solicitud.estado}</th>
                          <th scope="col">
                            <Button
                              startIcon={<RemoveRedEyeIcon />}
                              title="Editar"
                              sx={{
                                color: "#A79CE7",
                                marginRight: 8,
                              }}
                              onClick={() => handleShow(solicitud)}
                            >
                              Ver
                            </Button>
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <AdminModalAdopcion
                  show={showModal}
                  handleClose={handleClose}
                  solicitud={solicitudSeleccionada}
                  solicitudesProcesadas={solicitudesProcesadas}
                />
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
