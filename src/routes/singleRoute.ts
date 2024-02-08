import {
  home,
  homeOutline,
  list,
  listOutline,
  logIn,
  logInOutline,
  personAdd,
  personAddOutline,
  settings,
  settingsOutline,
  storefront,
  storefrontOutline,
} from "ionicons/icons";
import { typeRoute } from "../types/typeRoute";

// AUTH -----------------
// Login
export const route_LoginPage: typeRoute = {
  path: "/login",
  tab: {
    it_IT: "Accesso",
    en_GB: "Login",
  },
  icons: {
    active: logIn,
    notActive: logInOutline,
  },
};
// Registrazione
export const route_RegistrazionePage: typeRoute = {
  path: "/registrazione",
  tab: {
    it_IT: "Register",
    en_GB: "Registrazione",
  },
  icons: {
    active: personAdd,
    notActive: personAddOutline,
  },
};

// APP --------------
export const route_AttivitaDashboardPage: typeRoute = {
  path: "/attivita-dashboard/",
  tab: {
    it_IT: "Gestione attività",
    en_GB: "Activity managment",
  },
  icons: {
    active: storefront,
    notActive: storefrontOutline,
  },
};
export const route_IngredientiAggiungiModificaPage: typeRoute = {
  path: "/ingredienti-dashboard/aggiungi-modifica",
  tab: {
    it_IT: "Aggiungi o modifica",
    en_GB: "Add or modify",
  },
  icons: {
    active: list,
    notActive: listOutline,
  },
};
export const route_HomePage: typeRoute = {
  path: "/home",
  tab: {
    it_IT: "Home",
    en_GB: "Home",
  },
  icons: {
    active: home,
    notActive: homeOutline,
  },
};
export const route_IngredientiDashboardPage: typeRoute = {
  path: "/ingredienti-dashboard",
  tab: {
    it_IT: "Ingredienti",
    en_GB: "Ingredients",
  },
  icons: {
    active: list,
    notActive: listOutline,
  },
};
export const route_ImpostazioniPage: typeRoute = {
  path: "/impostazioni",
  tab: {
    it_IT: "Impostazioni",
    en_GB: "Settings",
  },
  icons: {
    active: settings,
    notActive: settingsOutline,
  },
};
