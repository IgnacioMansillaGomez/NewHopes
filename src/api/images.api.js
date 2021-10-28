import { getStorage } from "../bd/fireData";

const storage = getStorage();

const uploadImage = async (name, file) => {
  const response = await storage.ref(name).put(file);
  return await response.ref.getDownloadURL();
};

export const ImagesAPI = {
  uploadImage,
};
