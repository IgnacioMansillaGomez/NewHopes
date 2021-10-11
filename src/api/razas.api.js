import { getFirestore } from "../bd/fireData";

const dataBase = getFirestore();

const itemCollection = dataBase.collection("razas");

const getRace = (id) => {
  const item = itemCollection.doc(id);
  return item.get();
};

const getAllRaces = () => {
  return itemCollection.get();
};

export const RazasAPI = {
  getRace,
  getAllRaces,
};
