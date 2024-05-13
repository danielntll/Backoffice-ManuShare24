import { useContext, useEffect, useState } from "react";
import styles from "./ModalNotifications.module.css";
import { text } from "./text";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
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
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

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

  // --- handleOpenNotificationPage
  /**
   * Questo metodo serve per aprire la pagina dei notifiche
   *
   * @returns void
   */
  const handleOpenNotificationPage = () => {
    console.log("Go to notification page");
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
            callbackSetNotificationData={setNotificationData}
          />
          <ListNotifications
            title={text[l].list_old}
            notificationsData={weekNotifications}
            button_text={text[l].btn_list_old}
            button_callback={handleOpenNotificationPage}
            callbackSetNotificationData={setNotificationData}
          />
        </IonContent>
      </IonModal>
      {/* ----------------- EXTRA UI ----------------------*/}
    </>
  );
};

export default ModalNotifications;
