import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

import { useHistory } from "react-router-dom";
import { idText } from "typescript";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";

export const FormularioAgregarMascotas = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("chico");
  const [specie, setSpecie] = useState("perro");
  const [raza, setRaza] = useState([undefined, ""]);
  const [vaccinated, setVaccinated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const history = useHistory();
  const handleGoList = () => {
    history.push("/pets-list");
  };

  useEffect(() => {
    getRaces();
  }, []);

  const getRaces = () => {
    MascotasAPI.getAllRaces().then((response: any) => {
      if (response.size !== 0) {
        const race = GenericSerializer.serializeAll(response);
        setRaza([race.id, race.nombre_raza]);
      } else {
        console.log("No hay registros");
      }
    });
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

  const handleRace = (event: any) => {
    setRaza(event.target.checked);
  };

  const handleOnSave = () => {
    const pet = {
      nombre: name,
      fecha_publicacion: new Date(),
      especie: specie,
      tamano: size,
      vacunas: vaccinated,
      id_raza: raza,
    };
    MascotasAPI.createPet(pet).then((res) => {
      console.log(res);
      setShowSuccessMessage(true);
    });
  };

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="text-center">Carga de nueva mascota</h1>
          </div>
        </div>
        {/* <form> */}
        <div className="form-group row">
          <div className="col-10">
            <TextField
              id="standard-basic"
              label="Nombre Mascota"
              variant="standard"
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="form-group row mt-4">
          <div className="col-10">
            <FormControl component="fieldset">
              <FormLabel component="legend">Especie</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="cboSpecie"
                onChange={handleSpecieChange}
              >
                <FormControlLabel
                  value="perro"
                  control={<Radio size="small" />}
                  label="Perro"
                />
                <FormControlLabel
                  value="gato"
                  control={<Radio size="small" />}
                  label="Gato"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div className="form-group row mt-3">
          <div className="col-10">
            <FormControl component="fieldset">
              <FormLabel component="legend">Tamaño</FormLabel>
              <RadioGroup
                row
                aria-label="Tamaño"
                name="cboTamano"
                onChange={handleSizesChange}
              >
                <FormControlLabel
                  value="chico"
                  control={<Radio size="small" />}
                  label="Chico"
                />
                <FormControlLabel
                  value="mediano"
                  control={<Radio size="small" />}
                  label="Mediano"
                />
                <FormControlLabel
                  value="grande"
                  control={<Radio size="small" />}
                  label="Grande"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-10">
            <FormControl variant="standard" sx={{ mt: 1, minWidth: 190 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Raza
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value
                // onChange
                label="Años"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-10">
            <FormControl variant="standard" sx={{ mt: 3, minWidth: 190 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Pelaje
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value
                // onChange
                label="Pelaje"
              >
                <MenuItem value="">
                  <em>Mestizo</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-4">Radio Buttons</label>
          <div className="col-8">
            <div className="custom-control custom-radio custom-control-inline">
              <input
                name="radio"
                id="radio_0"
                type="radio"
                className="custom-control-input"
                value="rabbit"
              />
              <label htmlFor="radio_0" className="custom-control-label">
                Rabbit
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                name="radio"
                id="radio_1"
                type="radio"
                className="custom-control-input"
                value="duck"
              />
              <label htmlFor="radio_1" className="custom-control-label">
                Duck
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                name="radio"
                id="radio_2"
                type="radio"
                className="custom-control-input"
                value="fish"
              />
              <label htmlFor="radio_2" className="custom-control-label">
                Fish
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-4">Adoptado</label>
          <div className="col-8">
            <div className="custom-control custom-checkbox custom-control-inline">
              <input
                name="chkAdoptado"
                id="chkAdoptado_0"
                type="checkbox"
                required
                className="custom-control-input"
                value=""
              />
              <label htmlFor="chkAdoptado_0" className="custom-control-label">
                Si
              </label>
            </div>
            <div className="custom-control custom-checkbox custom-control-inline">
              <input
                name="chkAdoptado"
                id="chkAdoptado_1"
                type="checkbox"
                required
                className="custom-control-input"
                value=""
              />
              <label htmlFor="chkAdoptado_1" className="custom-control-label">
                No
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="cboRaza" className="col-4 col-form-label">
            Raza
          </label>
          <div className="col-8">
            <select
              id="cboRaza"
              name="cboRaza"
              required
              className="custom-select"
            >
              <option value="">Mestizo</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="cboPelo" className="col-4 col-form-label">
            Pelo
          </label>
          <div className="col-8">
            <select
              id="cboPelo"
              name="cboPelo"
              className="custom-select"
              required
            >
              <option value="">Corto</option>
              <option value="">Medio</option>
              <option value="">Largo</option>
              <option value="">Muy Largo</option>
            </select>
          </div>
        </div>
        {/* </form> */}
        <div className="form-group row">
          <div className="offset-4 col-8">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={handleOnSave}
            >
              Crear Mascota
            </button>
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
      </div>
    </>
  );
};
