import { collection, doc, setDoc } from "firebase/firestore";
import { typeIngredient } from "../../types/typeIngredient";
import { db } from "../../firebase/firebaseConfig";

/**
 * Questa funzione permette di caricare un ingrediente sul DB e ritorna
 * l'ingrediente compreso di UID
 *
 * @param ingredient : typeIngredient - L'ingrediente da caricare sul DB
 * @returns Promise<typeIngredient | null> - L'oggetto dell'ingrediente creato compreso di UID o NULL
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
