import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useHistory } from "react-router-dom";
import { GenericSerializer } from "../../api/generic.serializer";
import { MascotasAPI } from "../../api/mascotas.api";
import { RazasAPI } from "../../api/razas.api";
import { Loading } from "../loading/loading.component";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { GoBack } from "../go-back/go-back.component";
import "./formulario-mascota.style.css";
import { ImagesAPI } from "../../api/images.api";

export const FormularioMascota = (props: any) => {
  const { pet } = props;
  const [petId, setPetId] = useState(pet ? pet.id : undefined);
  const [name, setName] = useState(pet ? pet.nombre : "");
  const [size, setSize] = useState(pet ? pet.tamano : "Chico");
  const [specie, setSpecie] = useState(pet ? pet.especie : "Perro");
  const [razaId, setRazaId] = useState(pet ? pet.id_raza : undefined);
  const [razas, setRazas] = useState([]);
  const [allRazas, setAllRazas] = useState([]);
  const [hair, setHair] = useState(pet ? pet.pelaje : "Corto");
  const [vaccinated, setVaccinated] = useState(
    pet && pet.vacunas === 1 ? true : false
  );
  const [edad, setEdad] = useState(pet ? pet.edad_anos : 0);
  const [sexo, setSexo] = useState(pet ? pet.sexo === "false" : false);
  const [colorPelaje, setColorPelaje] = useState(pet ? pet.color : "Blanco");
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [savingPet, setSavingPet] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    getRaces();
  }, []);

  useEffect(() => {
    filterRaces(specie);
  }, [allRazas]);

  const handleGoList = () => {
    history.push("/pets-list");
  };

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
      return element.tipo === raceFilter.toLowerCase();
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

  const handleColorPelaje = (event: any) => {
    setColorPelaje(event.target.value);
  };

  const handleFile = (event: any) => {
    setLoadingImage(true);
    const fileName = Date.now().toString();
    ImagesAPI.uploadImage(fileName, event.target.files[0]).then(
      (response: any) => {
        setLoadingImage(false);
        setImageUrl(response);
      }
    );
  };

  const validar = (e: any) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("Ingrese un nombre");

      return;
    } else {
      handleOnSave();
      setError("");
    }
  };

  const handleOnSave = () => {
    const pet = {
      nombre: name,
      fecha_publicacion: new Date().toLocaleDateString("es-AR"),
      especie: specie,
      tamano: size,
      vacunas: vaccinated,
      id_raza: razaId,
      pelaje: hair,
      edad_anos: edad,
      sexo: sexo,
      color: colorPelaje,
      img_url: imageUrl,
      adoptado: "false",
    };
    setSavingPet(true);
    if (petId) {
      MascotasAPI.updatePet(petId, pet).then((res) => {
        setSavingPet(false);
        setShowSuccessMessage(true);
      });
    } else {
      MascotasAPI.createPet(pet).then((res) => {
        setShowSuccessMessage(true);
      });
    }
  };

  return (
    <div className="full-view-informacion__main">
      {loading && <Loading />}
      {!loading && (
        <div className="container bg-white">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="text-center">
                {petId ? "Editar" : "Cargar"} mascota
              </h1>
            </div>
          </div>
          <div className="container bg-white">
            <div className="form-group row ">
              <div className="col-6 offset-3">
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Nombre Mascota"
                  variant="standard"
                  onChange={handleNameChange}
                  value={name}
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </div>
            </div>
            <div className="form-group row mt-4 ">
              <div className="col-3 offset-3 ">
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">Especie</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="cboSpecie"
                    onChange={handleSpecieChange}
                    defaultValue={specie}
                  >
                    <FormControlLabel
                      value="Perro"
                      control={<Radio size="small" />}
                      label="Perro"
                    />
                    <FormControlLabel
                      value="Gato"
                      control={<Radio size="small" />}
                      label="Gato"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              {/* Sexo */}

              <div className="col-3">
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">Sexo</FormLabel>
                  <RadioGroup
                    row
                    aria-label="Sexo"
                    name="cboSexo"
                    onChange={handleSexoChange}
                    defaultValue={sexo}
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
              <div className="col-3 offset-3">
                <FormControl
                  variant="standard"
                  sx={{ mt: 3, minWidth: 190 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Vacunas
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleVaccinatedChange}
                    label="Vacunas"
                    value={vaccinated ? 1 : 0}
                  >
                    <MenuItem value={0}>Sin vacunas</MenuItem>
                    <MenuItem value={1}>Con vacunas</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Raza */}

              <div className="col-3 ">
                <FormControl
                  variant="standard"
                  sx={{ mt: 3, minWidth: 190 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Raza
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleOnChangeRace}
                    label="Raza"
                    value={razaId}
                    defaultValue={razaId}
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
              <div className="col-3 offset-3">
                <FormControl
                  variant="standard"
                  sx={{ mt: 3, minWidth: 190 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Largo Pelaje
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleHairChange}
                    label="Pelaje"
                    value={hair}
                  >
                    <MenuItem value="Corto">Corto</MenuItem>
                    <MenuItem value="Medio">Medio</MenuItem>
                    <MenuItem value="Largo">Largo</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Edad */}

              <div className="col-3">
                <FormControl
                  variant="standard"
                  sx={{ mt: 3, minWidth: 190 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Edad
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleAgeChange}
                    label="Edad"
                    value={edad}
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

            {/* Carga Imagen */}

            <div className="form-group row mt-1">
              <div className="col-3 offset-3 ">
                <label htmlFor="contained-button-file" className="mt-5">
                  <input
                    accept="image/jpeg"
                    id="contained-button-file"
                    type="file"
                    style={{
                      display: "none",
                    }}
                    onChange={(event) => handleFile(event)}
                  />
                  <LoadingButton
                    startIcon={<PhotoCameraIcon />}
                    variant="contained"
                    component="span"
                    loading={loadingImage || savingPet}
                    loadingPosition="end"
                  >
                    Subir Imagen
                  </LoadingButton>
                </label>
              </div>
              {/* Tamaño */}
              <div className="col-lg-3">
                <FormControl
                  variant="standard"
                  sx={{ mt: 4, minWidth: 190 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Tamaño
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleSizesChange}
                    label="Tamaño"
                    value={size}
                    defaultValue={size}
                  >
                    <MenuItem value={"Chico"}>Chico</MenuItem>
                    <MenuItem value={"Mediano"}>Mediano</MenuItem>
                    <MenuItem value={"Grande"}>Grande</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Pelaje */}

            <div className="form-group row mt-4">
              <div className="col-6 offset-3">
                <FormControl
                  variant="standard"
                  sx={{ minWidth: 190 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Color Pelaje
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleColorPelaje}
                    label="Color Pelaje"
                    value={colorPelaje}
                  >
                    <MenuItem value="Blanco">Blanco</MenuItem>
                    <MenuItem value="Medio">Gris</MenuItem>
                    <MenuItem value="Marrón">Chocolate</MenuItem>
                    <MenuItem value="Negro">Negro</MenuItem>
                    <MenuItem value="Dorado">Dorado</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Boton */}

              <div className="form-group row mt-4 pb-5">
                <div className="col-6 offset-3">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={validar}
                    fullWidth
                    disabled={loadingImage || savingPet}
                  >
                    {petId ? "Guardar" : "Crear"} Mascota
                  </Button>
                </div>
                <div className="row mt-2">
                  <div className="col-6 offset-3">
                    {showSuccessMessage ? (
                      <>
                        <Collapse in={open}>
                          <Alert
                            severity="success"
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
                            <AlertTitle>
                              ¡Mascota {petId ? "Editada" : "Agregada"} con
                              éxito!
                            </AlertTitle>
                          </Alert>
                        </Collapse>

                        <div className="mt-1">
                          <Button
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            onClick={handleGoList}
                            fullWidth
                          >
                            Ir hacia listado de Mascotas
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="pet-form-error col-6 offset-3 text-center">
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
