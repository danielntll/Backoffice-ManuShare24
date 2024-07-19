import { typeAvailableLanguagesModel } from "../types/typeAvailableLanguage";

export type typeAllergens = {
  // Identificativo Univoco
  UID: string;
  // Nome dell'allergenico
  name: typeAvailableLanguagesModel;
  // Indirizzo URL dell'icona rappresentativa
  iconURL: {
    white: string;
    black: string;
  };
};
