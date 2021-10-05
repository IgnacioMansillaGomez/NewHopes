import React from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../header/header.component";

export const Home = () => {
  const history = useHistory();
  const handleNew = () => {
    history.push("/new-pet");
  };
  const handlePetsList = () => {
    history.push("/pets-list");
  };

  return (
    <>
      <Header />
      <button onClick={handleNew}>Nueva Mascota</button>
      <button onClick={handlePetsList}>Listado Mascotas</button>
    </>
  );
};
