import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";

import { auth } from "../bd/fireConfig";
//TIPOS PRIMERO
type SessionType = {
  uid: string | null;
  email: string | null;
  photoURL?: string;
};

const session: SessionContextType = {
  session: {
    uid: null,
    email: null,
  },
  ingresoUsuario: () => Promise,
  // logout
  // clear
};

//Es Un componente
export const SessionContext = React.createContext<SessionType | null>(null);

//Es Un componente
export const SessionProvider: React.FC = (props) => {
  // props: {children, ...}
  const [session, setSession] = useState(null);

  const ingresoUsuarioSesion = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then((res) => {
      console.log(res);
      setSession(user);
    });
  };

  // logout() { return Promise }

  // clear() { limpia session }

  return (
    <SessionContext.Provider
      value={{
        session: session,
        ingresoUsuarioSesion,
        // logout,
        // clear,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};
