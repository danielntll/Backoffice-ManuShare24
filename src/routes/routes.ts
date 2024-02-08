import { typeRoute } from "../types/typeRoute";
import {
  route_HomePage,
  route_ImpostazioniPage,
  route_LoginPage,
  route_RegistrazionePage,
  route_IngredientiDashboardPage,
  route_IngredientiAggiungiModificaPage,
  route_AttivitaDashboardPage,
} from "./singleRoute";

export const appRoutes: typeRoute[] = [
  route_HomePage,
  route_AttivitaDashboardPage,
  route_IngredientiDashboardPage,
  route_ImpostazioniPage,
];

export const allRoutes = {
  route_HomePage,
  route_ImpostazioniPage,
  route_LoginPage,
  route_RegistrazionePage,
  route_IngredientiDashboardPage,
  route_IngredientiAggiungiModificaPage,
  route_AttivitaDashboardPage,
};

export const loginRoutes = {
  route_LoginPage,
  route_RegistrazionePage,
};
