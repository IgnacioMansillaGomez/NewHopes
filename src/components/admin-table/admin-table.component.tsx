import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";

import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { SessionContext } from "../../contexts/session-manager.context";
import { useHistory } from "react-router";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import SortIcon from "@mui/icons-material/ArrowDownward";
import Button from "@restart/ui/esm/Button";

// export const AdminTable = () => {
//   const history = useHistory();
//   const sessionContext = useContext(SessionContext);
//   const [petsList, setPetsList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [totalRows, setTotalRows] = useState(0);
//   const [perPage, setPerPage] = useState(10);

//   useEffect(() => {
//     if (sessionContext && sessionContext.session) {
//       const sesion = sessionContext?.session;
//       if (sesion?.uid === "") {
//         history.push("/login");
//       } else if (!sessionContext?.isAdmin()) {
//         history.push("/not-allowed");
//       }
//     }
//   }, [sessionContext]);

//   useEffect(() => {
//     getPets();
//   }, []);

//   const getPets = async () => {
//     setLoading(true);
//     await MascotasAPI.getAllPets().then((response: any) => {
//       if (response.size !== 0) {
//         const pets = GenericSerializer.serializeAll(response);
//         setData(pets);
//         setLoading(false);
//       } else {
//         setLoading(false);
//       }
//     });
//   };
//   const paginationComponentOptions = {
//     rowsPerPageText: "Filas por página",
//     rangeSeparatorText: "de",
//     selectAllRowsItem: true,
//     selectAllRowsItemText: "Todos",
//   };

//   const columns = [
//     { name: "N° Fila", selector: (i = 1) => i++ },
//     { name: "Especie", selector: (row: any) => row.especie },
//     {
//       name: "Nombre Mascota",
//       selector: (row: any) => row.nombre,
//       sortable: true,
//     },
//     { name: "Edad", selector: (row: any) => row.edad_anos },
//     { name: "Sexo", selector: (row: any) => row.sexo },
//     { name: "Tamaño", selector: (row: any) => row.tamano },
//     { name: "Vacunas", selector: (row: any) => row.vacunas },
//     { name: "Adoptado", selector: (row: any) => row.adoptado },
//   ];
//   return (
//     <div className="container">
//       <DataTable
//         title="Todas las Mascotas de New Hopes"
//         columns={columns}
//         data={data}
//         defaultSortFieldId="name"
//         sortIcon={<SortIcon />}
//         pagination
//         paginationComponentOptions={paginationComponentOptions}
//         fixedHeader
//         highlightOnHover
//       />
//     </div>
//   );
// };

export const AdminTable = () => {
  const _export = React.useRef<ExcelExport | null>(null);

  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const [petsList, setPetsList] = useState([]);
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
  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save(data);
    }
  };
  return (
    <ExcelExport ref={_export}>
      <Grid style={{ height: "420px" }} data={data}>
        <GridToolbar>
          <button
            title="Exportar Excel"
            className="btn-primary"
            onClick={excelExport}
          >
            Exportar formato Excel
          </button>
        </GridToolbar>
        <GridColumn field="nombre" title="Nombre Mascota" width="250px" />
        <GridColumn field="sexo" title="Sexo" width="250px" />
        <GridColumn field="especie" title="Especie" width="250px" />
        <GridColumn field="adoptado" title="Adoptado" width="250px" />
        {/* <GridColumn field="UnitPrice" title="Price" />
        <GridColumn field="UnitsInStock" title="In stock" />
        <GridColumn field="Discontinued" title="Discontinued" /> */}
      </Grid>
    </ExcelExport>
  );
};
