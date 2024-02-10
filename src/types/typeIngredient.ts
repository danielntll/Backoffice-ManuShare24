import { typeIngredientManagment } from "./typeIngredientManagment";
import { typeIngredientStoricoForniture } from "./typeIngredientStoricoForniture";

export type typeIngredient = {
  uid?: string;
  data: {
    nome: string;
    marca?: string;
    descrizione?: string;
    immagineUrl?: string;
  };
  managment?: typeIngredientManagment;
  storico_forniture?: typeIngredientStoricoForniture[];
};
