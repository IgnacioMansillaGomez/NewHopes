import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import { SessionContext } from "../../contexts/session-manager.context";
import { useHistory } from "react-router";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import SortIcon from "@mui/icons-material/ArrowDownward";

const columns = [
  { name: "#", selector: (i = 1) => i++ },
  { name: "Especie", selector: (row: any) => row.especie },
  {
    name: "Nombre Mascota",
    selector: (row: any) => row.nombre,
    sortable: true,
  },
  { name: "Edad", selector: (row: any) => row.edad_anos },
  { name: "Sexo", selector: (row: any) => row.sexo },
  { name: "Tamaño", selector: (row: any) => row.tamano },
  { name: "Vacunas", selector: (row: any) => row.vacunas },
  { name: "Adoptado", selector: (row: any) => row.adoptado },
];

export const AdminTable = () => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const [petsList, setPetsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

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
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="container">
      <DataTable
        title="Todas las Mascotas de New Hopes"
        columns={columns}
        data={data}
        defaultSortFieldId="name"
        sortIcon={<SortIcon />}
        pagination
        paginationComponentOptions={paginationComponentOptions}
      />
    </div>
  );
};
