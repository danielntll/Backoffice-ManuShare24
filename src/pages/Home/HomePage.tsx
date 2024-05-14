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
import ModalOrderComponents from "../../components/Modal__Order__Components/ModalOrderComponents";

interface PageProps {}

const HomePage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const location = useLocation();
  //CONDITIONS -----------------------
  const [isModalNotificationsOpen, setIsModalNotificationsOpen] =
    useState<boolean>(false);

  const [isModalOrderComponentsOpen, setIsModalOrderComponentsOpen] =
    useState<boolean>(false);
  const [notifications, setNotifications] = useState<typeNotification[]>([]);
  const [pageName, setPageName] = useState<string | undefined>("");
  const [components, setComponents] = useState<typeWidget[]>([
    {
      widgetID: "OrderDetails",
      component: <OrderDetails key={"OrderDetails"} />,
      name: {
        it_IT: "Ordini",
        en_GB: "Order Details",
      },
    },
    {
      widgetID: "ReservationDetails",
      component: <ReservationDetails key={"ReservationDetails"} />,
      name: {
        it_IT: "Prenotazioni",
        en_GB: "Reservation Details",
      },
    },
    {
      widgetID: "InventoryDetails",
      component: <InventoryDetails key={"InventoryDetails"} />,
      name: {
        it_IT: "Inventario",
        en_GB: "Inventory Details",
      },
    },
    {
      widgetID: "ReviewsDetails",
      component: <ReviewsDetails key={"ReviewsDetails"} />,
      name: {
        it_IT: "Recensioni",
        en_GB: "Reviews Details",
      },
    },
    {
      widgetID: "AnalyticsDetails",
      component: <AnalyticsDetails key={"AnalyticsDetails"} />,
      name: {
        it_IT: "Analytics",
        en_GB: "Analytics Details",
      },
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

  const openOrderComponentsModal = () => {
    setIsModalOrderComponentsOpen(!isModalOrderComponentsOpen);
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
              {notifications.filter((notif) => !notif.readed).length > 0 ? (
                <IonBadge>
                  {notifications.filter((notif) => !notif.readed).length}
                </IonBadge>
              ) : null}
            </IonButton>
            <IonButton onClick={openOrderComponentsModal}>
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

        <ModalOrderComponents
          callbackSetComponents={setComponents}
          components={components}
          isOpen={isModalOrderComponentsOpen}
          setIsOpen={setIsModalOrderComponentsOpen}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
