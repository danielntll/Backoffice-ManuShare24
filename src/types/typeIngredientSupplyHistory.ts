import { typeIngredientFornitore } from "./typeIngredientFornitore";
import { typeIngredientSupplyStatus } from "./typeIngredientSupplyStatus";

export type typeIngredientSupplyHistory = {
  ingredientSupplyHistoryID?: string; // L'ID di questo storico di rifornimento registrato sul DB
  supplyStatuses: typeIngredientSupplyStatus[]; // I vari stati registrati su questa richiesta di rifornimento
  createdAt: number; // Data di creazione del rifornimento
  ingredientRequiredID: string; // L'ID dell'ingrediente richiesto nel rifornimento
  quantita?: number; // Quantità richiesta nel rifornimento
  prezzo?: number; // Prezzo unitario del rifornimento
  prezzoTotale?: number; // Prezzo totale del rifornimento
  fornitore: typeIngredientFornitore; // Fornitore del rifornimento
};
