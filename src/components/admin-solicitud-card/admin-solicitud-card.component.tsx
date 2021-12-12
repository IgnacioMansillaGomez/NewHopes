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
          <div className="col-11">
            <h2 className="text-center">Datos Adoptante</h2>
          </div>
          {/* <div className="col-6">
            <h2 className="text-center">Datos Mascota</h2>
          </div> */}
        </div>
        <div className="row mt-3">
          <div className="col-12 ">
            <div className="col-12 card m-auto ">
              <div className="card-body ">
                <div className="card-text pt-3">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <div className="col-6">
                      <AccountCircle sx={{ color: "#7b6db3", mr: 1, my: 0 }} />
                      <strong className="m-1">Nombre Completo: </strong>
                    </div>
                    <div className="col-6 text-center">
                      <p>
                        {solicitud.nombre_adoptante}{" "}
                        {solicitud.apellido_adoptante}
                      </p>
                    </div>
                  </Box>
                </div>

                <div className="card-text pt-3">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <div className="col-6">
                      <AccountCircle sx={{ color: "#7b6db3", mr: 1, my: 0 }} />
                      <strong className="m-1">Genero: </strong>
                    </div>
                    <div className="col-6 text-center">
                      <p>{solicitud.sexo_adoptante}</p>
                    </div>
                  </Box>
                </div>

                <div className="card-text pt-3">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <div className="col-6">
                      <PhoneAndroidIcon
                        sx={{ color: "#7b6db3", mr: 1, my: 0 }}
                      />
                      <strong className="m-1">Telefono: </strong>
                    </div>
                    <div className="col-6 text-center">
                      <p>{solicitud.telefono_celular}</p>
                    </div>
                  </Box>
                </div>

                <div className="card-text pt-3">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <div className="col-6">
                      <MailIcon sx={{ color: "#7b6db3", mr: 1, my: 0 }} />
                      <strong className="m-1">E-mail: </strong>
                    </div>
                    <div className="col-6 text-center">
                      <p>{solicitud.email_adoptante}</p>
                    </div>
                  </Box>
                </div>

                <div className="card-text pt-3">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <div className="col-6">
                      <HomeIcon sx={{ color: "#7b6db3", mr: 1, my: 1.5 }} />
                      <strong className="m-1">Ciudad: </strong>
                    </div>
                    <div className="col-6 text-center">
                      <p>{solicitud.ciudad_adoptante}</p>
                    </div>
                  </Box>
                </div>

                <div className="card-text pt-3">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <div className="col-6">
                      <ApartmentIcon
                        sx={{ color: "#7b6db3", mr: 1, my: 1.5 }}
                      />
                      <strong className="m-1">Calle: </strong>
                    </div>
                    <div className="col-6 text-center">
                      <p>{solicitud.calle_adoptante}</p>
                    </div>
                  </Box>
                </div>

                <div className="card-text pt-3">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <div className="col-6">
                      <PetsIcon sx={{ color: "#7b6db3", mr: 1, my: 1.5 }} />
                      <strong className="m-1">Mascotas: </strong>
                    </div>
                    <div className="col-6 text-center">
                      <p>{solicitud.mascotas_adoptante}</p>
                    </div>
                  </Box>
                </div>

                <div className="card-text pt-3">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <div className="col-6">
                      <FaceIcon sx={{ color: "#7b6db3", mr: 1, my: 1.5 }} />
                      <strong className="m-1">Niños: </strong>
                    </div>
                    <div className="col-6 text-center">
                      <p>{solicitud.ninos_adoptante}</p>
                    </div>
                  </Box>
                </div>

                <div className="card-text pt-3">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <div className="col-6">
                      <WorkIcon sx={{ color: "#7b6db3", mr: 1, my: 1.5 }} />
                      <strong className="m-1">Ocupacion: </strong>
                    </div>
                    <div className="col-6 text-center">
                      <p>{solicitud.ocupacion_adoptante}</p>
                    </div>
                  </Box>
                </div>

                <div className="card-text pt-3">
                  <Box sx={{ display: "flex", alignItems: "flex-center" }}>
                    <div className="col-6">
                      <HomeWorkIcon sx={{ color: "#7b6db3", mr: 1, my: 1.5 }} />
                      <strong className="m-1">Vivienda: </strong>
                    </div>
                    <div className="col-6 text-center">
                      <p>{solicitud.vivienda_adoptante}</p>
                    </div>
                  </Box>
                </div>
              </div>
            </div>
            <div className="col-12 m-auto">
              <div className="card">
                <img
                  src={
                    solicitud.pet.img_url
                      ? solicitud.pet.img_url
                      : DEFAULT_PET_IMAGE
                  }
                  alt="Imagen Mascota"
                />
                <div className="card-body modal__layout">
                  <p className="card-text">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <div>
                        <AccountCircle
                          sx={{ color: "#b36d85", mr: 1 }}
                          color="success"
                        />
                        <strong>Nombre Mascota: </strong>
                        {solicitud.pet.nombre}
                      </div>
                      <div>
                        <AccountCircle
                          sx={{ color: "#b36d85", mr: 1, my: 0 }}
                        />
                        <strong>Especie: </strong>
                        {solicitud.pet.especie}
                      </div>
                    </Box>
                  </p>

                  <p className="card-text">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <div>
                        <AllInclusiveIcon sx={{ color: "#b36d85", mr: 1 }} />
                        <strong>Sexo: </strong>

                        {solicitud.pet.sexo ? "Macho" : "Hembra"}
                      </div>
                      <div>
                        <HeightIcon sx={{ color: "#b36d85", mr: 0 }} />
                        <strong>Tamaño: </strong>
                        {solicitud.pet.tamano}
                      </div>
                    </Box>
                  </p>

                  <p className="card-text">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <div>
                        <PaletteIcon sx={{ color: "#b36d85", mr: 1 }} />
                        <strong>Color Pelaje: </strong>
                        {solicitud.pet.color}
                      </div>

                      <div>
                        <LensRoundedIcon sx={{ color: "#b36d85", mr: 1 }} />

                        <strong>Pelaje: </strong>
                        {solicitud.pet.pelaje}
                      </div>
                    </Box>
                  </p>
                </div>
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
