import React from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";

export const GoBack = () => {
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };
  return (
    <Button
      variant="contained"
      startIcon={<ArrowBackSharpIcon />}
      onClick={handleBack}
    >
      Volver atrás
    </Button>
  );
};
