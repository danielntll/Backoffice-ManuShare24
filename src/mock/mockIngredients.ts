import { typeIngredient } from "../types/typeIngredient";

export const mockIngredients: typeIngredient[] = [
  {
    ingredientID: "123",
    data: {
      nome: "Farina",
      marca: "Barilla",
      descrizione: "Farina di grano tenero tipo 00",
      immagineUrl: "https://example.com/farina.jpg",
    },
    managment: {
      data_scadenza: 1677283200, // 23 giugno 2023
      quantita: 100,
      prezzo_vendita: 2.5,
      limite: 110,
    },
    storico_forniture: [
      {
        uid: "abc",
        createdAt: 1677283200, // 23 giugno 2023
        prodottoUID: "123",
        quantita: 50,
        prezzo: 1.5,
        fornitore: {
          uid: "xyz",
          data: {
            nome: "Fornitore A",
            telefono: 123456789,
            email: "fornitoreA@example.com",
          },
        },
      },
      {
        uid: "def",
        createdAt: 1677369600, // 24 giugno 2023
        prodottoUID: "123",
        quantita: 50,
        prezzo: 1.7,
        fornitore: {
          uid: "uvw",
          data: {
            nome: "Fornitore B",
            telefono: 987654321,
            email: "fornitoreB@example.com",
          },
        },
      },
    ],
  },
  {
    ingredientID: "456",
    data: {
      nome: "Pomodori",
      marca: "San Marzano",
      descrizione: "Pomodori pelati a pezzi",
      immagineUrl: "https://example.com/pomodori.jpg",
    },
    managment: {
      data_scadenza: 1680192000, // 27 settembre 2023
      quantita: 80,
      prezzo_vendita: 3,
      limite: 110,
    },
    storico_forniture: [
      {
        uid: "ghi",
        createdAt: 1680192000, // 27 settembre 2023
        prodottoUID: "456",
        quantita: 40,
        prezzo: 2,
        fornitore: {
          uid: "rst",
          data: {
            nome: "Fornitore C",
            telefono: 111222333,
            email: "fornitoreC@example.com",
          },
        },
      },
      {
        uid: "jkl",
        createdAt: 1680278400, // 28 settembre 2023
        prodottoUID: "456",
        quantita: 40,
        prezzo: 2.2,
        fornitore: {
          uid: "opq",
          data: {
            nome: "Fornitore D",
            telefono: 444555666,
            email: "fornitoreD@example.com",
          },
        },
      },
    ],
  },
  {
    ingredientID: "789",
    data: {
      nome: "Zucchine",
      descrizione: "Zucchine italiane fresche",
      immagineUrl: "https://example.com/zucchine.jpg",
    },
    managment: {
      data_scadenza: 1684608000, // 20 gennaio 2024
      quantita: 120,
      prezzo_vendita: 1.8,
      limite: 121,
    },
    storico_forniture: [
      {
        uid: "mno",
        createdAt: 1684608000, // 20 gennaio 2024
        prodottoUID: "789",
        quantita: 60,
        prezzo: 1.2,
        fornitore: {
          uid: "uvw",
          data: {
            nome: "Fornitore B",
            telefono: 987654321,
            email: "fornitoreB@example.com",
          },
        },
      },
      {
        uid: "pqr",
        createdAt: 1684694400, // 21 gennaio 2024
        prodottoUID: "789",
        quantita: 60,
        prezzo: 1.4,
        fornitore: {
          uid: "xyz",
          data: {
            nome: "Fornitore A",
            telefono: 123456789,
            email: "fornitoreA@example.com",
          },
        },
      },
    ],
  },
];
