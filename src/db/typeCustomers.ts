export type typeCustomers = {
  // Identificativo Univoco
  UID: string;
  // Nome del cliente
  firstName: string;
  // Cognome del cliente
  lastName: string;
  // Email del cliente
  email: string;
  // Numero di telefono del cliente
  phoneNumber: string;
  // Indirizzo del cliente (opzionale)
  address?: string;
  // Città del cliente (opzionale)
  city?: string;
  // CAP del cliente (opzionale)
  postalCode?: string;
  // Paese del cliente (opzionale)
  country?: string;
  // Note aggiuntive sul cliente (opzionale)
  notes?: string;
  // Data e ora di creazione del cliente
  createdAt: Date;
  // Data e ora dell'ultimo aggiornamento del cliente
  updatedAt: Date;
};
