import React, { forwardRef, useContext, useEffect, useState } from "react";
import MaterialTable, { Icons } from "material-table";
import { SessionContext } from "../../contexts/session-manager.context";
import { useHistory } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";

export const AdminTableDos = () => {
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
  // const columns = {[
  //   { name: "N° Fila", selector: (i = 1) => i++ },
  //   { name: "Especie", selector: (row: any) => row.especie },
  //   {
  //     name: "Nombre Mascota",
  //     selector: (row: any) => row.nombre,
  //     sortable: true,
  //   },
  //   { name: "Edad", selector: (row: any) => row.edad_anos },
  //   { name: "Sexo", selector: (row: any) => row.sexo },
  //   { name: "Tamaño", selector: (row: any) => row.tamano },
  //   { name: "Vacunas", selector: (row: any) => row.vacunas },
  //   { name: "Adoptado", selector: (row: any) => row.adoptado },

  // ]};

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
  const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <>
      <MaterialTable
        title="Basic Search Preview"
        columns={columns}
        data={data}
        options={{
          search: true,
          exportButton: true,
        }}
        icons={tableIcons}
      />
    </>
  );
};
