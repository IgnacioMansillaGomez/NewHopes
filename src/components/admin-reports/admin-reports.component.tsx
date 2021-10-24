import React, { useContext, useEffect } from "react";
import { SessionContext } from "../../contexts/session-manager.context";
import { useHistory } from "react-router-dom";
import { Header } from "../header/header.component";

export const AdminReports = () => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);

  useEffect(() => {
    const sesion = sessionContext?.session;
    if (sesion?.uid === "") {
      history.push("/login");
    } else if (!sessionContext?.isAdmin()) {
      history.push("/not-allowed");
    }
  }, [sessionContext]);

  return (
    <>
      <Header />
      <div className="row">
        <div className="col">
          <h1>Reportecitos para admin</h1>
        </div>
      </div>
    </>
  );
};
