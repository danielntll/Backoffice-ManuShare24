import { typeBookingStatus } from "./typeBookingStatus";

export type typeBooking = {
  bookingID: string; // ID del dato registrato sul DB
  bookingStatus: typeBookingStatus; // Stato della prenotazione
  createdAt: number; // Data di creazione
  bookingDate: number; // Data delle prenotazione
  peopleNumber: number; // Numero di persone adulte
  kidsNumber?: number; // Numbero di bambini (è opzionale)
  noteByCustomer?: string; // Note lasciate dalla persona che ha prenotato
  noteByAdmin?: string; // Note lasciate dall'amministratore
  customerData: {
    userID?: string; // ID dell'utente che ha prenotato
    firstName: string; // Nome dell'utente che ha prenotato
    lastName: string; // Cognome dell'utente che ha prenotato
    email: string; // Email dell'utente che ha prenotato
    phone: string; // Telefono dell'utente che ha prenotato
    address: string; // Indirizzo dell'utente che ha prenotato
  };
  tableID?: string; // ID del tavolo che ha prenotato
};
