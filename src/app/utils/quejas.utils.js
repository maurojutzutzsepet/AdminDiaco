export const quejaInterface = (data = {}) => {
  return {
    descripcion: data.descripcion || "",
    nit: data.nit || "",
  };
};

export const quejaDeleted = (idQueja, stateQuejas = []) => {
  let newQuejas = [];
  stateQuejas.map((e) => {
    if (e.id !== idQueja) {
      newQuejas.push(e);
    }
    return null;
  });
  return newQuejas;
};
