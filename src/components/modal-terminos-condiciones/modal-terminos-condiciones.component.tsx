import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const ModalTerminosCondiciones = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        Leer Términos y Condiciones
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Términos y Condiciones New Hopes
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bienvenido a New Hopes proporcionado por Ignacio Mansilla. Nos
            complace ofrecerle acceso al Servicio (como se define más abajo),
            sujeto a estos términos y condiciones (los "Términos de Servicio") y
            a la Política de Privacidad correspondiente de XXXX. Al acceder y
            utilizar el Servicio, usted expresa su consentimiento, acuerdo y
            entendimiento de los Términos de Servicio y la Política de
            Privacidad. Si no está de acuerdo con los Términos de Servicio o la
            Política de Privacidad, no utilice el Servicio. Si utiliza el
            servicio está aceptando las modalidades operativas en vigencia
            descriptas más adelante, las declara conocer y aceptar, las que se
            habiliten en el futuro y en los términos y condiciones que a
            continuación se detallan: <br />
            <b>Privacidad de la información</b> Para utilizar los Servicios
            ofrecidos por New Hopes, los Usuarios deberán facilitar determinados
            datos de carácter personal. Su información personal se procesa y
            almacena en servidores o medios magnéticos que mantienen altos
            estándares de seguridad y protección tanto física como tecnológica.
            Para mayor información sobre la privacidad de los Datos Personales y
            casos en los que será revelada la información personal, se pueden
            consultar nuestras políticas de privacidad.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
