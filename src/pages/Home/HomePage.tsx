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

import styles from "./HomePage.module.css";
import { useContext, useEffect, useState } from "react";
import { ContextLanguage } from "../../context/contextLanguage";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import AnalyticsDetails from "./components/AnalyticsDetails/AnalyticsDetails";
import InventoryDetails from "./components/InventoryDetails/InventoryDetails";
import ReservationDetails from "./components/ReservationDetails/ReservationDetails";
import { ellipsisVerticalCircle } from "ionicons/icons";
import ReviewsDetails from "./components/ReviewsDetails/ReviewsDetails";
import { useLocation } from "react-router";
import { appRoutes } from "../../routes/routes";
import { typeRoute } from "../../types/typeRoute";
import { typeWidget } from "../../types/typeWidget";

interface PageProps {}

const HomePage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const location = useLocation();
  //CONDITIONS -----------------------
  const [pageName, setPageName] = useState<string | undefined>("");
  const [components, setComponents] = useState<typeWidget[]>([
    {
      widgetID: "AnalyticsDetails",
      component: <AnalyticsDetails key={"AnalyticsDetails"} />,
    },
    {
      widgetID: "InventoryDetails",
      component: <InventoryDetails key={"InventoryDetails"} />,
    },
    {
      widgetID: "OrderDetails",
      component: <OrderDetails key={"OrderDetails"} />,
    },
    {
      widgetID: "ReservationDetails",
      component: <ReservationDetails key={"ReservationDetails"} />,
    },
    {
      widgetID: "ReviewsDetails",
      component: <ReviewsDetails key={"ReviewsDetails"} />,
    },
  ]);

  useEffect(() => {
    setPageName(
      appRoutes.find((route: typeRoute) => route.path === location.pathname)
        ?.tab[l]
    );
  }, [location]);
  //FUNCTIONS ------------------------
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
            <IonButton>
              <IonIcon icon={ellipsisVerticalCircle} />
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
        <div className={styles.content}>
          {components.map((widget: typeWidget, index: number) => {
            return widget.component;
          })}
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
