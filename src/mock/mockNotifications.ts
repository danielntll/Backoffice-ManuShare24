import { typeNotification } from "../types/typeNotification";

export const mockNotifications: typeNotification[] = [
  {
    notificationID: "123456789",
    title: "Nuovo ordine ricevuto",
    description: "Hai ricevuto un nuovo ordine per il prodotto X",
    createdAt: Date.now(),
    category: "orders",
    readed: false,
  },
  {
    notificationID: "987654321",
    title: "Aggiornamento di inventario",
    description: "Il prodotto Y è stato aggiunto al tuo inventario",
    createdAt: Date.now() - 86400000, // Un giorno fa
    category: "inventory",
    readed: false,
  },
  {
    notificationID: "456789123",
    title: "Prenotazione confermata",
    description: "La prenotazione per l'evento Z è stata confermata",
    createdAt: Date.now() - 172800000, // Due giorni fa
    category: "reservation",
    readed: true,
  },
  {
    notificationID: "789123456",
    title: "Feedback ricevuto",
    description: "Hai ricevuto un nuovo feedback per il tuo servizio",
    createdAt: Date.now() - 259200000, // Tre giorni fa
    category: "feedback",
    readed: true,
  },
];
