import React, { useContext, useEffect } from "react";
import { SessionContext } from "../../contexts/session-manager.context";
import { useHistory } from "react-router-dom";
import { FormularioAgregarMascotas } from "../formulario-mascotas/formulario-mascotas.component";
import { GoBack } from "../go-back/go-back.component";

import { Header } from "../header/header.component";

export const NewPet = () => {
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

  return (
    <>
      <Header />
      <GoBack />
      <FormularioAgregarMascotas />
    </>
  );
};
