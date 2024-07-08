export type typeIngredient = {
  // Identificativo Univoco
  UID: string;
  // Nome del ingrediente
  name: string;
  // Descrizione del ingrediente
  description: string;
  // Array con l'URL delle immagini
  imageURLs: string[];
  // Elenco degli identificativi degli allergeni
  allergensUIDs: string[];
  // Elenco degli identificativi delle restrizioni dietetiche
  dietaryRestrictionsUIDs: string[];
  // Categoria dell'ingrediente
  categoryUID: string;
};
