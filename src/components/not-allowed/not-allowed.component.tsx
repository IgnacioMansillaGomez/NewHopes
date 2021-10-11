import React from "react";
import { Header } from "../header/header.component";

export const NotAllowed = () => {
  return (
    <>
      <Header />
      <div className="bg-danger p-5 text-center text-white">
        ¡Debe poseer permisos de administración!
      </div>
    </>
  );
};
