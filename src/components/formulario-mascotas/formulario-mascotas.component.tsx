import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  radioClasses,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

import { useHistory } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { RazasAPI } from "../../api/razas.api";
import { Loading } from "../loading/loading.component";

export const FormularioAgregarMascotas = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("chico");
  const [specie, setSpecie] = useState("perro");
  const [razaId, setRazaId] = useState();
  const [razas, setRazas] = useState([]);
  const [allRazas, setAllRazas] = useState([]);
  const [vaccinated, setVaccinated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleGoList = () => {
    history.push("/pets-list");
  };

  useEffect(() => {
    setLoading(true);
    getRaces();
  }, []);

  useEffect(() => {
    filterRaces(specie);
  }, [allRazas]);

  const getRaces = () => {
    RazasAPI.getAllRaces().then((response: any) => {
      if (response.size !== 0) {
        const races = GenericSerializer.serializeAll(response);
        setAllRazas(races);
      } else {
        console.log("No hay registros");
      }
    });
  };

  const filterRaces = (raceFilter: string) => {
    const filteredRaces = allRazas.filter((element: any) => {
      return element.tipo === raceFilter;
    });
    setRazas(filteredRaces);
    setLoading(false);
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleSpecieChange = (event: any) => {
    setSpecie(event.target.value);
    filterRaces(event.target.value);
  };

  const handleOnChangeRace = (event: any) => {
    setRazaId(event.target.value);
  };

  const handleSizesChange = (event: any) => {
    setSize(event.target.value);
  };

  const handleVaccinatedChange = (event: any) => {
    setVaccinated(event.target.checked);
  };

  // const handleRace = (event: any) => {
  //   setRaza(event.target.checked);
  // };

  const handleOnSave = () => {
    const pet = {
      nombre: name,
      fecha_publicacion: new Date(),
      especie: specie,
      tamano: size,
      vacunas: vaccinated,
      id_raza: razaId,
    };
    MascotasAPI.createPet(pet).then((res) => {
      console.log(res);
      setShowSuccessMessage(true);
    });
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className="container ">
          <div className="row">
            <div className="col-12 mb-5">
              <h1 className="text-center">Carga de nueva mascota</h1>
            </div>
          </div>
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
                  defaultValue={specie}
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
                  onChange={handleOnChangeRace}
                  label="Años"
                >
                  {razas.map((item: any, idx) => {
                    return (
                      <MenuItem value={item.id} key={idx}>
                        {item.nombre_raza}
                      </MenuItem>
                    );
                  })}
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
      )}
    </>
  );
};
