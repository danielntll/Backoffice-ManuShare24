export type Promotion = {
  // Identificativo Univoco
  UID: string;
  // Nome della promozione
  name: string;
  // Descrizione della promozione
  description: string;
  // Tipo di sconto (es: percentuale, valore fisso)
  discountType: string;
  // Valore dello sconto
  discountValue: number;
  // Data di inizio della promozione
  startDate: Date;
  // Data di fine della promozione
  endDate: Date;
};
