//Serialirizador para uso común
/* Arrow function que recibe un parametro*/
const serializeAll = (data) => {
  /* Accedemos a cada 'docs' que hay dentro de data el cual es un objeto */
  return data.docs.map((doc) => {
    /*A traves del metodo 'map' retornamos un objeto el cual por cada 'doc' toma su id y lo almacena en la key "id" que definimos , luego utilizamos el metodo spread para agregar doc.data() al objeto*/
    return { id: doc.id, ...doc.data() };
  });
};

const serialize = (data) => {
  return { id: data.id, ...data.data() };
};

export const GenericSerializer = {
  serializeAll,
  serialize,
};
