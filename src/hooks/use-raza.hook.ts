import React, { useEffect, useState, useRef } from "react";
import { GenericSerializer } from "../api/generic.serializer";
import { RazasAPI } from "../api/razas.api";

export type Raza = {
  id: string;
  nombre_raza: string;
  tipo: string;
};

export const useRaza = (id: string) => {
  const [raza, setRaza] = useState<Raza | undefined>(undefined);
  const cache = useRef<{ [key: string]: Raza }>({}); // useRef => {current: {} }

  useEffect(() => {
    if (cache.current[id]) return setRaza(cache.current[id]);
    RazasAPI.getRace(id).then((response) => {
      const raza = GenericSerializer.serialize(response);
      cache.current[id] = raza;

      setRaza(raza);
    });
  }, [id]);

  return raza;
};
