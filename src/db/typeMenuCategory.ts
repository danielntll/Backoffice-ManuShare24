export type typeMenuCategory = {
  // Identificativo Univoco
  UID: string;
  // Nome della categoria
  name: string;
  // Descrizione della categoria
  description: string;
  // URL dell'immagine della categoria
  imageURLs: string[];
  // Elenco degli identificativi dei prodotti
  productsUIDs: string[];
};
