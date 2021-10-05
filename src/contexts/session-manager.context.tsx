import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";

import { auth } from "../bd/fireAuth.js";

//TIPOS PRIMERO
type SessionType = {
  uid: string | null;
  email: string | null;
  photoURL?: string;
};

type SessionContextType = {
  session: SessionType;
  ingresoUsuario?: () => Promise<any>;
  logout?: () => void;
  clear?: () => void;
};

//Es Un componente
export const SessionContext = React.createContext<SessionContextType | null>(
  null
);

export const SessionProvider: React.FC = (props) => {
  // props: {children, ...}
  const [session, setSession] = useState(null);

  const ingresoUsuarioSesion = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then((res) => {
      console.log(res);
      // setSession(res.user.email);
    });
  };

  // logout() { return Promise }

  // clear() { limpia session }

  return (
    <SessionContext.Provider
      value={{
        session: {
          uid: "",
          email: "",
        },
        function: ingresoUsuarioSesion(),

        // // logout,
        // // clear,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );

  //Es Un componente
};
