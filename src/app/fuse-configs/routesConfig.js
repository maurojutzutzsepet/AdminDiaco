import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse";
//import { ExampleConfig } from "app/main/example/ExampleConfig";
import { LoginConfig } from "app/diaco/login/LoginConfig";
import { InicioConfig } from "app/inicioPage/inicioConfig";
import { QuejasModuleConfig } from "app/quejasModule/quejasModule.config";
import { ComercioConfig } from "app/comercios/comerciosConfig";
import { ReportesConfig } from "app/reportes-diaco/reportes.config";

const routeConfigs = [
  ComercioConfig,
  //   ExampleConfig,
  LoginConfig,
  InicioConfig,
  QuejasModuleConfig,
  ReportesConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    component: () => <Redirect to="/login" />,
  },
  {
    path: "/login",
    component: () => <Redirect to="/login" />,
  },
  {
    path: "/inicio",
    component: () => <Redirect to="/inicio" />,
  },
  {
    path: "/quejas",
    component: () => <Redirect to="/quejas" />,
  },
  {
    path: "/comercios",
    component: () => <Redirect to="/comercios" />,
  },
  {
    path: "/reportes",
    component: () => <Redirect to="/reportes" />,
  },
];

export default routes;
