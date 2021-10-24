import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../contexts/session-manager.context";
import { useHistory, useParams } from "react-router-dom";
import { FormularioMascota } from "../formulario-mascota/formulario-mascota.component";
import { Header } from "../header/header.component";
import { MascotasAPI } from "../../api/mascotas.api";
import { GenericSerializer } from "../../api/generic.serializer";

export const Pet = () => {
  const { id }: any = useParams();
  const [pet, setPet] = useState<any>();
  const history = useHistory();
  const sessionContext = useContext(SessionContext);

  useEffect(() => {
    const sesion = sessionContext?.session;
    if (sesion?.uid === "") {
      history.push("/login");
    } else if (!sessionContext?.isAdmin()) {
      history.push("/not-allowed");
    }
  }, [sessionContext]);

  useEffect(() => {
    if (id) {
      MascotasAPI.getPet(id).then((respons) => {
        if (respons) {
          const pet = GenericSerializer.serialize(respons);
          setPet(pet);
        }
      });
    }
  }, [id]);

  return (
    <>
      <Header />
      <FormularioMascota pet={pet} />
    </>
  );
};
