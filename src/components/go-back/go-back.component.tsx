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
    <div className="row">
      <div className="col-1">
        <Button
          variant="contained"
          startIcon={<ArrowBackSharpIcon />}
          onClick={handleBack}
        >
          Volver
        </Button>
      </div>
    </div>
  );
};
