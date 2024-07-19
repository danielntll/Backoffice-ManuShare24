import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { text } from "./text";

import styles from "./IngredientsAddAndModifyPage.module.css";
import { useContext, useEffect, useState } from "react";
import { textButtons } from "../../../text/textButtons";
import { route_IngredientiDashboardPage } from "../../../routes/singleRoute";
import { useParams } from "react-router";
import { ContextLanguage } from "../../../context/contextLanguage";
import { typeIngredient } from "../../../types/typeIngredient";
import { ContextToast } from "../../../context/contextToast";
import SectionInfoIngredient from "../../../components/Section__Info__Ingredient/SectionInfoIngredient";
import SectionInventoryIngredient from "../../../components/Section__Inventory__Ingredient/SectionInventoryIngredient";

const IngredientsAddAndModifyPage: React.FC = () => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const { toast } = useContext(ContextToast);

  // --- useParams
  /**
   * Serve per prendere dal indirizzo URL l'ID dell'ingrediente da modificare.
   *
   * SE l'ID corrisponde a "nuovo" allora è un nuovo ingrediente.
   * Questo controllo viene fatto nel useEffect
   */

  const { id } = useParams<{ id: string }>();
  //USE STATE -----------------------

  // --- segment
  /**
   * Questa variabile rappresenta il pannel da visualizzare
   * tra:
   * - "details": dove modificare tutte le informazioni dell'ingrediente
   * - "inventory": dove modificare le informazioni dell'inventario
   */
  const [segment, setSegment] = useState<string>("details");

  // --- pageTitle
  /**
   * Questa variabile rappresenta il titolo della pagina:
   *
   * Può essere o "Modifica" o "Aggiungi" e viene calcolato
   * nel useEffect.
   */
  const [pageTitle, setPageTitle] = useState<string>(text[l].pageTitleAdd);

  const [idIngrediente, setIdIngrediente] = useState<string | undefined>(
    undefined
  );
  const [ingredient, setIngredient] = useState<typeIngredient>();
  // -- ingrediente
  const [nome, setNome] = useState<string | undefined>(undefined); //MAX: 140 char
  const [descrizione, setDescrizione] = useState<string | undefined>(undefined);
  const [marca, setMarca] = useState<string | undefined>(undefined);
  const [immaginiURL, setImmaginiURL] = useState<any | undefined>(undefined);
  const [languageCode, setLanguageCode] = useState<string | undefined>(
    undefined
  );

  //USE EFFECT ------------------------
  // ---
  /**
   * Questo useEffect si occupa di controllare se
   * il percorso di questa pagina contiene o no la
   * stringa "nuovo".
   * SE no ALLORA questa pagina è in modalità modifica
   * quindi deve fare una fetch dell'ingrediente con
   * l'ID trovato nella path.
   *
   * Definisce anche il titolo della pagina
   */
  useEffect(() => {
    if (id !== "nuovo") {
      fetchIngredienteByID(id);
      setPageTitle(text[l].pageTitleAdd);
    } else {
      setPageTitle(text[l].pageTitleModify);
    }
  }, [id]);

  //FUNZIONI ---------------------------
  // --- fetchIngredienteByID
  /**
   * Metodo che serve per useguire la ricerca dell'ingrediente tramite
   * il ContextData.
   *
   * @param ingredienteUID String - l'UID dell'ingrediente da cercare.
   */
  const fetchIngredienteByID = async (ingredienteUID: string) => {
    //STEP 1
    //  Controllare tra tutti gli ingredienti disponibili quello
    //  con questo UID
    const ingredientFound: typeIngredient | null = null;

    //CASE 1
    //  SE l'ingrediente è stato trovato
    if (ingredientFound != null) {
      //ALLORA
      //  Assegna tutti gli useState con i dati dell'ingrediente.
    } else {
      //OPPURE
      //  Avvisa che l'ingrediente non è stato trovato.
      toast("warning", text[l].toast.not__found);
    }
  };

  // --- handleUploadIngredient
  /**
   * Questo metodo serve per controllare se i dati necessari
   * alla creazione dell'ingrediente sono presenti e
   * successivamente usa il metodo di ContextData per
   * caricare l'ingrediente sul database e salvare una copia
   * nel dati locali.
   *
   * @param
   */
  const handleUploadIngredient = async (e: any) => {
    //STEP 1
    //  Evitare di far ricare la pagina
    e.preventDefault();

    //CASE 1
    //  SE i dati necessari sono presenti
    if (nome !== undefined) {
      //ALLORA
      //  Inizia il caricamento delle immagini su Storage

      //  Componi l'oggetto ingrediente ed effettua il caricamento
      const ingredientToUpload: typeIngredient = {
        data: {
          nome: nome,
          marca: marca,
          descrizione: descrizione,
          immagineUrl: immaginiURL,
        },
      };
    } else {
      //OPPURE
      //  Manda un avviso di warning
      toast("warning", text[l].toast.no__data);
    }
  };

  //RETURN COMPONENT -----------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={textButtons[l].btn__back}
              defaultHref={route_IngredientiDashboardPage.path}
            />
          </IonButtons>
          <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            value={segment}
            onIonChange={(e) => setSegment(e.target.value?.toString() ?? "")}
          >
            <IonSegmentButton value="details">
              {text[l].segments.details}
            </IonSegmentButton>
            <IonSegmentButton value="inventory">
              {text[l].segments.inventory}
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{pageTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* ----------------- PAGE CONTENT ------------------*/}
        {segment === "details" && <SectionInfoIngredient />}
        {segment === "inventory" && <SectionInventoryIngredient />}
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default IngredientsAddAndModifyPage;
