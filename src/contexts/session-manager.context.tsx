import React, { useEffect, useState, FunctionComponent } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { auth } from "../bd/fireAuth.js";

const ADMIN_USER = "MeAsUaC6GROctPebR6TsaWsxyQo2";
//TIPOS PRIMERO
type SessionType = {
  uid: string;
  email: string | null;
  photoURL?: string; //Al ser opcional si no es String es decir no viene es undefined
};

//Esto es key y tipo porque es un type de typescript
type SessionContextType = {
  session: SessionType;
  ingresoUsuario: (email: string, password: string) => Promise<any>;
  logout?: () => void;
  clear?: () => void;
  isAdmin: () => boolean;
};

//Es Un componente
export const SessionContext = React.createContext<
  SessionContextType | undefined
>(undefined);

export const SessionProvider: FunctionComponent = (props) => {
  const [session, setSession] = useState<SessionType>({ uid: "", email: "" });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        setSession({
          uid: user.uid,
          email: user.email,
        });
      }
    });
  }, []);

  const ingresoUsuario = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);

    setSession({ uid: res.user.uid, email: res.user.email });
    return res;
  };
  const logout = () => {
    auth.signOut();
    setSession({ uid: "", email: "" });
  };
  // clear() { limpia session }

  const isAdmin = () => {
    return session.uid === ADMIN_USER;
  };

  const value = {
    session,
    ingresoUsuario,
    logout,
    isAdmin,
  };

  return (
    <SessionContext.Provider value={value}>
      {props.children}
    </SessionContext.Provider>
  );
};
