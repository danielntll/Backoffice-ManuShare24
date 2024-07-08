export type typeOrders = {
  // Identificativo Univoco dell'ordine
  UID: string;
  // Identificativo dell'attività
  businessUID: string;
  // Identificativo del cliente
  customerUID: string;
  // Identificativo del tavolo (opzionale)
  tableUID?: string;
  // Identificativo del membro dello staff che ha preso l'ordine (opzionale)
  staffUID?: string;
  // Elenco degli identificativi degli articoli dell'ordine
  orderItemsUIDs: string[];
  // Data dell'ordine
  orderDate: Date;
  // Ora dell'ordine (es: 19:00)
  orderTime: string;
  // Stato dell'ordine (es: In corso, Completato, Annullato)
  orderStatus: string;
  // Stato del pagamento (es: Pagato, In attesa, Non Pagato)
  paymentStatus: string;
  // Metodo di pagamento (es: Carta di credito, Contanti)
  paymentMethod: string;
  // Valore totale dell'ordine
  totalValue: number;
  // Valore totale dello sconto applicato
  discountValue: number;
  // Tipo di sconto applicato (es: percentuale, valore fisso)
  discountType: string;
  // Note aggiuntive
  notes: string;
  // Data e ora di creazione dell'ordine
  createdAt: Date;
  // Data e ora dell'ultimo aggiornamento dell'ordine
  updatedAt: Date;
};
