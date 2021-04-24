export const findByCatalog = (id, catalog = []) => {
  const result = catalog.find((item) => item.id === id);

  return result.titulo;
};
