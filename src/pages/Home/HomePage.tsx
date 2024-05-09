import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { text } from "./text";

import styles from "./HomePage.module.css";
import { useContext } from "react";
import { ContextLanguage } from "../../context/contextLanguage";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import AnalyticsDetails from "./components/AnalyticsDetails/AnalyticsDetails";
import InventoryDetails from "./components/InventoryDetails/InventoryDetails";
import ReservationDetails from "./components/ReservationDetails/ReservationDetails";
import { ellipsisVerticalCircle, optionsOutline } from "ionicons/icons";
import ReviewsDetails from "./components/ReviewsDetails/ReviewsDetails";

interface PageProps {}

const HomePage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
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
            <IonButton>
              <IonIcon icon={ellipsisVerticalCircle} />
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
        <div className={styles.content}>
          <IonCard>
            <OrderDetails />
            <ReservationDetails />
            <InventoryDetails />
            <ReviewsDetails />
            <AnalyticsDetails />
          </IonCard>
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
