export const comercioInterface = (data = {}) => {
  return {
    nit: data.nit || "",
    nombre_comercio: data.nombre_comercio || "",
    telefono: data.telefono || "",
    email: data.email || "",
    municipio: data.municipio || 1,
    departamento: data.departamento || 1,
    region: data.region || 1,
    direccion: data.direccion || "",
  };
};

export const comercioDeleted = (idComercio, stateComercio = []) => {
  let newComercio = [];
  stateComercio.map((e) => {
    if (e.id !== idComercio) {
      newComercio.push(e);
    }
    return null;
  });
  return newComercio;
};
