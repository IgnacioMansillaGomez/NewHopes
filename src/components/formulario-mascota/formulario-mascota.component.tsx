import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

import { useHistory } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { RazasAPI } from "../../api/razas.api";
import { Loading } from "../loading/loading.component";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { GoBack } from "../go-back/go-back.component";

export const FormularioMascota = (props: any) => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("chico");
  const [specie, setSpecie] = useState("perro");
  const [razaId, setRazaId] = useState();
  const [razas, setRazas] = useState([]);
  const [allRazas, setAllRazas] = useState([]);
  const [hair, setHair] = useState("corto");
  const [vaccinated, setVaccinated] = useState(false);
  const [edad, setEdad] = useState(0);
  const [sexo, setSexo] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
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

  // -----------------------------------INICIO FUNCION IMAGEN ---------------------

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
    setVaccinated(event.target.value);
  };

  const handleHairChange = (event: any) => {
    setHair(event.target.value);
  };

  const handleAgeChange = (event: any) => {
    setEdad(event.target.value);
  };

  const handleSexoChange = (event: any) => {
    setSexo(event.target.value);
  };

  const handleOnSave = () => {
    const pet = {
      nombre: name,
      fecha_publicacion: new Date().toDateString(),
      especie: specie,
      tamano: size,
      vacunas: vaccinated,
      id_raza: razaId,
      pelaje: hair,
      edad_anos: edad,
      sexo: sexo,
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
        <div className="container">
          <div className="row mt-3">
            <div className="col-md-12">
              <GoBack />
              <h1 className="text-center">Carga de nueva mascota</h1>
            </div>
          </div>
          <div className="col-md-8 offset-md-4 mt-4">
            <div className="form-group row ">
              <div className="col-6">
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Nombre Mascota"
                  variant="standard"
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="form-group row mt-4">
              <div className="col-3">
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

              {/* Sexo */}

              <div className="col-3">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Sexo</FormLabel>
                  <RadioGroup
                    row
                    aria-label="Sexo"
                    name="cboSexo"
                    onChange={handleSexoChange}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio size="small" />}
                      label="Macho"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio size="small" />}
                      label="Hembra"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            {/* Vacunas */}

            <div className="form-group row ">
              <div className="col-3">
                <FormControl variant="standard" sx={{ mt: 3, minWidth: 190 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Vacunas
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={vaccinated}
                    onChange={handleVaccinatedChange}
                    label="Vacunas"
                  >
                    <MenuItem value={0}>Sin vacunas</MenuItem>
                    <MenuItem value={1}>Con vacunas</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Raza */}

              <div className="col-3">
                <FormControl variant="standard" sx={{ mt: 3, minWidth: 190 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Raza
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleOnChangeRace}
                    label="Raza"
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

            {/* Pelaje */}

            <div className="form-group row">
              <div className="col-3">
                <FormControl variant="standard" sx={{ mt: 3, minWidth: 190 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Pelaje
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleHairChange}
                    label="Pelaje"
                  >
                    <MenuItem value="Corto">Corto</MenuItem>
                    <MenuItem value="Medio">Medio</MenuItem>
                    <MenuItem value="Largo">Largo</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Edad */}

              <div className="col-3">
                <FormControl variant="standard" sx={{ mt: 3, minWidth: 190 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Edad
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={edad}
                    onChange={handleAgeChange}
                    label="Edad"
                  >
                    <MenuItem value={0}>Menos de 1 año</MenuItem>
                    <MenuItem value={1}>1 año</MenuItem>
                    <MenuItem value={2}>2 años</MenuItem>
                    <MenuItem value={3}>3 años</MenuItem>
                    <MenuItem value={4}>4 años</MenuItem>
                    <MenuItem value={5}>5 años</MenuItem>
                    <MenuItem value={6}>6 años</MenuItem>
                    <MenuItem value={7}>7 años</MenuItem>
                    <MenuItem value={8}>8 años</MenuItem>
                    <MenuItem value={9}>9 años</MenuItem>
                    <MenuItem value={10}>10 o más años</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Tamaño */}

            <div className="form-group row mt-3">
              <div className="col-6">
                <FormControl component="fieldset" sx={{ mt: 3 }}>
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
              <div className="col-6"></div>

              {/* Boton */}

              <div className="form-group row mt-5">
                <div className="col-6">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleOnSave}
                    fullWidth
                  >
                    Crear Mascota
                  </Button>
                </div>
                <div className="row">
                  {showSuccessMessage && (
                    <>
                      <Collapse in={open}>
                        <Alert
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setOpen(false);
                              }}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }
                          sx={{ mb: 2 }}
                        >
                          ¡ Mascota agregada con éxito !
                        </Alert>
                      </Collapse>

                      <div>
                        <Button
                          variant="contained"
                          endIcon={<ArrowForwardIcon />}
                          onClick={handleGoList}
                        >
                          Ir hacia listado de Mascotas
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
