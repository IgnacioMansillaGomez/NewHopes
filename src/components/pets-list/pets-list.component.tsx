import React, { useEffect, useState } from "react";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { Loading } from "../../loading/loading.component";
import { GoBack } from "../go-back/go-back.component";
import { Header } from "../header/header.component";
import { PetCard } from "../pet-card/pet-card.component";

export const PetsList = () => {
  const [petsList, setPetsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPets();
  }, []);

  const getPets = () => {
    setLoading(true);
    MascotasAPI.getAllPets().then((response: any) => {
      if (response.size !== 0) {
        const pets = GenericSerializer.serializeAll(response);
        setPetsList(pets);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("No hay registros");
      }
    });
  };

  return (
    <>
      <Header />
      {loading && <Loading />}

      {petsList.length > 0 && (
        <ul>
          {petsList.map((pet: any, id) => {
            return (
              <li key={id}>
                <PetCard pet={pet} />
              </li>
            );
          })}
        </ul>
      )}
      <GoBack />
    </>
  );
};
