import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { typeDietaryRestictions } from "../../db/typeDietaryRestictions";

/**
 * Recupera un Dietary Restriction dal database Firestore in base al suo UID.
 *
 * @param dataUID string - L'UID dell'Dietary Restriction da cercare.
 * @returns typeDietaryRestictions | undefined - L'Dietary Restriction trovato, oppure undefined se non è stato trovato.
 */
export const serviceGetDietaryRestrictionByUID = async (
  dataUID: string
): Promise<typeDietaryRestictions | undefined> => {
  try {
    //Prendo il nome della tabella sul DB
    const path = import.meta.env.VITE_SITE_FIREBASE_PATH_DIETARY_RESTRICTION;
    //Definisco il percorso del dato
    const docRef = doc(db, path, dataUID);
    //Eseguo la query
    const docSnap = await getDoc(docRef);
    //Converto il risultato della query
    const data: any = docSnap.data();
    //Ritorno il risultato
    return data;
  } catch (error) {
    console.log("serviceGetDietaryRestrictionByUID:", error);
    return undefined;
  }
};
