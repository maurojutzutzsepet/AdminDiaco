import TableComercios from "./components/tableComercios";
import FormComercio from "./components/formComercio";

export const ComercioConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/comercios",
      component: TableComercios,
    },
    {
      path: "/comercio/crear",
      component: FormComercio,
    },
    {
      path: "/comercio/editar/:idComercio",
      component: FormComercio,
    },
  ],
};
