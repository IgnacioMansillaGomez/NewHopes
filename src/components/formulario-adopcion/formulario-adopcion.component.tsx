import React, { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import {
  Alert,
  Box,
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
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import "./formulario-adopcion.style.css";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PetsIcon from "@mui/icons-material/Pets";
import WorkIcon from "@mui/icons-material/Work";
import FaceIcon from "@mui/icons-material/Face";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { Form } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { SolicitudesAPI } from "../../api/solicitudes.api";

export const FormularioAdopcion = (props: any) => {
  const { id }: any = useParams();
  const [nombreAdoptante, setNombreAdoptante] = useState("");
  const [apellidoAdoptante, setApellidoAdoptante] = useState("");
  const [sexo, setSexo] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [calle, setCalle] = useState("");
  const [mascotas, setMascotas] = useState("");
  const [cantidadMascotas, setCantidadMascotas] = useState(0);
  const [ocupacion, setOcupacion] = useState("");
  const [vivienda, setVivienda] = useState("Casa");
  const [ninos, setNinos] = useState("");
  const [cantidadNinos, setCantidadNinos] = useState(0);
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [open, setOpen] = useState(true);

  const handleNombreChange = (e: any) => {
    setNombreAdoptante(e.target.value);
  };
  const handleApellidoChange = (e: any) => {
    setApellidoAdoptante(e.target.value);
  };

  const handleChangeSexo = (e: any) => {
    setSexo(e.target.value);
  };

  const handleCellPhoneChange = (e: any) => {
    setCellPhone(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleCiudadChange = (e: any) => {
    setCiudad(e.target.value);
  };

  const handleCalleChange = (e: any) => {
    setCalle(e.target.value);
  };

  const handleMascotasChange = (e: any) => {
    setMascotas(e.target.value);
  };

  const handleCantidadMascotasChange = (e: any) => {
    setCantidadMascotas(e.target.value);
  };

  const handleViviendaChange = (e: any) => {
    setVivienda(e.target.value);
  };

  const handleOcupacionChange = (e: any) => {
    setOcupacion(e.target.value);
  };

  const handleNinosChange = (e: any) => {
    setNinos(e.target.value);
  };

  const handleCantidadNinosChange = (e: any) => {
    setCantidadNinos(e.target.value);
  };

  const validar = (e: any) => {
    e.preventDefault();
    const emailPattern =
      /^[a-zA-Z0-9._]+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;

    if (nombreAdoptante.trim() === "") {
      setError("Ingrese nombre");
      return;
    }
    if (apellidoAdoptante.trim() === "") {
      setError("Ingrese apellido");
      return;
    }
    if (sexo === "") {
      setError("Debe seleccionar un sexo");
      return;
    }
    if (cellPhone.trim() === "") {
      setError("Debe ingresar su telefono celular");
      return;
    }
    if (ciudad.trim() === "") {
      setError("Debe ingresar una ciudad");
      return;
    }
    if (calle.trim() === "") {
      setError("Debe ingresar una calle");
      return;
    }
    if (mascotas.trim() === "") {
      setError("Debe indicar si posee mascota/as");
      return;
    }
    if (ninos.trim() === "") {
      setError("Debe si hay niños/as en su hogar");
      return;
    }
    if (!emailPattern.test(email)) {
      setError("Ingrese un e-mail valido");
      return;
    } else {
      handleOnSend();
      setError("");
    }
  };

  const handleOnSend = () => {
    const peticion = {
      nombre_adoptante: nombreAdoptante,
      fecha_emision: new Date().toDateString(),
      apellido_adoptante: apellidoAdoptante,
      sexo_adoptante: sexo,
      telefono_celular: cellPhone,
      email_adoptante: email,
      ciudad_adoptante: ciudad,
      calle_adoptante: calle,
      mascotas_adoptante: mascotas,
      cantidad_mascotas_adoptante: cantidadMascotas,
      ocupacion_adoptante: ocupacion,
      vivienda_adoptante: vivienda,
      ninos_adoptante: ninos,
      cantidad_ninos_adoptante: cantidadNinos,
      id_mascota_peticion: id,
      estado: "Pendiente",
    };
    SolicitudesAPI.createAdoption(peticion).then((res) => {
      setShowSuccessMessage(true);
    });
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>¡Completa el formulario con tus datos!</h2>
          </div>
        </div>

        {/* NOMBRE Y APELLIDO */}

        <div className="row mt-5">
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                required
                label="Nombre"
                value={nombreAdoptante}
                variant="standard"
                onChange={handleNombreChange}
              />
            </Box>
          </div>
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                required
                label="Apellido"
                value={apellidoAdoptante}
                variant="standard"
                onChange={handleApellidoChange}
              />
            </Box>
          </div>
        </div>

        {/* Sexo */}

        <div className="row mt-4">
          <div className="col-10">
            <FormControl component="fieldset">
              <FormLabel component="legend">Genero *</FormLabel>
              <RadioGroup
                row
                aria-label="Genero"
                name="row-radio-buttons-group"
                onChange={handleChangeSexo}
                id="genero"
              >
                <FormControlLabel
                  value="Femenino"
                  control={<Radio size="small" />}
                  label="Femenino"
                />
                <FormControlLabel
                  value="Masculino"
                  control={<Radio size="small" />}
                  label="Masculino"
                />
                <FormControlLabel
                  value="Otro"
                  control={<Radio size="small" />}
                  label="Otro"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        {/* TELEFONO */}

        <div className="row mt-3">
          <div className="col-12">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <PhoneAndroidIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                required
                id="input-with-sx"
                label="Telefono Celular"
                variant="standard"
                value={cellPhone}
                onChange={handleCellPhoneChange}
                type="number"
                fullWidth
              />
            </Box>
          </div>
        </div>

        <div className="row mt-5">
          {/* E-MAIL */}
          <div className="col-12">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <MailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                required
                id="input-with-sx"
                label="E-mail"
                variant="standard"
                value={email}
                onChange={handleEmailChange}
                type="email"
                fullWidth
              />
            </Box>
          </div>
        </div>

        {/* Ciudad y direccion */}

        <div className="row mt-5">
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <HomeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                required
                id="input-with-sx"
                label="Ciudad"
                variant="standard"
                value={ciudad}
                onChange={handleCiudadChange}
              />
            </Box>
          </div>
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <ApartmentIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                required
                id="standard-required"
                label="Calle"
                variant="standard"
                value={calle}
                onChange={handleCalleChange}
              />
            </Box>
          </div>
        </div>

        {/* Animales */}

        <div className="row mt-5">
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <PetsIcon sx={{ color: "action.active", mr: 1, my: 0.7 }} />
                  ¿Tiene mascota/as *?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="Genero"
                  name="row-radio-buttons-group"
                  onChange={handleMascotasChange}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <FormControlLabel
                    value="Si"
                    control={<Radio size="small" />}
                    label="Si"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio size="small" />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </div>
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <FaceIcon sx={{ color: "action.active", mr: 1, my: 0.7 }} />
                  ¿Niños en su hogar *?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="Genero"
                  name="row-radio-buttons-group"
                  onChange={handleNinosChange}
                  value={ninos}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <FormControlLabel
                    value="Si"
                    control={<Radio size="small" />}
                    label="Si"
                  />
                  <FormControlLabel
                    value="No"
                    control={<Radio size="small" />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </div>
          {/* <div className="row mt-5">
            <div className="col-12">
              <FormControl
                variant="standard"
                sx={{ m: 1, mt: 0, minWidth: 120 }}
                fullWidth
              >
                <FormLabel component="legend">¿Cuantas *?</FormLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={cantidadMascotas}
                  onChange={handleCantidadMascotasChange}
                  defaultValue={cantidadMascotas}
                  label=""
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>Más de 4</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div> */}
        </div>

        {/* Ocupacion */}

        <div className="row mt-3">
          <div className="col-12">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <WorkIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                required
                id="input-with-sx"
                label="Ocupación"
                variant="standard"
                value={ocupacion}
                onChange={handleOcupacionChange}
                type="text"
                fullWidth
              />
            </Box>
          </div>
        </div>

        {/* tipo vivienda */}

        <div className="row mt-5">
          <div className="col-12">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <HomeWorkIcon sx={{ color: "action.active", mr: 1, my: 1 }} />
              <FormControl
                variant="standard"
                sx={{ m: 1, mt: 0, minWidth: 120 }}
                fullWidth
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Tipo Vivienda
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={vivienda}
                  onChange={handleViviendaChange}
                  label="Tipo vivienda"
                >
                  <MenuItem value="Casa">Casa</MenuItem>
                  <MenuItem value="Departamento">Departamento</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>

        {/* Niños y cantidad niños */}

        {/* <div className="row mt-5">
          <div className="col-6">
            <FormControl variant="standard" sx={{ m: 1, mt: 0, minWidth: 120 }}>
              <FormLabel component="legend">¿Cuantos/as *?</FormLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cantidadNinos}
                onChange={handleCantidadNinosChange}
                defaultValue={cantidadNinos}
                label=""
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>Más de 4</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div> */}

        {/* Comentarios */}
        <div className="row mt-5">
          <div className="col-12">
            <Form.Group className="mb-3">
              <Form.Label>Cuentanos sobre ti</Form.Label>
              <Form.Control as="textarea" rows={6} maxLength={255} />
            </Form.Group>
          </div>
        </div>

        {/* Boton Enviar */}
      </div>
      <div className="row mt-5">
        <div className="col-6">
          <Button
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            onClick={validar}
          >
            Enviar Formulario
          </Button>
        </div>
        <div className="col-3">
          <Button
            variant="contained"
            color="error"
            onClick={props.handleClosed}
          >
            Cancelar
          </Button>
        </div>
        <div className="row">
          <div className="col-12">
            {showSuccessMessage ? (
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
                    ¡Formulario enviado exitosamente!
                  </Alert>
                </Collapse>
              </>
            ) : (
              <div className="adopcion-form">
                <span className="adopcion-form-error">{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
