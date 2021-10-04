import { getFirestore } from "../bd/fireData";

const dataBase = getFirestore();
const itemCollection = dataBase.collection("mascotas");

const getAllPets = () => {
  return itemCollection.get();
};

const getPet = (id) => {
  const item = itemCollection.doc(id);
  return item.get();
};

export const MascotasAPI = {
  getAllPets,
  getPet,
};
