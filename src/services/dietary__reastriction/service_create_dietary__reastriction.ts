import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import { typeDietaryRestictions } from "../../db/typeDietaryRestictions";

/**
 * Crea un nuovo dietaryRestrictione nel database Firestore.
 *
 * @param dietaryRestriction typeDietaryRestictions - L'dietaryRestrictione da creare.
 * @returns typeDietaryRestictions | null - L'dietaryRestrictione creato, oppure null se si è verificato un errore.
 */
export const serviceCreateDietaryRestictions = async (
  dietaryRestriction: typeDietaryRestictions
): Promise<typeDietaryRestictions | null> => {
  try {
    // Prendo il nome della tabella sul DB
    const path = import.meta.env.VITE_SITE_FIREBASE_PATH_DIETARY_RESTRICTION;
    // Creo uno spazio sul DB
    const newRef = doc(collection(db, path!));
    // Assegno l'UID di quello spazio all'dietaryRestrictione da aggiungere
    dietaryRestriction.UID = newRef.id;
    // Carico l'dietaryRestrictione sul DB
    await setDoc(newRef, dietaryRestriction);
    // Ritorno l'dietaryRestrictione creato
    return dietaryRestriction;
  } catch (error) {
    return null;
  }
};
