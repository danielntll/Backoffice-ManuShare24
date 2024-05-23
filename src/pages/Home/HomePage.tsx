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
import { gridOutline, notificationsOutline } from "ionicons/icons";
import { useLocation } from "react-router";
import { appRoutes } from "../../routes/routes";
import { typeRoute } from "../../types/typeRoute";
import { typeWidget } from "../../types/typeWidget";
import ModalNotifications from "../../components/Modal__Notifications/ModalNotifications";
import { typeNotification } from "../../types/typeNotification";
import { mockNotifications } from "../../mock/mockNotifications";
import ModalOrderComponents from "../../components/Modal__Order__Components/ModalOrderComponents";
import { WidgetStatusOrders } from "../../constants/widgets/orders/WidgetStatusOrders";
import { WidgetReservations } from "../../constants/widgets/booking/WidgetReservations";
import { WidgetInventory } from "../../constants/widgets/inventory/WidgetInventory";
import { WidgetAnalytics } from "../../constants/widgets/analytics/WidgetAnalytics";
import { WidgetReviews } from "../../constants/widgets/reviews/WidgetReviews";
import { WidgetInventoryIngredientsStockStatus } from "../../constants/widgets/inventory/WidgetInventoryIngredientsStockStatus";
import { ConstDefinitionWidgetBookingOverview } from "../../constants/widgets/booking/ConstDefinition__WidgetBookingOverview";

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
  const [pageName, setPageName] = useState<string | undefined>("");

  const [notifications, setNotifications] = useState<typeNotification[]>([]);
  const [widgets, setWidgets] = useState<typeWidget[]>([]);

  useEffect(() => {
    setPageName(
      appRoutes.find((route: typeRoute) => route.path === location.pathname)
        ?.tab[l]
    );
  }, [location]);

  useEffect(() => {
    // TODO: prelevare le notifiche dal CONTEXT
    setNotifications(mockNotifications);
    getWidgetConfig();
  }, []);
  //FUNCTIONS ------------------------
  // --- getWidgetsConfig()
  /**
   *  Questo metodo serve per ottenere la lista di widget
   * visualizzabili sulla HomePage dal Database.
   * Questo per permette di avere lo stesso tipo di configurazione
   * cross-app per l'utente.
   *
   *
   */
  const getWidgetConfig = () => {
    setWidgets([
      ConstDefinitionWidgetBookingOverview,
      WidgetInventoryIngredientsStockStatus,
      WidgetStatusOrders,
      WidgetInventory,
      WidgetReservations,
      WidgetAnalytics,
      WidgetReviews,
    ]);
  };

  // --- handleSetWidgets()
  /**
   *  Questo metodo serve per aggiornare la lista di widget
   * visualizzabili sulla HomePage
   *
   * @param newWidgets typeWidget - array di widget nuovo
   */
  const handleUpdateWidgets = (newWidgets: typeWidget[]) => {
    setWidgets(newWidgets);
  };

  // --- openNotificationsModal()
  /**
   *
   */
  const openNotificationsModal = () => {
    setIsModalNotificationsOpen(!isModalNotificationsOpen);
  };

  // --- openOrderComponentsModal()
  /**
   *
   */
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
              <IonIcon icon={gridOutline} />
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
          {widgets.map((widget: typeWidget, index: number) => {
            return <div key={widget.widgetID + index}>{widget.component}</div>;
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
          callbackUpdateWidgets={handleUpdateWidgets}
          widgets={widgets}
          isOpen={isModalOrderComponentsOpen}
          setIsOpen={setIsModalOrderComponentsOpen}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
