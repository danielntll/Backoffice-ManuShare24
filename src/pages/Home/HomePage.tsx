import {
  IonBadge,
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
import { ellipsisVerticalCircle, notificationsOutline } from "ionicons/icons";
import ReviewsDetails from "./components/ReviewsDetails/ReviewsDetails";
import { useLocation } from "react-router";
import { appRoutes } from "../../routes/routes";
import { typeRoute } from "../../types/typeRoute";
import { typeWidget } from "../../types/typeWidget";
import ModalNotifications from "../../components/Modal__Notifications/ModalNotifications";
import { typeNotification } from "../../types/typeNotification";
import { mockNotifications } from "../../mock/mockNotifications";

interface PageProps {}

const HomePage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const location = useLocation();
  //CONDITIONS -----------------------
  const [isModalNotificationsOpen, setIsModalNotificationsOpen] =
    useState<boolean>(false);
  const [newNotifications, setNewNotifications] = useState([1, 2]);
  const [notifications, setNotifications] = useState<typeNotification[]>([]);
  const [pageName, setPageName] = useState<string | undefined>("");
  const [components, setComponents] = useState<typeWidget[]>([
    {
      widgetID: "OrderDetails",
      component: <OrderDetails key={"OrderDetails"} />,
    },
    {
      widgetID: "ReservationDetails",
      component: <ReservationDetails key={"ReservationDetails"} />,
    },
    {
      widgetID: "InventoryDetails",
      component: <InventoryDetails key={"InventoryDetails"} />,
    },
    {
      widgetID: "ReviewsDetails",
      component: <ReviewsDetails key={"ReviewsDetails"} />,
    },
    {
      widgetID: "AnalyticsDetails",
      component: <AnalyticsDetails key={"AnalyticsDetails"} />,
    },
  ]);

  useEffect(() => {
    setPageName(
      appRoutes.find((route: typeRoute) => route.path === location.pathname)
        ?.tab[l]
    );
  }, [location]);

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);
  //FUNCTIONS ------------------------
  const openNotificationsModal = () => {
    setIsModalNotificationsOpen(!isModalNotificationsOpen);
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
            <IonButton onClick={openNotificationsModal}>
              <IonIcon icon={notificationsOutline} />
              <IonBadge>{newNotifications.length}</IonBadge>
            </IonButton>
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
          {components.map((widget: typeWidget) => {
            return widget.component;
          })}
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
        <ModalNotifications
          isOpen={isModalNotificationsOpen}
          setIsOpen={setIsModalNotificationsOpen}
          notificationsData={notifications}
          setNotificationData={setNotifications}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
