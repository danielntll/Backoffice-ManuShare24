import { typeBooking } from "../types/typeBooking";

export const mockBookings: typeBooking[] = [
  {
    bookingID: "bookingID1",
    bookingStatus: "approved",
    createdAt: 1678886400000, // 2023-03-15T00:00:00.000Z
    bookingDate: 1679059200000, // 2023-03-17T00:00:00.000Z
    peopleNumber: 2,
    kidsNumber: 1,
    noteByCustomer: "Tavolo vicino alla finestra",
    noteByAdmin: "Prenotazione per compleanno",
    customerData: {
      userID: "userID1",
      firstName: "Mario",
      lastName: "Rossi",
      email: "mario.rossi@email.com",
      phone: "+39 333 1234567",
      address: "Via Roma 123, 00100 Roma",
    },
    tableID: "Ti-1",
  },
  {
    bookingID: "bookingID54",
    bookingStatus: "approved",
    createdAt: 1678886400000, // 2023-03-15T00:00:00.000Z
    bookingDate: 1679059200000, // 2023-03-17T00:00:00.000Z
    peopleNumber: 2,
    kidsNumber: 1,
    noteByCustomer: "Tavolo vicino alla finestra",
    noteByAdmin: "Prenotazione per compleanno",
    customerData: {
      userID: "userID1",
      firstName: "Mario",
      lastName: "Rossi",
      email: "mario.rossi@email.com",
      phone: "+39 333 1234567",
      address: "Via Roma 123, 00100 Roma",
    },
    tableID: "Ti-2",
  },
  {
    bookingID: "bookingID88",
    bookingStatus: "approved",
    createdAt: 1678886400000, // 2023-03-15T00:00:00.000Z
    bookingDate: 1679059200000, // 2023-03-17T00:00:00.000Z
    peopleNumber: 2,
    kidsNumber: 1,
    noteByCustomer: "Tavolo vicino alla finestra",
    noteByAdmin: "Prenotazione per compleanno",
    customerData: {
      userID: "userID1",
      firstName: "Mario",
      lastName: "Rossi",
      email: "mario.rossi@email.com",
      phone: "+39 333 1234567",
      address: "Via Roma 123, 00100 Roma",
    },
    tableID: "Ti-3",
  },
  {
    bookingID: "bookingID2",
    bookingStatus: "pending",
    createdAt: 1678799940000, // 2023-03-14T00:00:00.000Z
    bookingDate: Date.now(), // 2023-03-18T00:00:00.000Z
    peopleNumber: 4,
    noteByCustomer: "Tavolo all'aperto",
    customerData: {
      userID: "userID2",
      firstName: "Anna",
      lastName: "Verdi",
      email: "anna.verdi@email.com",
      phone: "+39 345 6789012",
      address: "Via Verdi 456, 00200 Milano",
    },
  },
  {
    bookingID: "bookingID3",
    bookingStatus: "pending",
    createdAt: 1678713580000, // 2023-03-13T00:00:00.000Z
    bookingDate: 1679232000000, // 2023-03-19T00:00:00.000Z
    peopleNumber: 6,
    noteByAdmin: "Prenotazione per anniversario",
    customerData: {
      userID: "userID3",
      firstName: "Luca",
      lastName: "Bianchi",
      email: "luca.bianchi@email.com",
      phone: "+39 357 9012345",
      address: "Via Bianchi 789, 00300 Napoli",
    },
  },
  {
    bookingID: "bookingID4",
    bookingStatus: "rejected",
    createdAt: 1679318400000, // 2023-03-20T00:00:00.000Z
    bookingDate: 1679404800000, // 2023-03-21T00:00:00.000Z
    peopleNumber: 8,
    noteByCustomer: "Tavolo in zona tranquilla",
    customerData: {
      userID: "userID4",
      firstName: "Giulia",
      lastName: "Neri",
      email: "giulia.neri@email.com",
      phone: "+39 368 0123456",
      address: "Via Neri 1011, 00400 Firenze",
    },
  },
  {
    bookingID: "bookingID5",
    bookingStatus: "cancelled",
    createdAt: 1679232000000, // 2023-03-19T00:00:00.000Z
    bookingDate: 1679491200000, // 2023-03-22T00:00:00.000Z
    peopleNumber: 2,
    noteByCustomer: "Tavolo per due con vista",
    customerData: {
      userID: "userID5",
      firstName: "Marco",
      lastName: "Gialli",
      email: "marco.gialli@email.com",
      phone: "+39 379 1234567",
      address: "Via Gialli 2022, 00500 Bologna",
    },
  },
  {
    bookingID: "bookingID6",
    bookingStatus: "pending",
    createdAt: 1679145600000, // 2023-03-18T00:00:00.000Z
    bookingDate: 1679577600000, // 2023-03-23T00:00:00.000Z
    peopleNumber: 5,
    noteByAdmin: "Prenotazione per gruppo di amici",
    customerData: {
      userID: "userID6",
      firstName: "Sofia",
      lastName: "Blu",
      email: "sofia.blu@email.com",
      phone: "+39 380 2345678",
      address: "Via Blu 3033, 00600 Venezia",
    },
  },
];
