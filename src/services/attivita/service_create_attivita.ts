import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { typeAttivita } from "../../types/typeAttivita";

/**
 * Questa funzione carica un'attività sul DB
 *
 * @param titleAttivita - In nome dell'attività inserito dal utente
 * @param userUID - Il UserUID del utente autenticato
 * @returns Promise<typeAttivita | null> - Oggetto dell'attività creata o NULL
 */

export const serviceCreateAttivita = async (
  titleAttivita: string,
  userUID: string
): Promise<typeAttivita | null> => {
  try {
    //Prendo il nome della tabella sul DB
    const attivitaPath = import.meta.env.VITE_SITE_FIREBASE_PATH_ATTIVITA;
    //Creo uno spazio sul DB
    const newAttivitaRef = doc(collection(db, attivitaPath!));
    //Creo l'oggetto dell'attività
    const attivitaObject: typeAttivita = {
      UID: newAttivitaRef.id,
      title: titleAttivita,
      createdAt: Date.now(),
      createdBy: userUID,
      status: "Offline",
      menuUID: null,
    };
    // Carico l'attività sul DB
    await setDoc(newAttivitaRef, attivitaObject);
    // Return attività creata
    return attivitaObject;
  } catch (error) {
    console.error("serviceCreateAttivita:", error);
    return null;
  }
};
