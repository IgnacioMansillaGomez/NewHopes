import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
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
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import React, { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PetsIcon from "@mui/icons-material/Pets";
import WorkIcon from "@mui/icons-material/Work";
import FaceIcon from "@mui/icons-material/Face";
import { Form } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { AdopcionesAPI } from "../../api/adopciones.api";

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
  const [cantidadMascotas, setCantidadMascotas] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [vivienda, setVivienda] = useState("");
  const [ninos, setNinos] = useState("");
  const [cantidadNinos, setCantidadNinos] = useState("");

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
    };
    AdopcionesAPI.createAdoption(peticion).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>¡ Completa el formulario con tus datos !</h2>
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

        {/* Sexo e Estado civil */}

        <div className="row mt-4">
          <div className="col-10">
            <FormControl component="fieldset">
              <FormLabel component="legend">Genero *</FormLabel>
              <RadioGroup
                row
                aria-label="Genero"
                name="row-radio-buttons-group"
                onChange={handleChangeSexo}
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

        {/* TELEFONO Y E-MAIL */}

        <div className="row mt-3">
          <div className="col-6">
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
              />
            </Box>
          </div>

          <div className="col-6">
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
                <FormLabel component="legend">¿Tiene mascota/as *?</FormLabel>
                <RadioGroup
                  row
                  aria-label="Genero"
                  name="row-radio-buttons-group"
                  onChange={handleMascotasChange}
                >
                  <PetsIcon sx={{ color: "action.active", mr: 1, my: 0.7 }} />
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
            <FormControl variant="standard" sx={{ m: 1, mt: 0, minWidth: 120 }}>
              <FormLabel component="legend">¿Cuantas *?</FormLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cantidadMascotas}
                onChange={handleCantidadMascotasChange}
                label=""
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>Más de 4</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Ocupacion y tipo vivienda */}

        <div className="row mt-3">
          <div className="col-6">
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
              />
            </Box>
          </div>

          {/* tipo vivienda */}

          <div className="col-6">
            <FormControl variant="standard" sx={{ m: 1, mt: 0, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Tipo Vivienda
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={vivienda}
                onChange={handleViviendaChange}
                fullWidth={true}
                label="Tipo vivienda"
              >
                <MenuItem value="Casa">Casa</MenuItem>
                <MenuItem value="Departamento">Departamento</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Niños y cantidad niños */}

        <div className="row mt-5">
          <div className="col-6">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  ¿Hay niños en su hogar *?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="Genero"
                  name="row-radio-buttons-group"
                  onChange={handleNinosChange}
                  value={ninos}
                >
                  <FaceIcon sx={{ color: "action.active", mr: 1, my: 0.7 }} />
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
            <FormControl variant="standard" sx={{ m: 1, mt: 0, minWidth: 120 }}>
              <FormLabel component="legend">¿Cuantos/as *?</FormLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cantidadNinos}
                onChange={handleCantidadNinosChange}
                label=""
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>Más de 4</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

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
        <div className="col-9">
          <Button
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            onClick={handleOnSend}
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
      </div>
    </>
  );
};
