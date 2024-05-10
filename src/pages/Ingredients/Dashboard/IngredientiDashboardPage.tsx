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
import { useHistory, useLocation } from "react-router";
import { route_IngredientiAggiungiModificaPage } from "../../../routes/singleRoute";
import { textButtons } from "../../../text/textButtons";
import { ContextLanguage } from "../../../context/contextLanguage";
import { useContext, useEffect, useState } from "react";
import { appRoutes } from "../../../routes/routes";
import { typeRoute } from "../../../types/typeRoute";

interface PageProps {}

const IngredientiDashboardPage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const history = useHistory();
  const location = useLocation();
  //CONDITIONS -----------------------
  const [pageName, setPageName] = useState<string | undefined>("");

  useEffect(() => {
    setPageName(
      appRoutes.find((route: typeRoute) => route.path === location.pathname)
        ?.tab[l]
    );
  }, [location]);
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
          <IonTitle>{pageName}</IonTitle>
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
            <IonTitle size="large">{pageName}</IonTitle>
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
