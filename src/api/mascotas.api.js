import { getFirestore } from "../bd/fireData";

const dataBase = getFirestore(); //Asignamos el modulo getFirestore() a la constante dataBase.
const itemCollection = dataBase.collection("mascotas"); //Accedemos a la colección que pasamos como parametro en este 'mascotas' y lo asignamos a la variable itemCollection

/* Arrow Function que retorna una QuerySnapshot que es el estado actual que tiene itemCollection en la base de datos */
const getAllPets = () => {
  return itemCollection.get();
};

/* Arrow Function que retorna una QuerySnapshot que es el estado actual que tiene un item dentro de itemCollection.doc en la base de datos pero filtrando por 'id' el cual recibe como parametro */
const getPet = (id) => {
  const item = itemCollection.doc(id);
  return item.get();
};

const createPet = (pet) => {
  return itemCollection.add(pet);
};

const deletePet = (id) => {
  itemCollection.doc(id).delete();
};

export const MascotasAPI = {
  createPet,
  getAllPets,
  getPet,
  deletePet,
};
