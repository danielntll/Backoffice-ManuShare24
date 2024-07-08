import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTextarea,
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
import ImageUploader from "../../../components/Image__Uploader/ImageUploader";
import { ContextToast } from "../../../context/contextToast";
import { cloudUpload } from "ionicons/icons";

const IngredientsAddAndModifyPage: React.FC = () => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const { id } = useParams<{ id: string }>();
  const { toast } = useContext(ContextToast);
  //USE STATE -----------------------
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
   */
  useEffect(() => {
    if (id !== "nuovo") {
      fetchIngredienteByID(id);
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
          <IonTitle>
            {id !== "nuovo" ? text[l].pageTitleModify : text[l].pageTitleAdd}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {id !== "nuovo" ? text[l].pageTitleModify : text[l].pageTitleAdd}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* ----------------- PAGE CONTENT ------------------*/}
        <div className={styles.content}>
          <form onSubmit={handleUploadIngredient}>
            {/* --- Action Buttons ---- */}
            <div className={styles.container__action}>
              <IonButton
                onClick={handleUploadIngredient}
                fill="solid"
                color={"tertiary"}
              >
                {textButtons[l].btn__upload_exit}
                <IonIcon className="icon-margin-left" icon={cloudUpload} />
              </IonButton>
              <IonButton
                onClick={handleUploadIngredient}
                fill="solid"
                color={"primary"}
              >
                {textButtons[l].btn__upload_new}
                <IonIcon className="icon-margin-left" icon={cloudUpload} />
              </IonButton>
            </div>
            {/* --- Form --- */}
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>{text[l].cardSubtitle}</IonCardSubtitle>
              </IonCardHeader>
              {/* OBBLIGATORIO */}
              <IonList inset>
                {/* ----  displayName ----- */}
                <IonItem>
                  <IonInput
                    required
                    clearInput
                    label={text[l].input__displayName.label}
                    placeholder={text[l].input__displayName.ph}
                    labelPlacement="stacked"
                    type={"text"}
                    value={nome}
                    counter={true}
                    maxlength={140}
                    helperText={text[l].input__displayName.help}
                    onIonInput={(e) => setNome(e.detail.value!)}
                  />
                </IonItem>
              </IonList>
              {/* OPZIONALE */}
              <IonList inset>
                <IonListHeader>
                  <IonLabel>{text[l].optional_list_title}</IonLabel>
                </IonListHeader>
                {/* ----  marca ----- */}
                <IonItem>
                  <IonInput
                    required
                    clearInput
                    label={text[l].input__marca.label}
                    placeholder={text[l].input__marca.ph}
                    labelPlacement="stacked"
                    type={"text"}
                    value={marca}
                    onIonInput={(e) => setMarca(e.detail.value!)}
                  />
                </IonItem>
                {/* ----  description ----- */}
                <IonItem>
                  <IonTextarea
                    label={text[l].input__description.label}
                    placeholder={text[l].input__description.ph}
                    labelPlacement="stacked"
                    value={descrizione}
                    autoGrow={true}
                    onIonInput={(e) => setDescrizione(e.detail.value!)}
                  />
                </IonItem>
              </IonList>

              <IonLabel>
                <p className="ion-padding-horizontal">
                  {text[l].input__description.help}
                </p>
              </IonLabel>

              {/* --------- IMMAGINI --------- */}
              <ImageUploader />
            </IonCard>
          </form>
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default IngredientsAddAndModifyPage;
