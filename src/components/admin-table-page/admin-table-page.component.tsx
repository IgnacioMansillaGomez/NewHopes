import React, { forwardRef, useContext, useEffect, useState } from "react";
import { SessionContext } from "../../contexts/session-manager.context";
import { Link, useHistory } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";

import "../admin-reports/admin-reports.style.css";

import { Footer } from "../../footer/footer.component";
import { Header } from "../header/header.component";
import { createStyles, makeStyles } from "@mui/styles";
import { createMuiTheme, Theme } from "@mui/material/styles";
import { Loading } from "../loading/loading.component";
import { MuiThemeProvider } from "@material-ui/core";
import { AdminTableDos } from "../admin-table-dos/admin-table-dos.component";
const paper = "#fff";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // backgroundColor: theme.palette.background.paper,
      display: "block",
      padding: 0,
    },
  })
);

const secondTheme = createMuiTheme({
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          display: "block",
        },
      },
    },
  },
});

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
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  const classes = useStyles();

  return (
    <section className="fondo">
      <Header />
      <div className="container admin-reports__container">
        <div className="row mt-4">
          {loading && <Loading />}
          {data.length > 0 && !loading && (
            <div className={classes.root}>
              <MuiThemeProvider theme={secondTheme}>
                {/* <MaterialTable
                  title="Busqueda"
                  columns={columns}
                  data={data}
                  options={{
                    search: true,
                    exportButton: true,
                  }}
                  icons={tableIcons}
                  localization={{
                    body: {
                      emptyDataSourceMessage: "No hay registros para mostrar",
                      addTooltip: "Agregar",
                      deleteTooltip: "Eliminar",
                      editTooltip: "Editar",
                      filterRow: {
                        filterTooltip: "Filtrar",
                      },
                      editRow: {
                        deleteText: "¿Quieres borrar esta línea?",
                        cancelTooltip: "Cancelar",
                        saveTooltip: "Guardar",
                      },
                    },
                    grouping: {
                      placeholder: "Tirer l'entête ...",
                      groupedBy: "Agrupado por: ",
                    },
                    header: {
                      actions: "Acciones",
                    },
                    pagination: {
                      labelDisplayedRows: "{from}-{to} de {count}",
                      labelRowsSelect: "Filas",
                      labelRowsPerPage: "Filas por pagina: ",
                      firstAriaLabel: "Primer Página",
                      firstTooltip: "Primer Página",
                      previousAriaLabel: "Página anterior",
                      previousTooltip: "Página anterior",
                      nextAriaLabel: "Siguiente Página",
                      nextTooltip: "Siguiente Página",
                      lastAriaLabel: "Última Página",
                      lastTooltip: "Última Página",
                    },
                    toolbar: {
                      addRemoveColumns: "Ajouter ou supprimer des colonnes",
                      nRowsSelected: "{0} ligne(s) sélectionée(s)",
                      showColumnsTitle: "Ver Columnas",
                      showColumnsAriaLabel: "Ver Columnas",
                      exportTitle: "Exportar",
                      exportAriaLabel: "Exportar",
                      exportCSVName: "Exportar en CSV",
                      exportPDFName: "Exportar en PDF",
                      searchTooltip: "Buscar",
                      searchPlaceholder: "Buscar...",
                    },
                  }}
                /> */}
                <AdminTableDos />
              </MuiThemeProvider>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};
