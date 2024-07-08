export type OrderItems = {
  // Identificativo Univoco dell'articolo dell'ordine
  UID: string;
  // Identificativo dell'ordine a cui l'articolo appartiene
  orderUID: string;
  // Identificativo del prodotto ordinato
  productUID: string;
  // Quantità del prodotto ordinato
  quantity: number;
  // Unità di misura del prodotto ordinato (es: kg, g, l, pz)
  unit: string;
  // Prezzo unitario del prodotto
  price: number;
  // Prezzo totale del prodotto
  totalPrice: number;
  // Elenco degli identificativi delle personalizzazioni applicate al prodotto
  customizationUIDs: string[];
  // Note aggiuntive sull'articolo dell'ordine
  notes: string;
};
