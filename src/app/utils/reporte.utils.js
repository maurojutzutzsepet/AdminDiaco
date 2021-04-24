export const filtroReporteInterface = (data = {}) => {
  return {
    tipo_filtro: data.tipo_filtro || 1,
    nit: data.nit || "",
    municipio: data.municipio || 1,
    departamento: data.departamento || 1,
    region: data.region || 1,
  };
};

export const filterQuejas = (quejas = []) => {
  let arrQuejas = [];

  quejas.map((e) => {
    if (e.quejas.length) {
      arrQuejas = [...arrQuejas, ...e.quejas];
    }
    return null;
  });

  return arrQuejas;
};
