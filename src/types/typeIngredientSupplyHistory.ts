import { typeIngredientSupplier } from "./typeIngredientSupplier";
import { typeIngredientSupplyStatus } from "./typeIngredientSupplyStatus";

export type typeIngredientSupplyHistory = {
  ingredientSupplyHistoryID?: string; // L'ID di questo storico di rifornimento registrato sul DB
  supplyStatuses: typeIngredientSupplyStatus[]; // I vari stati registrati su questa richiesta di rifornimento serve per creare uno storico
  createdAt: number; // Data di creazione del rifornimento
  ingredientRequiredID: string; // L'ID dell'ingrediente richiesto nel rifornimento
  quantity?: number; // Quantità richiesta nel rifornimento
  unit: string; // Unità di misura richiesta nel rifornimento es: (es: kg, g, l, pz)
  pricePerUnit?: number; // Prezzo unitario del rifornimento
  priceTotal?: number; // Prezzo totale del rifornimento
  supplier: typeIngredientSupplier; // Fornitore del rifornimento
};
