import { useContext, useEffect, useState } from "react";
import styles from "./ModalNotifications.module.css";
import { text } from "./text";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ContextLanguage } from "../../context/contextLanguage";
import { typeNotification } from "../../types/typeNotification";

import { isToday } from "../../utils/isToday";
import ListNotifications from "../List__Notifications/ListNotifications";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  notificationsData: typeNotification[];
  setNotificationData: (newNotifications: typeNotification[]) => void;
}

const ModalNotifications: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  notificationsData,
  setNotificationData,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [todayNotifications, setTodayNotifications] = useState<
    typeNotification[]
  >([]);

  const [weekNotifications, setWeekNotifications] = useState<
    typeNotification[]
  >([]);

  //FUNCTIONS ------------------------

  useEffect(() => {
    setTodayNotifications(
      notificationsData.filter((notification) =>
        isToday(notification.createdAt)
      )
    );
    setWeekNotifications(
      notificationsData.filter(
        (notification) => !isToday(notification.createdAt)
      )
    );
  }, [notificationsData]);

  // --- handleSetAllNotificationsToReaded
  /**
   * Questo metodo serve per impostare tutti i notifiche come "letti"
   *
   * @returns void
   */
  const handleSetAllNotificationsToReaded = () => {
    setNotificationData(
      notificationsData.map((notification) => ({
        ...notification,
        readed: true,
      }))
    );
  };

  // --- handleOpenNotificationsPage
  /**
   * Questo metodo serve per aprire la pagina delle notifiche
   *
   * @returns void
   */
  const handleOpenNotificationsPage = () => {
    console.log("Open notifications page");
  };

  // --- handleToggleNotificationStatus
  /**
   * Questo metodo serve per toggleare lo stato di una notifica
   *
   * @param notificationID
   */
  const handleToggleNotificationStatus = (notificationID: string) => {
    notificationsData.map((notification: typeNotification) => {
      if (notification.notificationID === notificationID) {
        notification.readed = !notification.readed;
      }
    });
    setNotificationData([...notificationsData]);
  };

  // --- handleRemoveNotification
  /**
   * Questo metodo serve per rimuovere una notifica
   *
   * @param notificationID
   */
  const handleRemoveNotification = (notificationID: string) => {
    setNotificationData(
      notificationsData.filter(
        (notification) => notification.notificationID !== notificationID
      )
    );
  };

  const hanldeOpenNotificationDetails = (notificationID: string) => {
    console.log("Open notification details");
  };

  //RETURN COMPONENT -----------------
  return (
    <>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        className={styles.container}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color={"medium"} onClick={() => setIsOpen(false)}>
                {text[l].btn_chiudi}
              </IonButton>
            </IonButtons>
            <IonTitle>{text[l].componentTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* ------------- CONTENT ------------ */}
          <ListNotifications
            title={text[l].list_today}
            notificationsData={todayNotifications}
            button_text={text[l].btn_list_today}
            button_callback={handleSetAllNotificationsToReaded}
            callbackOpenNotificationDetails={hanldeOpenNotificationDetails}
            callbackRemoveNotification={handleRemoveNotification}
            callbackUpdateNotificationStatus={handleToggleNotificationStatus}
          />
          <ListNotifications
            title={text[l].list_old}
            notificationsData={weekNotifications}
            button_text={text[l].btn_list_old}
            button_callback={handleOpenNotificationsPage}
            callbackOpenNotificationDetails={hanldeOpenNotificationDetails}
            callbackRemoveNotification={handleRemoveNotification}
            callbackUpdateNotificationStatus={handleToggleNotificationStatus}
          />
        </IonContent>
      </IonModal>
      {/* ----------------- EXTRA UI ----------------------*/}
    </>
  );
};

export default ModalNotifications;
