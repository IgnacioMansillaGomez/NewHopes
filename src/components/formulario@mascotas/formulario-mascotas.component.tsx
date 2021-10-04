import * as React from "react";
import Box from "@mui/material/Box";

import FormControl from "@mui/material/FormControl";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import NativeSelect from "@mui/material/NativeSelect/NativeSelect";

export const FormularioAgregarMascotas = () => {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);

    setName(event.target.value);
    setStates({
      ...states,
      [event.target.name]: event.target.checked,
    });
  };
  const [states, setStates] = React.useState({
    adoptado: false,
    castracion: false,
    vacunas: false,
  });

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl variant="standard">
          <InputLabel htmlFor="txtNombreMascota">Nombre</InputLabel>
          <Input id="txtNombreMascota" value={name} onChange={handleChange} />
        </FormControl>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Seleccione el estado NO-Si</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={states.adoptado}
                  onChange={handleChange}
                  name="adoptado"
                />
              }
              label="Adoptado"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={states.castracion}
                  onChange={handleChange}
                  name="castracion"
                />
              }
              label="Castrado"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={states.vacunas}
                  onChange={handleChange}
                  name="vacunas"
                />
              }
              label="Vacunado"
            />
          </FormGroup>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Edad
          </InputLabel>
          <NativeSelect
            defaultValue={1}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
          >
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormControl>
      </Box>
    </>
  );
};
