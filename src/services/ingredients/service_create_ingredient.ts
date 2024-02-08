import { collection, doc, setDoc } from "firebase/firestore";
import { typeIngredient } from "../../types/typeIngredient";
import { db } from "../../firebase/firebaseConfig";

/**
 * Questa funzione carica un ingrediente sul DB
 *
 * @param ingredient : typeIngredient - L'ingrediente da caricare sul DB
 * @returns Promise<typeIngredient | null> - L'oggetto dell'ingrediente creato o NULL
 */
export const serviceCreateIngredient = async (
  ingredient: typeIngredient
): Promise<typeIngredient | null> => {
  try {
    //Prendo il nome della tabella sul DB
    const ingredientsPath = import.meta.env.VITE_SITE_FIREBASE_PATH_INGREDIENTI;
    //Creo uno spazio sul DB
    const newIngredientRef = doc(collection(db, ingredientsPath!));
    //Assegno l'UID di quello spazio all'ingrediente da aggiungere
    ingredient.uid = newIngredientRef.id;
    //Carico l'ingrediente sul DB
    await setDoc(newIngredientRef, ingredient);
    //Rerturn Ingrediente Creato
    return ingredient;
  } catch (error) {
    console.log("serviceCreateIngredient:", error);
    return null;
  }
};
