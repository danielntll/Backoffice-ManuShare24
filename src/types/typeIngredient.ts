import { typeIngredientManagment } from "./typeIngredientManagment";
import { typeIngredientStoricoForniture } from "./typeIngredientStoricoForniture";

export type typeIngredient = {
  ingredientID?: string;
  data: {
    nome: string;
    marca?: string;
    descrizione?: string;
    immagineUrl?: string;
  };
  managment?: typeIngredientManagment;
  storico_forniture?: typeIngredientStoricoForniture[];
};
