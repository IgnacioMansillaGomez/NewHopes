import React, { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PetsIcon from "@mui/icons-material/Pets";
import WorkIcon from "@mui/icons-material/Work";
import FaceIcon from "@mui/icons-material/Face";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CancelIcon from "@mui/icons-material/Cancel";
import LensRoundedIcon from "@mui/icons-material/LensRounded";
import HeightIcon from "@mui/icons-material/Height";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaletteIcon from "@mui/icons-material/Palette";
import "./admin-solicitud-card.style.css";
import { SolicitudesAPI } from "../../api/solicitudes.api";
import { MessageModal } from "../message-modal/message-moda.component";
import { MascotasAPI } from "../../api/mascotas.api";
import { DEFAULT_PET_IMAGE } from "../../constants/constants";

export const AdminSolicitudCard = (props: any) => {
  const { solicitud, handleClose, solicitudesProcesadas } = props;

  const [open, setOpen] = useState(true);
  const [rejectRequestMsg, setRejectRequestMsg] = useState(false);
  const [approveRequestMsg, setApproveRequestMsg] = useState(false);

  const handleRechazarSolicitud = (event: any) => {
    SolicitudesAPI.rejectRequest(solicitud.id).then((resp: any) => {
      setRejectRequestMsg(false);
      handleClose(event, true);
    });
  };

  const openRejectRequestMsg = () => {
    setRejectRequestMsg(true);
  };

  const closeRejectRequestMsg = () => {
    setRejectRequestMsg(false);
  };

  const handleAceptarSolicitud = (event: any) => {
    SolicitudesAPI.approveRequest(solicitud.id).then((response: any) => {
      MascotasAPI.updatePet(solicitud.pet.id, {
        adoptado: "true",
        fecha_adopcion: new Date().toDateString(),
      }).then((r: any) => {
        solicitudesProcesadas.forEach((item: any) => {
          if (
            item.id !== solicitud.id &&
            item.estado === "Pendiente" &&
            item.pet.id === solicitud.pet.id
          ) {
            SolicitudesAPI.markFinalized(item.id);
          }
        });
        setRejectRequestMsg(false);
        handleClose(event, true);
      });
    });
  };

  const openApproveRequestMsg = () => {
    setApproveRequestMsg(true);
  };

  const closeApproveRequestMsg = () => {
    setApproveRequestMsg(false);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h2 className="text-center">Datos Adoptante</h2>
          </div>
          <div className="col-6">
            <h2 className="text-center">Datos Mascota</h2>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <AccountCircle
                      sx={{ color: "action.active", mr: 1, my: 0 }}
                    />
                    <p>
                      <strong>Nombre Completo: </strong>
                    </p>
                    <p>
                      {solicitud.nombre_adoptante}{" "}
                      {solicitud.apellido_adoptante}
                    </p>
                  </Box>
                </p>
                <p className="card-text">
                  {/* Sexo */}
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <AccountCircle
                      sx={{ color: "action.active", mr: 1, my: 0 }}
                    />
                    <p>
                      <strong>Genero: </strong>
                    </p>
                    <p>{solicitud.sexo_adoptante}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PhoneAndroidIcon
                      sx={{ color: "action.active", mr: 1, my: 1.5 }}
                    />
                    <p>
                      <strong>Telefono: </strong>
                    </p>
                    <p>{solicitud.telefono_adoptante}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <MailIcon sx={{ color: "action.active", mr: 1, my: 1.5 }} />
                    <p>
                      <strong>E-mail: </strong>
                    </p>
                    <p>{solicitud.email_adoptante}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <HomeIcon sx={{ color: "action.active", mr: 1, my: 1.5 }} />
                    <p>
                      <strong>Ciudad: </strong>
                    </p>
                    <p>{solicitud.ciudad_adoptante}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <ApartmentIcon
                      sx={{ color: "action.active", mr: 1, my: 1.5 }}
                    />
                    <p>
                      <strong>Calle: </strong>
                    </p>
                    <p>{solicitud.calle_adoptante}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PetsIcon sx={{ color: "action.active", mr: 1, my: 1.5 }} />
                    <p>
                      <strong>Mascotas: </strong>
                    </p>
                    <p>{solicitud.mascotas_adoptante}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <FaceIcon sx={{ color: "action.active", mr: 1, my: 1.5 }} />
                    <p>
                      <strong>Niños: </strong>
                    </p>
                    <p>{solicitud.ninos_adoptante}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <WorkIcon sx={{ color: "action.active", mr: 1, my: 1.5 }} />
                    <p>
                      <strong>Ocupacion: </strong>
                    </p>
                    <p>{solicitud.ocupacion_adoptante}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <HomeWorkIcon
                      sx={{ color: "action.active", mr: 1, my: 1.5 }}
                    />
                    <p>
                      <strong>Vivienda: </strong>
                    </p>
                    <p>{solicitud.vivienda_adoptante}</p>
                  </Box>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <img
                src={
                  solicitud.pet.img_url
                    ? solicitud.pet.img_url
                    : DEFAULT_PET_IMAGE
                }
                alt="Imagen Mascota"
              />
              <div className="card-body">
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <AccountCircle
                      sx={{ color: "action.active", mr: 1, my: 0 }}
                      color="success"
                    />
                    <p>
                      <strong>Nombre Mascota: </strong>
                    </p>
                    <p>{solicitud.pet.nombre}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <AccountCircle
                      sx={{ color: "action.active", mr: 1, my: 0 }}
                    />
                    <p>
                      <strong>Especie: </strong>
                    </p>
                    <p>{solicitud.pet.especie}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <AllInclusiveIcon
                      sx={{ color: "action.active", mr: 1, my: 1.5 }}
                    />
                    <p>
                      <strong>Sexo: </strong>
                    </p>
                    <p>{solicitud.pet.sexo ? "Macho" : "Hembra"}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <HeightIcon
                      sx={{ color: "action.active", mr: 1, my: 1.5 }}
                    />
                    <p>
                      <strong>Tamaño: </strong>
                    </p>
                    <p>{solicitud.pet.tamano}</p>
                  </Box>
                </p>

                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <LensRoundedIcon
                      sx={{ color: "action.active", mr: 1, my: 1.5 }}
                    />
                    <p>
                      <strong>Pelaje: </strong>
                    </p>
                    <p>{solicitud.pet.pelaje}</p>
                  </Box>
                </p>
                <p className="card-text">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PaletteIcon
                      sx={{ color: "action.active", mr: 1, my: 1.5 }}
                    />
                    <p>
                      <strong>Color Pelaje: </strong>
                    </p>
                    <p>{solicitud.pet.color}</p>
                  </Box>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*</div>
      </div> */}

      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-around">
          {/* estados: Pendiente, Aceptada, Rechazada, Finalizada */}
          {solicitud.estado === "Pendiente" && (
            <>
              {/* se puede aceptar o rechazar */}
              <Button
                variant="contained"
                color="success"
                endIcon={<CheckCircleIcon />}
                onClick={openApproveRequestMsg}
              >
                Aceptar Solicitud
              </Button>
              <Button
                variant="contained"
                color="error"
                endIcon={<CancelIcon />}
                onClick={openRejectRequestMsg}
              >
                Rechazar Solicitud
              </Button>
            </>
          )}
        </div>
      </div>
      <MessageModal
        show={rejectRequestMsg}
        title="Rechazar Solicitud de adopción"
        text={`¿Esta seguro de querer RECHAZAR esta solicitud de adopción?`}
        handleOnClose={closeRejectRequestMsg}
        handleOnSuccess={handleRechazarSolicitud}
      />
      <MessageModal
        show={approveRequestMsg}
        title="Aceptar solicitud adopción"
        text={`¿Esta seguro de querer ACEPTAR esta solicitud de adopción?`}
        handleOnClose={closeApproveRequestMsg}
        handleOnSuccess={handleAceptarSolicitud}
      />
    </>
  );
};
