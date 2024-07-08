export type typeCustomization = {
  // Identificativo Univoco
  UID: string;
  // Nome della personalizzazione (es: Taglia, Colore ecc)
  name: string;
  // Elenco degli identificativi delle opzioni di personalizzazione
  optionsUIDs: string[];
};
