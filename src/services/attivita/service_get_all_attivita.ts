import { collection, getDocs, query, where } from "firebase/firestore";
import { typeAttivita } from "../../types/typeAttivita";
import { db } from "../../firebase/firebaseConfig";

/**
 * Questa funzione cerca sul DB tutte le attività create dall'utente
 * tramite il suo userUID e ritorna un'array.
 * Se non c'è nessuna attività ritorna un array vuoto.
 *
 * @param userUID string - L'UID del utente autenticato
 * @returns typeAttivita[] - Array delle attività trovate
 */
export const getAllAttivitaAPI = async (
  userUID: string
): Promise<typeAttivita[]> => {
  //Prendo il nome della tabella sul DB
  const attivitaPath = import.meta.env.VITE_SITE_FIREBASE_PATH_ATTIVITA;
  //Definisco un array di aiuto
  const attivitaTrovate: typeAttivita[] = [];
  //Compongo la query per firebase
  const q = query(
    collection(db, attivitaPath),
    where("createdBy", "==", userUID)
  );
  //Eseguo la query
  const querySnapshot = await getDocs(q);
  //Per ogni risultato trovato dalla query
  querySnapshot.forEach((doc) => {
    //Converto il dato e lo aggiungo all'array
    const attivita: any = doc.data();
    attivitaTrovate.push(attivita);
  });
  //Ritorno dell'array
  return attivitaTrovate;
};
