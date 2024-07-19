import { typeAvailableLanguagesModel } from "../types/typeAvailableLanguage";

export type typeDietaryRestictions = {
  // Identificativo Univoco
  UID: string;
  // Nome della restrizione dietetica
  name: typeAvailableLanguagesModel;
  // Indirizzo URL dell'icona rappresentativa
  iconURL: {
    white: string;
    black: string;
  };
};
