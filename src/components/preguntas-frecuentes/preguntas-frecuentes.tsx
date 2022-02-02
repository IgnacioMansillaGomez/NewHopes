import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Footer } from "../../footer/footer.component";
import { Header } from "../header/header.component";
import { Loading } from "../loading/loading.component";

import "../pets-list/pet-list.style.css";

export const PreguntasFrecuentes = () => {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showDos, setShowDos] = useState(false);
  const [showTres, setShowTres] = useState(false);
  const [showCuatro, setShowCuatro] = useState(false);
  const [showCinco, setShowCinco] = useState(false);
  const [showSeis, setShowSeis] = useState(false);
  const [showSiete, setShowSiete] = useState(false);
  const [showOcho, setShowOcho] = useState(false);
  return (
    <div className="container-fluid p-0 home">
      <Header />
      {/* {loading && <Loading />} */}
      <div className="container pet-list__main">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center py-5 display-4 title">
              Preguntas Frecuentes
            </h2>
          </div>
        </div>
        <div className="row ">
          <div className="col-6">
            <ListGroup variant="flush" className="pb-3">
              <ListGroup.Item
                variant="danger"
                className="x"
                onClick={() => setShow(!show)}
              >
                ¿Es posible concretar una visitar al hogar?
              </ListGroup.Item>
              {show && (
                <div className="backed">
                  <p className="p-1 texto">
                    Actualmente no estamos permitiendo visitas directas al hogar
                    por covid-19 , si esperamos poder volver abrir en un futuro
                    a todos aquellos interesados en visitarnos la oportunidad de
                    conocer a las mascotas.
                  </p>
                </div>
              )}
              <ListGroup.Item
                variant="danger"
                className="x"
                onClick={() => setShowDos(!showDos)}
              >
                Ya complete mi formulario de adopción, ¿ Ahora que hago?
              </ListGroup.Item>
              {showDos && (
                <div className="backed">
                  <p className="p-1 texto">
                    Nos alegra que te hayas decidido por la adopción de una
                    mascota espero que sepas las responsabilidades que lo mismo
                    conlleva para una adopción mas segura nos demoramos unos
                    días para analizar tu formulario en busca de compatibilidad.
                  </p>
                </div>
              )}
              <ListGroup.Item
                variant="danger"
                className="x"
                onClick={() => setShowTres(!showTres)}
              >
                Me gustaría ayudar, ¿Cómo puedo hacerlo?
              </ListGroup.Item>
              {showTres && (
                <div className="backed">
                  <p className="p-1 texto">
                    La mejor forma es ponerse en contacto a través de nuestro
                    e-mail oficial , toda ayuda es bienvenida!.
                  </p>
                </div>
              )}
              <ListGroup.Item
                variant="danger"
                className="x"
                onClick={() => setShowCuatro(!showCuatro)}
              >
                Ya no quiero adoptar pero complete mi formulario, ¿Que puedo
                hacer?
              </ListGroup.Item>
              {showCuatro && (
                <div className="backed">
                  <p className="p-1 texto">Debes cancelar tu petición.</p>
                </div>
              )}
              <ListGroup.Item
                variant="danger"
                className="x"
                onClick={() => setShowCinco(!showCinco)}
              >
                Cancele mi solicitud, ¿Puedo volver a enviar el formulario?
              </ListGroup.Item>
              {showCinco && (
                <div className="backed">
                  <p className="p-1 texto">
                    Si, siempre puedes volver a enviar un formulario de
                    adopción.
                  </p>
                </div>
              )}
              <ListGroup.Item
                variant="danger"
                className="x"
                onClick={() => setShowSeis(!showSeis)}
              >
                Aún no me han contactado ¿Cómo puedo comunicarme?
              </ListGroup.Item>
              {showSeis && (
                <div className="backed">
                  <p className="p-1 texto">
                    Actualmente tenemos una demora aproximada de 1 a 7 días
                    hábiles para poder brindar una respuesta, dado el caso de
                    que ya haya concurrido el tiempo máximo de espera
                    recomendamos comunicarse a través de nuestra línea
                    telefónica.
                  </p>
                </div>
              )}
              <ListGroup.Item
                variant="danger"
                className="x"
                onClick={() => setShowSiete(!showSiete)}
              >
                Las Mascotas que son visibles ¿Estan todas disponibles para su
                adopción?
              </ListGroup.Item>
              {showSiete && (
                <div className="backed">
                  <p className="p-1 texto">
                    Todas las mascotas que estan en nuestro sitio web estan en
                    adopción, retiramos publicaciones de mascotas que han sido
                    felizmente adoptadas
                  </p>
                </div>
              )}
              <ListGroup.Item
                variant="danger"
                className="x"
                onClick={() => setShowOcho(!showOcho)}
              >
                Me gustaría recibir guía sobre el carácter de una mascota ¿Cómo
                puedo hacerlo?
              </ListGroup.Item>
              {showOcho && (
                <div className="backed">
                  <p className="p-1 texto">
                    Siempre se puede recurrir a nuestros medios de contacto para
                    consultas de este tipo siendo el e-mail la vía mas rápida
                    actualmente , siempre dejando en claro la razón del mismo en
                    el "Asunto".
                  </p>
                </div>
              )}
            </ListGroup>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
