import { doc } from "firebase/firestore";
import { getFirestore } from "../bd/fireData";
import { query, where } from "firebase/firestore";
import { writeBatch } from "firebase/firestore";
const dataBase = getFirestore();
const itemCollection = dataBase.collection("solicitudes");

const createAdoption = (peticion) => {
  return itemCollection.add(peticion);
};

const getRequestByPet = (id) => {
  const filter = itemCollection.where("id_mascota_peticion", "==", id);
  return filter.get();
};

const rejectRequest = (id) => {
  return itemCollection.doc(id).update({ estado: "Rechazada" });
};

const approveRequest = (id) => {
  return itemCollection.doc(id).update({ estado: "Aceptada" });
};

const markFinalized = (id) => {
  return itemCollection.doc(id).update({ estado: "Finalizada" });
};

const getAllRequest = () => {
  return itemCollection.get();
};

const deleteRequest = (id) => {
  return itemCollection.doc(id).delete();
};

const getMyRequest = (id) => {
  const filter = itemCollection.where("id_usuario", "==", id);
  return filter.get();
};

export const SolicitudesAPI = {
  createAdoption,
  getRequestByPet,
  deleteRequest,
  getAllRequest,
  rejectRequest,
  approveRequest,
  markFinalized,
  getMyRequest,
};
