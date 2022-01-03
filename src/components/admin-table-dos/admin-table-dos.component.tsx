import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { SessionContext } from "../../contexts/session-manager.context";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import { DeletePetButton } from "../delete-pet-button/delete-pet-button.component";
import EditIcon from "@mui/icons-material/Edit";

export const AdminTableDos = () => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const [petList, setPetList] = useState([]);

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
    setPetList([]);
    MascotasAPI.getAllPets().then((response: any) => {
      if (response.size !== 0) {
        const pets = GenericSerializer.serializeAll(response);
        setPetList(pets);
      }
    });
  };
  const handleOnEditPet = (id: any) => {
    history.push(`/edit-pet/${id}`);
  };
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
    {
      name: "accion_borrar",
      label: " ",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <DeletePetButton
              pet={tableMeta.tableData[tableMeta.rowIndex]}
              onDeleteSuccess={getPets} //Es una referencia a la FUNCION no la estamos ejecutando!
            >
              Borrar
            </DeletePetButton>
          );
        },
        filter: false,
        sort: false,
        draggable: false,
      },
    },
    {
      name: "accion_editar",
      label: " ",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <Button
              startIcon={<EditIcon />}
              title="Editar"
              sx={{
                color: "#eb9234",
                marginRight: 8,
              }}
              onClick={() =>
                handleOnEditPet(tableMeta.tableData[tableMeta.rowIndex].id)
              }
            >
              Editar
            </Button>
          );
        },
        filter: false,
        sort: false,
        draggable: false,
      },
    },
  ];

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
