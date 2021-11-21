import React, { forwardRef, useContext, useEffect, useState } from "react";
import MaterialTable, { Icons } from "material-table";
import { SessionContext } from "../../contexts/session-manager.context";
import { useHistory } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";

import "../admin-reports/admin-reports.style.css";

import { Footer } from "../../footer/footer.component";
import { Header } from "../header/header.component";
import { tableIcons } from "../table-icons/table-icons";
import { createStyles, makeStyles } from "@mui/styles";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import { Loading } from "../loading/loading.component";

const paper = "#f2f2f2";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const secondTheme = createTheme();

export const AdminTablePage = () => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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

  const getPets = async () => {
    setLoading(true);
    await MascotasAPI.getAllPets().then((response: any) => {
      if (response.size !== 0) {
        const pets = GenericSerializer.serializeAll(response);
        setData(pets);
        console.log(pets);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  const columns = [
    { title: "N° Fila", field: "fila" },
    { title: "Especie", field: "especie" },
    {
      title: "Nombre Mascota",
      field: "nombre",
    },
    { title: "Edad", field: "edad_anos" },
    { title: "Sexo", field: "sexo" },
    { title: "Tamaño", field: "tamano" },
    { title: "Adoptado", field: "adoptado" },
  ];

  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={secondTheme}>
        <section className="fondo">
          <Header />
          <div className="container admin-reports__container ">
            {loading && <Loading />}
            {data.length > 0 && !loading && (
              <div className="row mt-4">
                <div className={classes.root} />
                <MaterialTable
                  title="Busqueda"
                  columns={columns}
                  data={data}
                  options={{
                    search: true,
                    exportButton: true,
                  }}
                  icons={tableIcons}
                />
              </div>
            )}
          </div>
          <Footer />
        </section>
      </ThemeProvider>
    </>
  );
};
