import { typeIngredientManagment } from "./typeIngredientManagment";
import { typeIngredientSupplyHistory } from "./typeIngredientSupplyHistory";

export type typeIngredient = {
  ingredientID?: string;
  data: {
    nome: string;
    marca?: string;
    descrizione?: string;
    immagineUrl?: string;
  };
  managment?: typeIngredientManagment;
  supplyHistory?: typeIngredientSupplyHistory[];
};
