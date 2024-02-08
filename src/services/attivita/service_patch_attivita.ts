import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { typeAttivita } from "../../types/typeAttivita";

/**
 * Questa funzione aggiorna i dati di un'attività e ritorna l'attività
 * aggiornata oppure null nel caso di esito negativo.
 *
 * @param newAttivita typeAttivita - L'oggetto dell'attività con i dati aggiornati
 * @returns typeAttivita | null
 */
export const servicePatchAttivita = async (
  newAttivita: typeAttivita
): Promise<typeAttivita | null> => {
  try {
    //Prendo il nome della tabella sul DB
    const attivitaPath = import.meta.env.VITE_SITE_FIREBASE_PATH_ATTIVITA;
    //Creazione riferimento DB
    const attivitaRef = doc(db, attivitaPath, attivitaPath.uid);
    //Aggiorno il documento
    await setDoc(attivitaRef, newAttivita, { merge: true });
    //Ritorno l'attività
    return newAttivita;
  } catch (error) {
    console.error("servicePatchAttivita:", error);
    return null;
  }
};
