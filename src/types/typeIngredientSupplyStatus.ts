export type typeIngredientSupplyStatus = {
  ingredientSupplyStatusID: string; // L'ID di creazione sul Database
  createdAt: number; // Data di creazione
  from: "consumer" | "supplier"; // Il tipo di utente che ha registrato questo evento: il ristoratore o il fornitore
  userID: string; // L'ID dell'utente che ha registrato questo evento
  ingredientID: string; // L'ID del ingrediente/prodotto a cui si riferisce questo status. Potrebbe servire nel caso si rigistrassero tutti questi record in una tabella a parte, per poter avere una gestione di conteggio e status generico più precisa.
};
