import { getFirestore } from "../bd/fireData";
const dataBase = getFirestore();
const itemCollection = dataBase.collection("solicitudes");

const createAdoption = (peticion) => {
  return itemCollection.add(peticion);
};

const getRequestByPet = (id) => {
  const filter = itemCollection.where("id_mascota_peticion", "==", id);
  return filter.get();
};

const getAllRequest = () => {
  return itemCollection.get();
};

const deleteRequest = (id) => {
  return itemCollection.doc(id).delete();
};

export const SolicitudesAPI = {
  createAdoption,
  getRequestByPet,
  deleteRequest,
  getAllRequest,
};
