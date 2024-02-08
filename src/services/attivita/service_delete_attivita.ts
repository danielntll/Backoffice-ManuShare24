import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * Questa funzione elimina un'attività dato la sua UID e ritorna
 * un booleano che indica l'esito dell'operazione.
 *
 * @param attitivitaUID string - L'UID dell'attività da eliminare
 * @returns boolean
 */
export const serviceDeleteAttivita = async (
  attitivitaUID: string
): Promise<boolean> => {
  try {
    //Prendo il nome della tabella sul DB
    const attivitaPath = import.meta.env.VITE_SITE_FIREBASE_PATH_ATTIVITA;
    //Elimino l'attività dal DB
    await deleteDoc(doc(db, attivitaPath, attitivitaUID));
    //Return dello status
    return true;
  } catch (error) {
    console.error("serviceDeleteAttivita: ", error);
    return false;
  }
};
