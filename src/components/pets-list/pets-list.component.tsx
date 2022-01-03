import React, { useEffect, useRef, useState } from "react";

import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { Loading } from "../loading/loading.component";

import { Header } from "../header/header.component";
import { PetCard } from "../pet-card/pet-card.component";

import { CarouselPet } from "../carousel/carousel.component";
import { Footer } from "../../footer/footer.component";

import SearchIcon from "@mui/icons-material/Search";

import "./pet-list.style.css";
import { FormControl, Input, InputAdornment } from "@mui/material";

export const PetsList = () => {
  const [petsList, setPetsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (search.length > 0) {
      handleSearch(search);
    } else {
      getPets();
    }

    // getPetsByName(search);
  }, [search]);

  const getPets = () => {
    setLoading(true);
    MascotasAPI.getAllNotAdoptedPets().then((response: any) => {
      if (response.size > 0) {
        const pet = GenericSerializer.serializeAll(response);
        setPetsList(pet);
      } else {
        setPetsList([]);
      }
      setLoading(false);
    });
  };

  const handleSearch = (search: any) => {
    //setLoading(true);
    MascotasAPI.getPetsFilterByName(search).then((response: any) => {
      if (response.size > 0) {
        const petsFilterByName = GenericSerializer.serializeAll(response);

        setPetsList(petsFilterByName);
      } else {
        setPetsList([]);
      }
      // setLoading(false);
    });
    // setSearchResults();
  };

  const getSearch = (event: any) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container-fluid p-0 home">
      <Header />
      {loading && <Loading />}
      <div className="container">
        <div className="row ">
          {petsList.length > 3 && (
            <CarouselPet
              pets={petsList
                .sort(() => {
                  return Math.random() - 0.5;
                })
                .slice(0, 3)}
            />
          )}
        </div>
      </div>

      <div className="container bg-light">
        {/* <input type="text" onSubmit={handleSearch}>
          Buscar
        </input> */}
        <div className="row pet-list__main">
          <FormControl fullWidth sx={{ p: 5 }} variant="standard">
            <Input
              type="text"
              id="standard-adornment-amount"
              value={search}
              onChange={getSearch}
              placeholder="Buscar por nombre"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>

          {petsList.length > 0 && (
            <div className="row">
              {/* usamos el metodo 'map' para recorrer el array petsList y por cada pet retornamos el componente PetCard pasandole como props "pet" el cual tiene el valor de UNA pet , a cada elemento que dibuje en html el metodo 'map' hay que enviarle una KEY obligatoriamente para que react sepa detectar dicho elemento */}
              {petsList.map((pet: any, index) => {
                return (
                  <div className="col tamano" key={pet.id}>
                    <PetCard sx={{ flex: 1 }} pet={pet} />
                  </div>
                );
              })}
            </div>
          )}
          {/* <div className="row justify-content-center">
            <div className="col-7">
              <Button onClick={nextPet} fullWidth>
                Ver mas
              </Button>
            </div>
          </div> */}

          {petsList.length === 0 && !loading && (
            <div className="container">
              <div className="row bg-success">
                <div className="col-12">
                  <h2 className="text-center display-3 fw-bolder">
                    ¡No hay mascotas para mostrar!
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
