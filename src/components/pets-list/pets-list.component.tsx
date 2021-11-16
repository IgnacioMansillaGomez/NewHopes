import React, { useEffect, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { Loading } from "../loading/loading.component";
import { GoBack } from "../go-back/go-back.component";
import { Header } from "../header/header.component";
import { PetCard } from "../pet-card/pet-card.component";
import { DEFAULT_PET_IMAGE } from "../../constants/constants";
import { CarouselPet } from "../carousel/carousel.component";
import { Footer } from "../../footer/footer.component";

import "./pet-list.style.css";
import { Button } from "@mui/material";
export const PetsList = () => {
  const [petsList, setPetsList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [lastPet, setLastPet] = useState<any>();

  useEffect(() => {
    getPets();
  }, []);

  const getPets = () => {
    setLoading(true);
    MascotasAPI.getAllNotAdoptedPets().then((response: any) => {
      if (response.size !== 0) {
        const ps = GenericSerializer.serializeAll(response);
        setPetsList(ps);
        setLoading(false);
      }
    });
  };

  // const nextPet = () => {
  //   MascotasAPI.getLastPagination(lastPet).then((item) => {
  //     const ps = item.docs.map((i) => i.data());
  //     const last = item.docs[item.docs.length - 1];
  //     setPetsList((petsList) => [...petsList, ...ps]);
  //     setLastPet(last);
  //   });
  // };

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
        <div className="row pet-list__main">
          {/* <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-1"> */}

          {petsList.length > 0 && (
            <>
              {/* usamos el metodo 'map' para recorrer el array petsList y por cada pet retornamos el componente PetCard pasandole como props "pet" el cual tiene el valor de UNA pet , a cada elemento que dibuje en html el metodo 'map' hay que enviarle una KEY obligatoriamente para que react sepa detectar dicho elemento */}
              {petsList.map((pet: any, id) => {
                return (
                  <div className="col-lg-3 col-md-3 col-6" key={id}>
                    <PetCard sx={{ flex: 1 }} pet={pet} />
                  </div>
                );
              })}
            </>
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
