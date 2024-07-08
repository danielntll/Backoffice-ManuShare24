export type typeStaff = {
  // Identificativo Univoco
  UID: string;
  // Identificativo dell'attività
  businessUID: string;
  // Nome completo del membro dello staff
  name: string;
  // Ruolo del membro dello staff (es. Cuoco, Camerieri, Barista)
  role: string;
  // URL dell'immagine del membro dello staff (opzionale)
  photoURL?: string;
  // Breve descrizione del membro dello staff (opzionale)
  description?: string;
  // Elenco degli identificativi dei link ai social media del membro dello staff (opzionale)
  socialMediaUIDs?: string[];
  // Stato di attività del membro dello staff
  isActive: boolean;
};
