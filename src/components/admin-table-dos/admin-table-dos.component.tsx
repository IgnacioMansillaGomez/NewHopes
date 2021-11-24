import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { SessionContext } from "../../contexts/session-manager.context";
import MUIDataTable from "mui-datatables";

export const AdminTableDos = () => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const [petList, setPetList] = useState([]);

  const columns = [
    {
      name: "nombre",
      label: "Nombre Mascota",
      options: {
        filter: true,
        sort: true,
        draggable: false,
      },
    },
    {
      name: "especie",
      label: "Especie",
      options: {
        filter: true,
        sort: false,
        draggable: false,
      },
    },
    {
      name: "sexo",
      label: "Sexo",
      options: {
        filter: true,
        sort: false,
        draggable: false,
      },
    },
    {
      name: "adoptado",
      label: "Adoptado",
      options: {
        filter: true,
        sort: false,
        draggable: false,
      },
    },
    {
      name: "tamano",
      label: "Tamaño",
      options: {
        filter: true,
        sort: false,
        draggable: false,
      },
    },
    {
      name: "edad_anos",
      label: "Edad",
      options: {
        filter: true,
        sort: false,
        draggable: false,
      },
    },
  ];

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
    MascotasAPI.getAllPets().then((response: any) => {
      if (response.size !== 0) {
        const pet = GenericSerializer.serializeAll(response);
        if (pet.sexo === "true" ? "Macho" : "Hembra") setPetList(pet);
      }
    });
  };

  const options = {
    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column: any) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Página Siguiente",
        previous: "Página Anterior",
        rowsPerPage: "Filas por Página:",
        displayRows: "of",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtros",
      },
      filter: {
        all: "TODOS",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostar/Esconder Columnas Tabla",
      },
      selectedRows: {
        text: "row(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    },

    fixedHeader: true,
    selectableRowsOnClick: false,
    selectableRowsHideCheckboxes: true,
  };

  return (
    <>
      <MUIDataTable
        title={"Lista Mascotas"}
        data={petList}
        columns={columns}
        options={options}
      />
    </>
  );
};
