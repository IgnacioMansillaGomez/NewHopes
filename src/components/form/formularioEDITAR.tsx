import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Raza, useRaza } from "../../hooks/use-raza.hook";
import { GoBack } from "../go-back/go-back.component";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ModalAdopcion } from "../modal-adopcion/modal-adopcion.component";

export const FormularioEditarDos = (props: any) => {
  const [pet, setPet] = useState(props.pet);
  const raza = useRaza(pet.id_raza);
  const [showModal, setShowModal] = useState(false);
  const [razaValue, setRazaValue] = useState(raza?.nombre_raza);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChangeRaza = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {};

  console.log(razaValue);
  console.log(raza?.nombre_raza);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 mb-5 offset-2">
          <h1 className="text-center">¡Conoce a {pet.nombre}!</h1>
        </div>
      </div>
      <div className="col-lg-9 offset-md-3">
        <div className="form-group row ">
          <div className="col-lg-12">
            <TextField
              fullWidth
              id="standard-basic"
              label="Nombre Mascota"
              variant="standard"
              defaultValue={pet.nombre}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        {/* Vacunas */}
        <div className="form-group row ">
          <div className="col-6">
            <FormControl variant="standard" sx={{ mt: 3, minWidth: 190 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Vacunas
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                defaultValue={pet.vacunas}
                label="Vacunas"
                readOnly={true}
              >
                <MenuItem value={0}>Sin vacunas</MenuItem>
                <MenuItem value={1}>Con vacunas</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* Sexo */}
          <div className="col-6">
            <FormControl component="fieldset" sx={{ mt: 2, minWidth: 190 }}>
              <FormLabel component="legend">Sexo</FormLabel>
              <RadioGroup
                row
                aria-label="Sexo"
                name="cboSexo"
                defaultValue={pet.sexo}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio size="small" disabled />}
                  label="Macho"
                />
                <FormControlLabel
                  value={true}
                  control={<Radio size="small" disabled />}
                  label="Hembra"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-6">
            <FormControl variant="standard" sx={{ mt: 3, minWidth: 190 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Pelaje
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                defaultValue={pet.pelaje}
                label="Pelaje"
                readOnly={true}
              >
                <MenuItem value="Corto">Corto</MenuItem>
                <MenuItem value="Medio">Medio</MenuItem>
                <MenuItem value="Largo">Largo</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Edad */}

          <div className="col-6">
            <FormControl variant="standard" sx={{ mt: 3, minWidth: 190 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Edad
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                defaultValue={pet.edad_anos}
                label="Edad"
                readOnly={true}
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

        {/* TAMAÑO */}

        <div className="form-group row mt-3">
          <div className="col-6">
            <FormControl component="fieldset" sx={{ mt: 3 }}>
              <FormLabel component="legend">Tamaño</FormLabel>
              <RadioGroup
                aria-label="Tamaño"
                name="cboTamano"
                defaultValue={pet.tamano}
              >
                <FormControlLabel
                  value="chico"
                  control={<Radio size="small" disabled />}
                  label="Chico"
                />
                <FormControlLabel
                  value="mediano"
                  control={<Radio size="small" disabled />}
                  label="Mediano"
                />
                <FormControlLabel
                  value="grande"
                  control={<Radio size="small" disabled />}
                  label="Grande"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="col-6">
            <FormControl variant="standard" sx={{ mt: 3, minWidth: 190 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Color Pelo
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                defaultValue={pet.color_pelaje}
                label="Pelaje"
                readOnly={true}
              >
                <MenuItem value="Corto">Corto</MenuItem>
                <MenuItem value="Medio">Medio</MenuItem>
                <MenuItem value="Largo">Largo</MenuItem>
              </Select>
            </FormControl>
            <div className="row">
              <div className="col-6">
                <FormControl variant="standard" sx={{ mt: 3, minWidth: 190 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Raza
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    defaultValue={0}
                    // defaultValue={raza?.nombre_raza}
                    label="Raza"
                    readOnly={true}
                    // onChange={handleChangeRaza}
                    // value={""}
                  >
                    <MenuItem value={0}>{raza?.nombre_raza}</MenuItem>
                    {/* <MenuItem value={raza?.nombre_raza}>
                      {raza?.nombre_raza}
                    </MenuItem> */}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        {/* Boton */}
        <div className="form-group row mt-5 offset-1">
          <div className="col-lg-10">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleShow}
            >
              ¡Quiero Adoptar!
            </Button>
          </div>
          <ModalAdopcion show={showModal} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};
