import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { Loading } from "../loading/loading.component";
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
      <div className="album py-5">
        <Container>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {petsList.length > 0 && (
              <>
                {/* usamos el metodo 'map' para recorrer el array petsList y por cada pet retornamos el componente PetCard pasandole como props "pet" el cual tiene el valor de UNA pet , a cada elemento que dibuje en html el metodo 'map' hay que enviarle una KEY obligatoriamente para que react sepa detectar dicho elemento */}
                {petsList.map((pet: any, id) => {
                  return (
                    <Col key={id}>
                      <PetCard pet={pet} />
                    </Col>
                  );
                })}
              </>
            )}
            {petsList.length === 0 && !loading && (
              <div>No hay mascotas para mostrar</div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};
