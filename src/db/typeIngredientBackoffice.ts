export type typeIngredientBackoffice = {
  // Identificativo Univoco
  UID: string;
  // Storico degli Identificativi dei rifornimenti
  supplyHistoryUIDs: string[];
  // Unità di misura (es: KG, g, l, pz)
  unit: string;
  // Prezzo di ventita per unità
  price: number;
  // Quantità totale disponibile in magazzino
  quantityInStock: number;
  // Quantità minima di scorte
  minStock: number;
  // Data dell'ultimo aggiornamento
  lastUpdated: Date;
};
