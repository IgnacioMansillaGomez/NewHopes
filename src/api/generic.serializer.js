const serializeAll = (data) => {
  return data.docs.map((doc) => {
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
