import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../contexts/session-manager.context";
import { useHistory } from "react-router-dom";
import { Header } from "../header/header.component";
import { Footer } from "../../footer/footer.component";
import { PieReport } from "../pie-report/pie-report.component";
import { MascotasAPI } from "../../api/mascotas.api";
import { GenericSerializer } from "../../api/generic.serializer";
import { Loading } from "../loading/loading.component";
import { PieReportAdopciones } from "../pie-report/pie-report-adopciones";

import "./admin-reports.style.css";
import { PieReportNoAdopciones } from "../pie-report/pie-report-no-adopciones";

// import { TextField } from "@mui/material";

export const AdminReports = () => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const [petsList, setPetsList] = useState([]);
  const [petsListDos, setPetsListDos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataChartAdopciones, setDataChartAdopciones] = useState([]);
  const [dataChartNoAdopciones, setDataChartNoAdopciones] = useState([]);
  const [dataChartSize, setDataChartSize] = useState([]);

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
    // getPetsNoAdopted();
  }, []);

  useEffect(() => {
    if (petsList.length > 0) {
      processData();
    }
  }, [petsList]);

  // useEffect(() => {
  //   if (petsListDos.length > 0) {
  //     processData();
  //   }
  // }, [petsListDos]);

  const getPets = () => {
    setLoading(true);
    MascotasAPI.getAllPets().then((response: any) => {
      if (response.size !== 0) {
        const pets = GenericSerializer.serializeAll(response);
        setPetsList(pets);
      } else {
        setLoading(false);
      }
    });
  };

  // const getPetsNoAdopted = () => {
  //   setLoading(true);
  //   MascotasAPI.getAllNotAdoptedPets().then((response: any) => {
  //     if (response.size !== 0) {
  //       const pets = GenericSerializer.serializeAll(response);
  //       setPetsListDos(pets);
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // };

  const processData = () => {
    let adoptadas = 0;
    let noAdoptadas = 0;
    let tamanoChico = 0;
    let tamanoMediano = 0;
    let tamanoGrande = 0;
    let tamanoOtro = 0;

    petsList.forEach((pet: any) => {
      if (pet.adoptado === "true") {
        adoptadas++;
      } else {
        noAdoptadas++;
      }
      if (pet.tamano === "Chico") {
        tamanoChico++;
      } else if (pet.tamano === "Mediano") {
        tamanoMediano++;
      } else if (pet.tamano === "Grande") {
        tamanoGrande++;
      }
    });
    const dataAdopciones: any = [
      { name: "Mascotas Adoptadas", value: adoptadas },
    ];

    const dataNoAdopciones: any = [
      { name: "Mascotas No Adoptadas", value: noAdoptadas },
    ];

    setDataChartAdopciones(dataAdopciones);
    setDataChartNoAdopciones(dataNoAdopciones);
    const dataTamano: any = [
      { name: "Chico", value: tamanoChico },
      { name: "Mediano", value: tamanoMediano },
      { name: "Grande", value: tamanoGrande },
      { name: "Otro", value: tamanoOtro },
    ];
    setDataChartSize(dataTamano);
    setLoading(false);
  };

  return (
    <section className="fondo">
      <Header />
      <div className="container bg-white admin-reports__container">
        <div className="row pt-5 ">
          <div className="col-12 text-center ">
            <h2 className="titulo">Reportes</h2>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-6">
            {loading && <Loading />}
            {!loading && (
              <>
                <h3 className="text-center">
                  <strong>Mascotas Actuales - Tamaño</strong>
                </h3>

                <div className="text-center">
                  <PieReport data={dataChartSize} />
                </div>
              </>
            )}
          </div>
          <div className="col-6">
            {loading && <Loading />}
            {!loading && (
              <>
                <h3 className="text-center">
                  <strong>Mascotas No Adoptadas</strong>
                </h3>
                <PieReportNoAdopciones data={dataChartAdopciones} />
              </>
            )}
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-6">
            {loading && <Loading />}
            {!loading && (
              <>
                <h3 className="text-center">
                  <strong>Mascotas en Adopción</strong>
                </h3>
                <PieReportAdopciones data={dataChartNoAdopciones} />
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
