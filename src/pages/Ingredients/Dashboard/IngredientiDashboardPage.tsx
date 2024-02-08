import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { text } from "./text";

import styles from "./IngredientiDashboardPage.module.css";
import { add } from "ionicons/icons";
import { useHistory } from "react-router";
import { route_IngredientiAggiungiModificaPage } from "../../../routes/singleRoute";
import { textButtons } from "../../../text/textButtons";
import { ContextLanguage } from "../../../context/contextLanguage";
import { useContext } from "react";

interface PageProps {}

const IngredientiDashboardPage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const history = useHistory();
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  const handleGoToAddPage = () => {
    history.push(route_IngredientiAggiungiModificaPage.path + "/nuovo");
  };
  //RETURN COMPONENT -----------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{text[l].pageTitle}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              fill="solid"
              color={"primary"}
              onClick={handleGoToAddPage}
            >
              {textButtons[l].btn__aggiungi}
              <IonIcon icon={add} className="icon-margin-left" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{text[l].pageTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* ----------------- PAGE CONTENT ------------------*/}
        <div className={styles.content + " ion-padding"}></div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default IngredientiDashboardPage;
