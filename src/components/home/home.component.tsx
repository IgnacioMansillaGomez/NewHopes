import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { Router } from "react-router";
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
      <button onClick={handleNew}>Nueva Adopción</button>
      <button onClick={handlePetsList}>Listado Adopciones</button>
    </>
  );
};
