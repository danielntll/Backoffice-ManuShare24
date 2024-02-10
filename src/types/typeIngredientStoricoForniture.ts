import { typeIngredientFornitore } from "./typeIngredientFornitore";

export type typeIngredientStoricoForniture = {
  uid?: string;
  createdAt: number;
  prodottoUID: string;
  quantita?: number;
  prezzo?: number;

  fornitore: typeIngredientFornitore;
};
