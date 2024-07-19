import { doc, getDoc } from "firebase/firestore";
import { typeAttivita } from "../../types/typeAttivita";
import { db } from "../../firebase/firebaseConfig";
import { typeAllergens } from "../../db/typeAllergens";

/**
 * Recupera un allergene dal database Firestore in base al suo UID.
 *
 * @param dataUID string - L'UID dell'allergene da cercare.
 * @returns typeAllergens | undefined - L'allergene trovato, oppure undefined se non è stato trovato.
 */
export const serviceGetAllergensByUID = async (
  dataUID: string
): Promise<typeAllergens | undefined> => {
  try {
    //Prendo il nome della tabella sul DB
    const path = import.meta.env.VITE_SITE_FIREBASE_PATH_ATTIVITA;
    //Definisco il percorso del dato
    const docRef = doc(db, path, dataUID);
    //Eseguo la query
    const docSnap = await getDoc(docRef);
    //Converto il risultato della query
    const data: any = docSnap.data();
    //Ritorno il risultato
    return data;
  } catch (error) {
    console.log("serviceGetAllergensByUID:", error);
    return undefined;
  }
};
