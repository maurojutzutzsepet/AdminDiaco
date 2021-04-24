export const quejaInterface = (data = {}) => {
  return {
    descripcion: data.descripcion || "",
    nit: data.nit || "",
  };
};
