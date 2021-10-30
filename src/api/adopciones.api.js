import { getFirestore } from "../bd/fireData";
const dataBase = getFirestore();
const itemCollection = dataBase.collection("adopciones");

const createAdoption = (peticion) => {
  return itemCollection.add(peticion);
};

const getRequestByPet = (id) => {
  const filter = itemCollection.where("id_mascota_peticion", "==", id);
  return filter.get();
};

const deleteRequest = (id) => {
  return itemCollection.doc(id).delete();
};

export const AdopcionesAPI = {
  createAdoption,
  getRequestByPet,
  deleteRequest,
};
