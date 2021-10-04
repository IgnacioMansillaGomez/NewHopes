import React, { PureComponent } from "react";
import { FormularioAgregarMascotas } from "../formulario@mascotas/formulario-mascotas.component";
import { GoBack } from "../go-back/go-back.component";

import { Header } from "../header/header.component";

export const NewPet = () => {
  return (
    <>
      <Header />
      <GoBack />
      <FormularioAgregarMascotas />
    </>
  );
};
