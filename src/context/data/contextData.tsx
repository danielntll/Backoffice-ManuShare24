import React, { useContext, useEffect, useState } from "react";
import { ContextLanguage } from "../contextLanguage";
import { AuthContext } from "../contextAuth";
import { typeIngredient } from "../../types/typeIngredient";
import { typeAttivita } from "../../types/typeAttivita";
import { serviceGetAllAttivita } from "../../services/attivita/service_get_all_attivita";
import { serviceCreateIngredient } from "../../services/ingredients/service_create_ingredient";
import { ContextToast } from "../contextToast";
import { textDataContext } from "../../text/textDataContext";
import { IngredientsContextProvider } from "./contextIngredienti";

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
  // USE EFFECT ------------------------------
  useEffect(() => {
    if (authenticateUser !== undefined) {
      getAllAttivita();
    }
  }, [authenticateUser]);
  // FUNCTIONS ------------------------------

  // ---  getAllAttivita
  /**
   *
   */
  const getAllAttivita = async () => {
    setAttivita(await serviceGetAllAttivita(authenticateUser!.uid));
  };

  // RETURN ---------------------------------
  return (
    <DataContext.Provider value={{ attivita }}>
      <IngredientsContextProvider>{children}</IngredientsContextProvider>
    </DataContext.Provider>
  );
};
