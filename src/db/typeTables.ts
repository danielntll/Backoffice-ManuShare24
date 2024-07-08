export type typeTables = {
  // Identificativo Univoco del tavolo
  UID: string;
  // Identificativo dell'attività a cui il tavolo appartiene
  businessUID: string;
  // Nome del tavolo (es: Tavolo 1, Tavolo 2, Tavolo VIP)
  name: string;
  // Capacità massima del tavolo (numero di posti a sedere)
  capacity: number;
  // Descrizione del tavolo (es: Tavolo vicino alla finestra)
  description: string;
  // Tipo di tavolo (es: interno, esterno, bar)
  tableType: string;
  // Stato attuale del tavolo (es: Libero, Occupato, Prenotato)
  status: string;
  // Posizione del tavolo (es: Zona A, Zona B)
  location: string;
  // Array di URL delle immagini del tavolo (opzionale)
  imageURLs?: string[];
  // Data e ora di creazione del tavolo
  createdAt: Date;
  // Data e ora dell'ultimo aggiornamento del tavolo
  updatedAt: Date;
};
