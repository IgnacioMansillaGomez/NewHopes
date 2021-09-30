import React, { useState } from "react";

export const PetCard = (props: any) => {
  const [pet, setPet] = useState(props.pet);

  return (
    <div>
      <div>nombre: {pet.nombre}</div>
      <div>especie: {pet.especie}</div>
      <div>tamaño: {pet.tamano}</div>
      <div>vaccinate: {pet.vacunas ? "Si" : "No"} esta vacunado.</div>
    </div>
  );
};
