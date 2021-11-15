import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../contexts/session-manager.context";
import { Link, useHistory } from "react-router-dom";
import { Header } from "../header/header.component";
import { GenericSerializer } from "../../api/generic.serializer";
import { Loading } from "../loading/loading.component";
import { Footer } from "../../footer/footer.component";
import { SolicitudesAPI } from "../../api/solicitudes.api";
import { MascotasAPI } from "../../api/mascotas.api";

import "./adopciones.style.css";

export const Adopciones = () => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const [solicitudesProcesadas, setSolicitudesProcesadas] = useState<any[]>([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionContext && sessionContext.session) {
      const sesion = sessionContext?.session;
      if (sesion?.uid === "") {
        history.push("/login");
      }

      getSolicitudes();
      getPets();
    }
  }, [sessionContext]);

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
    SolicitudesAPI.getMyRequest(sessionContext?.session?.uid).then(
      (response: any) => {
        if (response.size !== 0) {
          const solicitudes = GenericSerializer.serializeAll(response);
          setSolicitudes(solicitudes);
        } else {
          setLoading(false);
        }
      }
    );
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
    <section className="adopciones__main">
      <Header />
      <div className="container-fluid ">
        <div className="container adopciones-cont__main">
          <div className="row pt-5 pb-4 text-center titulo">
            <div className="col">
              <h2>Mis Adopciones</h2>
            </div>
          </div>
          <div className="row">
            {loading && <Loading />}

            {solicitudesProcesadas.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Nombre Mascota</th>
                    <th scope="col">Nombre Adoptante</th>
                    <th scope="col">Estado Actual</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudesProcesadas.map((solicitud: any, indice) => {
                    return (
                      <tr key={indice}>
                        <th scope="col">{solicitud.fecha_emision}</th>
                        <th scope="col">{solicitud.pet.nombre}</th>
                        <th scope="col">{solicitud.nombre_adoptante}</th>
                        <th scope="col">{solicitud.estado}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {solicitudesProcesadas.length === 0 && (
              <div className="bg-grey">
                <Link to="/">
                  <p className="text-center">
                    No tienes ninguna solicitud abierta, ve todas nuestras
                    mascotas
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
