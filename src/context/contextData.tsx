import React, { useContext, useEffect, useState } from "react";

import { ContextLanguage } from "./contextLanguage";
import { AuthContext } from "./contextAuth";
import { typeIngredient } from "../types/typeIngredient";
import { typeAttivita } from "../types/typeAttivita";
import { serviceGetAllAttivita } from "../services/attivita/service_get_all_attivita";
import { serviceCreateIngredient } from "../services/ingredients/service_create_ingredient";
import { ContextToast } from "./contextToast";
import { textDataContext } from "../text/textDataContext";

type dataContext = {
  attivita: typeAttivita[];
};

export const DataContext = React.createContext<dataContext>({
  attivita: [],
});

export const useDataContext = () => React.useContext(DataContext);

export const DataContextProvider = ({ children }: any) => {
  // VARIABLES ------------------------------
  const { l } = useContext(ContextLanguage);
  const { authenticateUser } = useContext(AuthContext);
  const { toast } = useContext(ContextToast);
  // USE STATE -----------------------------
  const [attivita, setAttivita] = useState<typeAttivita[]>([]);
  const [ingredienti, setIngredienti] = useState<typeIngredient[]>([]);
  // USE EFFECT ------------------------------
  useEffect(() => {
    if (authenticateUser !== undefined) {
      getAllAttivita();
    }
  }, [authenticateUser]);
  // FUNCTIONS ------------------------------
  const getAllAttivita = async () => {
    setAttivita(await serviceGetAllAttivita(authenticateUser!.uid));
  };

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
    //  Eseguire la funzione service per il caricamento
    const uploadedIngredient = await serviceCreateIngredient(
      ingredientToUpload
    );

    //CASE 1
    //  SE la funzione di caricamento non ha tornato null.
    if (uploadedIngredient !== null) {
      //ALLORA
      //  Aggiungi il dato anche localmente
      setIngredienti([...ingredienti, uploadedIngredient]);
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
  // EXTRA UI -------------------------------
  // RETURN ---------------------------------
  return (
    <DataContext.Provider value={{ attivita }}>{children}</DataContext.Provider>
  );
};
