import { doc, getDoc } from "firebase/firestore";
import { typeAttivita } from "../../types/typeAttivita";
import { db } from "../../firebase/firebaseConfig";

/**
 * Questa funzione cerca sul DB un'attività data la sua UID
 * e ritorna l'oggetto oppure undefined nel caso di nessun
 * risultato trovato.
 *
 * @param attitivitaUID string - L'UID dell'attività da cercare
 * @returns typeAttivita | undefined
 */
export const serviceGetAttivita = async (
  attitivitaUID: string
): Promise<typeAttivita | undefined> => {
  try {
    //Prendo il nome della tabella sul DB
    const attivitaPath = import.meta.env.VITE_SITE_FIREBASE_PATH_ATTIVITA;
    //Definisco il percorso del dato
    const docRef = doc(db, attivitaPath, attitivitaUID);
    //Eseguo la query
    const docSnap = await getDoc(docRef);
    //Converto il risultato della query
    const auxAttivita: any = docSnap.data();
    //Ritorno il risultato
    return auxAttivita;
  } catch (error) {
    console.log("serviceGetAttivita:", error);
    return undefined;
  }
};
