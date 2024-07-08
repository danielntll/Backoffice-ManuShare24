export type typeProduct = {
  // Identificativo Univoco
  UID: string;
  // Nome del Prodotto
  name: string;
  // Descrizione del Prodotto
  description: string;
  // Categoria del Prodotto
  categoryUID: string;
  // Prezzo del Prodotto
  price: number;
  // Array URL dell'immagine del prodotto
  imageURLs: string[];
  // Elenco degli identificativi degli ingredienti
  ingredientsUIDs: string[];
  // Somma degli allergeni dagli ingredienti. Elenco degli identificativi degli allergeni
  allergensUIDs: string[];
  // Somma dei dati dagli ingredienti. Elenco degli identificativi delle restrizioni dietetiche
  dietaryRestrictionsUIDs: string[];
  // Stato di attività del prodotto
  isActive: boolean;
  // Stato di disponibilità del prodotto
  isAvailable: boolean;
  // Oggetti custom (es: Taglia, Colore, Pezzi ecc)
  customizationUIDs: string[];
  // UID della promozione in corso
  promotionUID: string;
};
