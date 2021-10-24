import React, { useContext } from "react";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { SessionContext } from "../../contexts/session-manager.context";
import { useHistory } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

export const UserAvatar = () => {
  const session = useContext(SessionContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const sessionContext = useContext(SessionContext);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    session && session.logout && session.logout();
    history.push("/login");
  };

  const handleNewPet = () => {
    history.push("/new-pet");
  };

  const handleAdminPetList = () => {
    history.push("/admin-pet-list");
  };
  const handleAdminAdopciones = () => {
    history.push("/admin-adopciones");
  };
  const handleAdminReports = () => {
    history.push("/admin-reports");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Cuenta">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {sessionContext && sessionContext.session && (
          <MenuItem>
            <ListItemIcon>
              <AlternateEmailIcon fontSize="small" />
            </ListItemIcon>
            {sessionContext.session.email}
          </MenuItem>
        )}

        {sessionContext && sessionContext.isAdmin() && (
          <MenuItem onClick={handleNewPet}>
            <ListItemIcon>
              <PetsIcon fontSize="small" />
            </ListItemIcon>
            Nueva Mascota
          </MenuItem>
        )}

        {sessionContext && sessionContext.isAdmin() && (
          <MenuItem onClick={handleAdminPetList}>
            <ListItemIcon>
              <ListAltIcon fontSize="small" />
            </ListItemIcon>
            Listado Mascotas
          </MenuItem>
        )}
        {sessionContext && sessionContext.isAdmin() && (
          <MenuItem onClick={handleAdminAdopciones}>
            <ListItemIcon>
              <FeaturedPlayListIcon fontSize="small" />
            </ListItemIcon>
            Adopciones
          </MenuItem>
        )}
        {sessionContext && sessionContext.isAdmin() && (
          <MenuItem onClick={handleAdminReports}>
            <ListItemIcon>
              <AssessmentIcon fontSize="small" />
            </ListItemIcon>
            Informes
          </MenuItem>
        )}

        {sessionContext && !sessionContext.isAdmin() && (
          <MenuItem>
            <ListItemIcon>
              <PetsIcon fontSize="small" />
            </ListItemIcon>
            Mascotas en adopción
          </MenuItem>
        )}

        {sessionContext && !sessionContext.isAdmin() && (
          <MenuItem>
            <ListItemIcon>
              <FeaturedPlayListIcon fontSize="small" />
            </ListItemIcon>
            Mis Adopciones
          </MenuItem>
        )}

        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesion
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
