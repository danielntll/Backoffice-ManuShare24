import React, { useContext, useEffect, useState } from "react";
import { ContextLanguage } from "../contextLanguage";
import { AuthContext } from "../contextAuth";
import { typeIngredient } from "../../types/typeIngredient";
import { typeAttivita } from "../../types/typeAttivita";
import { serviceGetAllAttivita } from "../../services/attivita/service_get_all_attivita";
import { serviceCreateIngredient } from "../../services/ingredients/service_create_ingredient";
import { ContextToast } from "../contextToast";
import { textDataContext } from "../../text/textDataContext";

type ingredientsContext = {
  ingredients: typeIngredient[];
};

export const IngredientsContext = React.createContext<ingredientsContext>({
  ingredients: [],
});

export const useIngredientsContext = () => React.useContext(IngredientsContext);

export const IngredientsContextProvider = ({ children }: any) => {
  // VARIABLES ------------------------------
  const { l } = useContext(ContextLanguage);
  const { authenticateUser } = useContext(AuthContext);
  const { toast } = useContext(ContextToast);
  // USE STATE -----------------------------
  const [ingredients, setIngredients] = useState<typeIngredient[]>([]);
  // USE EFFECT ------------------------------
  // FUNCTIONS ------------------------------

  /**
   * Questa funzione serve per caricare l'ingrediente sul database
   * ed aggiungere una copia in locale
   *
   * @param ingredientToUpload typeIngredient - L'ingrediente da caricare
   *
   */
  const createIngredient = async (
    ingredientToUpload: typeIngredient
  ): Promise<boolean> => {
    //STEP 1
    /**
     * Eseguire la funzione service per il caricamento che ritorna
     * l'ingrediente compreso di UID
     *
     */
    const ingredienteCaricato = await serviceCreateIngredient(
      ingredientToUpload
    );

    //CASE 1
    //  SE la funzione di caricamento non ha tornato null.
    if (ingredienteCaricato !== null) {
      //ALLORA
      //  Aggiungi il dato anche localmente
      setIngredients([...ingredients, ingredienteCaricato]);
      //  Ritorna TRUE perchè l'esito è stato positivo
      return true;
    } else {
      //OPPURE
      //  Avvisa che l'esito è stato negativo
      toast("danger", textDataContext[l].ingredient.fail__upload);
      //  Ritorna FALSE perchè l'esito è stato negativo
      return false;
    }
  };
  // RETURN ---------------------------------
  return (
    <IngredientsContext.Provider value={{ ingredients }}>
      {children}
    </IngredientsContext.Provider>
  );
};
