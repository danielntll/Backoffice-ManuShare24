import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { typeAllergens } from "../../db/typeAllergens";

/**
 * Crea un nuovo allergene nel database Firestore.
 *
 * @param allergen typeAllergens - L'allergene da creare.
 * @returns typeAllergens | null - L'allergene creato, oppure null se si è verificato un errore.
 */
export const serviceCreateAllergens = async (
  allergen: typeAllergens
): Promise<typeAllergens | null> => {
  try {
    // Prendo il nome della tabella sul DB
    const path = import.meta.env.VITE_SITE_FIREBASE_PATH_ALLERGENS;
    // Creo uno spazio sul DB
    const newRef = doc(collection(db, path!));
    // Assegno l'UID di quello spazio all'allergene da aggiungere
    allergen.UID = newRef.id;
    // Carico l'allergene sul DB
    await setDoc(newRef, allergen);
    // Ritorno l'allergene creato
    return allergen;
  } catch (error) {
    return null;
  }
};
