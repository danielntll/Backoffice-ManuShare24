export type typeDigitalMenu = {
  // Identificativo Univoco
  UID: string;
  // Nome del Menù Digitale
  name: string;
  // Descrizione del Menù Digitale
  description: string;
  // URL dell'immagine del Menù Digitale
  imageURLs: string[];
  // Elenco degli identificativi delle categorie
  menuCategoryUIDs: string[];
};
