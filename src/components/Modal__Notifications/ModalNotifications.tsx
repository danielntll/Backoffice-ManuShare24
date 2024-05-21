import { useContext, useEffect, useState } from "react";
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
import SegmentFilterNotifications from "../Segment__Filter__Notifications/SegmentFilterNotifications";
import { textButtons } from "../../text/textButtons";

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

  const [filteredNotifications, setFiltereNotifications] = useState<
    typeNotification[]
  >([]);

  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  //FUNCTIONS ------------------------

  useEffect(() => {
    setFiltereNotifications(notificationsData);
  }, [notificationsData]);

  useEffect(() => {
    setTodayNotifications(
      filteredNotifications.filter((notification) =>
        isToday(notification.createdAt)
      )
    );
    setWeekNotifications(
      filteredNotifications.filter(
        (notification) => !isToday(notification.createdAt)
      )
    );
  }, [filteredNotifications]);

  // --- handleSetAllNotificationsToReaded
  /**
   * Questo metodo serve per impostare tutti i notifiche come "letti"
   *
   * @returns void
   */
  const handleSetAllNotificationsToReaded = () => {
    setNotificationData(
      filteredNotifications.map((notification) => ({
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
    filteredNotifications.map((notification: typeNotification) => {
      if (notification.notificationID === notificationID) {
        notification.readed = !notification.readed;
      }
    });
    setNotificationData([...filteredNotifications]);
  };

  // --- handleRemoveNotification
  /**
   * Questo metodo serve per rimuovere una notifica
   *
   * @param notificationID
   */
  const handleRemoveNotification = (notificationID: string) => {
    setNotificationData(
      filteredNotifications.filter(
        (notification) => notification.notificationID !== notificationID
      )
    );
  };

  const hanldeOpenNotificationDetails = (notificationID: string) => {
    console.log("Open notification details");
  };

  // --- handleSelectFilter
  /**
   * Questo metodo serve per selezionare un filtro
   *
   * @param filter
   */
  const handleSelectFilter = (filter: string) => {
    switch (filter) {
      case "all":
        setFiltereNotifications(notificationsData);
        break;
      case "unread":
        setFiltereNotifications(
          notificationsData.filter((notification) => !notification.readed)
        );
        break;
      case "orders":
        setFiltereNotifications(
          notificationsData.filter(
            (notification) => notification.category === "orders"
          )
        );
        break;
      case "inventory":
        setFiltereNotifications(
          notificationsData.filter(
            (notification) => notification.category === "inventory"
          )
        );
        break;
      case "reservation":
        setFiltereNotifications(
          notificationsData.filter(
            (notification) => notification.category === "reservation"
          )
        );
        break;
      case "feedback":
        setFiltereNotifications(
          notificationsData.filter(
            (notification) => notification.category === "feedback"
          )
        );
        break;
      default:
        setFiltereNotifications(notificationsData);
        break;
    }
    setSelectedFilter(filter);
  };

  //RETURN COMPONENT -----------------
  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color={"medium"} onClick={() => setIsOpen(false)}>
                {textButtons[l].btn__close}
              </IonButton>
            </IonButtons>
            <IonTitle>{text[l].componentTitle}</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <SegmentFilterNotifications
              filter={selectedFilter}
              callbackSelectFilter={handleSelectFilter}
            />
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
