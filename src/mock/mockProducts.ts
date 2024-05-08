import { typeProduct } from "../types/typeOrder";

export const mockProducts: typeProduct[] = [
  {
    productID: "PROD-9012",
    name: "Pizza Margherita",
    description: "Classic pizza with tomato sauce and mozzarella cheese.",
    ingredients: ["Tomato sauce", "Mozzarella cheese"],
  },
  {
    productID: "PROD-3456",
    name: "Hamburger",
    description:
      "All-beef patty with lettuce, tomato, and onion on a toasted bun.",
    ingredients: ["Beef patty", "Lettuce", "Tomato", "Onion", "Bun"],
  },
  {
    productID: "PROD-7890",
    name: "Salmone alla Griglia",
    description:
      "Filetto di salmone norvegese grigliato con contorno di verdure miste.",
    ingredients: [
      "Filetto di salmone norvegese",
      "Verdure miste (zucchine, peperoni, melanzane)",
      "Olio extravergine d'oliva",
      "Sale",
      "Pepe",
    ],
  },
  {
    productID: "PROD-1234",
    name: "Spaghetti Carbonara",
    description:
      "Classico piatto romano con spaghetti, guanciale, pecorino romano, uova e pepe nero.",
    ingredients: [
      "Spaghetti",
      "Guanciale",
      "Pecorino romano",
      "Uova",
      "Pepe nero",
      "Sale",
    ],
  },
];
