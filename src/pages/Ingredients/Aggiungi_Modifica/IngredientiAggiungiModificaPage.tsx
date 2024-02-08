import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { text } from "./text";

import styles from "./IngredientiAggiungiModificaPage.module.css";
import { useContext, useEffect, useState } from "react";
import { textButtons } from "../../../text/textButtons";
import { route_IngredientiDashboardPage } from "../../../routes/singleRoute";
import { useParams } from "react-router";
import { ContextLanguage } from "../../../context/contextLanguage";
import { typeIngredient } from "../../../types/typeIngredient";
import ImageUploader from "../../../components/Image__Uploader/ImageUploader";

interface PageProps {}

const IngredientiAggiungiModificaPage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const { id } = useParams<{ id: string }>();
  //CONDITIONS -----------------------
  const [idIngrediente, setIdIngrediente] = useState<string>("");
  const [ingredient, setIngredient] = useState<typeIngredient>();
  // -- ingrediente
  const [nome, setNome] = useState<string>(""); //MAX: 140 char
  const [descrizione, setDescrizione] = useState<string>("");
  const [marca, setMarca] = useState<string>("");
  const [immagineBASE64, setImmagineBASE64] = useState<string>("");
  const [immagineURL, setImmagineURL] = useState<string>("");
  const [languageCode, setLanguageCode] = useState<string>("");

  //FUNCTIONS ------------------------
  useEffect(() => {
    if (id !== "nuovo") {
      setIdIngrediente(id);
      fetchIngredienteByID(id);
    }
  }, [id]);
  // --- fetchIngredienteByID
  const fetchIngredienteByID = async (idIng: string) => {
    console.log("fetchIngredienteByID() - id=", idIng);
  };
  // --- inputs

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
              {/* ----  description ----- */}
              <IonItem>
                <IonTextarea
                  required
                  label={text[l].input__description.label}
                  placeholder={text[l].input__description.ph}
                  labelPlacement="stacked"
                  value={descrizione}
                  autoGrow={true}
                  onIonInput={(e) => setDescrizione(e.detail.value!)}
                />
              </IonItem>
            </IonList>
            {/* OPZIONALE */}
            <ImageUploader />
          </IonCard>
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default IngredientiAggiungiModificaPage;
