import React, { useContext, useEffect, useState } from "react";

import { ContextLanguage } from "./contextLanguage";
import { typeAttivita } from "../types/typeCreateAttivita";
import { AuthContext } from "./contextAuth";
import { getAllAttivitaAPI } from "../pages/Attivita/Dashboard/api";
import { typeIngredient } from "../types/typeIngredient";

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
  // CONDITIONS -----------------------------
  const [attivita, setAttivita] = useState<typeAttivita[]>([]);
  const [ingredienti, setIngredienti] = useState<typeIngredient[]>([]);
  // FUNCTIONS ------------------------------
  useEffect(() => {
    if (authenticateUser !== undefined) {
      getAllAttivita();
    }
  }, [authenticateUser]);
  // FUNCTIONS ------------------------------
  const getAllAttivita = async () => {
    setAttivita(await getAllAttivitaAPI(authenticateUser!.uid));
  };
  // EXTRA UI -------------------------------
  // RETURN ---------------------------------
  return (
    <DataContext.Provider value={{ attivita }}>{children}</DataContext.Provider>
  );
};
