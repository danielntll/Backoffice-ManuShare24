export type typeReservations = {
  // Identificativo Univoco
  UID: string;
  // Identificativo dell'attività
  businessUID: string;
  // Identificativo del cliente
  customerUID: string;
  // Numero di ospiti
  numberOfGuests: number;
  // Data della prenotazione
  reservationDate: Date;
  // Ora della prenotazione (es: 19:00)
  reservationTime: string;
  // Identificativo del tavolo (opzionale)
  tableUID?: string;
  // Stato della prenotazione (es: Confermata, Rifiutata, In Attesa)
  status: string;
  // Note aggiuntive
  notes: string;
  // Identificativo del membro dello staff assegnato alla prenotazione (opzionale)
  staffUID?: string;
  // Data e ora di creazione della prenotazione
  createdAt: Date;
  // Data e ora dell'ultimo aggiornamento della prenotazione
  updatedAt: Date;
};
