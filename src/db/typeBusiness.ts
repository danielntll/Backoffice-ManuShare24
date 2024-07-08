export type typeBusiness = {
  // Identificativo Univoco
  UID: string;
  // Nome dell'attività (es: Ristorante Pizzeria)
  name: string;
  // Descrizione dell'attività
  description: string;
  // Indirizzo dell'attività
  address: string;
  // Numero di telefono dell'attività
  phone: string;
  // Email dell'attività
  email: string;
  // Sito web dell'attività (opzionale)
  website?: string;
  // URL dell'immagine dell'attività (opzionale)
  imageURLs?: string[];
  // Elenco degli identificativi degli orari di apertura
  openingHoursUIDs: string[];
  // Elenco degli identificativi dei link ai social media
  socialMediaUIDs: string[];
  // Elenco degli identificativi dei menù digitali
  digitalMenuUID: string;
  // Elenco degli identificativi del personale
  staffUIDs: string[];
  // Elenco degli identificativi delle prenotazioni ricevute (opzionale)
  reservationsUIDs?: string[];
};
