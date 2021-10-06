import React, { useState } from "react";

import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { MascotasAPI } from "../../api/mascotas.api";

export const FormularioAgregarMascotas = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("chico");
  const [specie, setSpecie] = useState("perro");
  const [vaccinated, setVaccinated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const history = useHistory();
  const handleGoList = () => {
    history.push("/pets-list");
  };
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleSpecieChange = (event: any) => {
    setSpecie(event.target.value);
  };

  const handleSizesChange = (event: any) => {
    setSize(event.target.value);
  };

  const handleVaccinatedChange = (event: any) => {
    setVaccinated(event.target.checked);
  };

  const handleOnSave = () => {
    const pet = {
      nombre: name,
      fecha_publicacion: new Date(),
      especie: specie,
      tamano: size,
      vacunas: vaccinated,
    };
    MascotasAPI.createPet(pet).then((res) => {
      console.log(res);
      setShowSuccessMessage(true);
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="text-center">Carga de nueva mascota</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="form-floating mb-1">
              <input
                type="text"
                className="form-control"
                id="txtNombreMascota"
                placeholder="Nombre mascota"
                value={name}
                onChange={handleNameChange}
              />
              <label htmlFor="txtNombreMascota">Nombre mascota</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mt-4">
            <div className="form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                checked={vaccinated}
                id="chkVacunado"
                onClick={handleVaccinatedChange}
              />
              <label className="form-check-label" htmlFor="chkVacunado">
                Vacunas
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="col-md-8 mt-4">
              <select
                className="form-select"
                aria-label="Especie"
                onChange={handleSpecieChange}
              >
                <option value="perro" selected>
                  Perro
                </option>
                <option value="gato">Gato</option>
              </select>
            </div>
            <div className="col-md-4 mt-4">
              <select
                className="form-select"
                aria-label="Tamano"
                onChange={handleSizesChange}
              >
                <option value="chico" selected>
                  Chico
                </option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={handleOnSave}
            >
              Crear Mascota
            </button>
          </div>
        </div>
        <div className="row">
          {showSuccessMessage && (
            <>
              <div>Mascotita creada</div>
              <div>
                <button onClick={handleGoList}>
                  --- Ir hacia listado de mascotas ---
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
