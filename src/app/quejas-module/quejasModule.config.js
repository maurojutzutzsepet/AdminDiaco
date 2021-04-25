import FormQuejas from "./components/formQuejas";
import CrearQueja from "./components/crearQueja";

export const QuejasModuleConfig = {
  settings: {},
  routes: [
    {
      path: "/Quejas",
      component: FormQuejas,
    },
    {
      path: "/queja/crear",
      component: CrearQueja,
    },
    {
      path: "/queja/editar/:idQueja",
      component: CrearQueja,
    },
  ],
};
