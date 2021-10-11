import React from "react";
import { useHistory } from "react-router";

export const GoBack = () => {
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };
  return <button onClick={handleBack}>Volver</button>;
};
