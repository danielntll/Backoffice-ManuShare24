import {
  IonButton,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { typeNotification } from "../../types/typeNotification";
import ItemNotification from "../Item__Notification/ItemNotification";
import {
  calendarNumberOutline,
  chatbubbleEllipsesOutline,
  fileTrayFullOutline,
  listCircleOutline,
  notificationsOutline,
} from "ionicons/icons";

interface ContainerProps {
  title: string;
  notificationsData: typeNotification[];
  callbackSetNotificationData: (newNotifications: typeNotification[]) => void;
  button_text: string;
  button_callback: () => void;
  button_icon?: string;
}

const ListNotifications: React.FC<ContainerProps> = ({
  notificationsData,
  callbackSetNotificationData,
  title,
  button_text,
  button_callback,
  button_icon,
}) => {
  //VARIABLES ------------------------
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  // --- handleToggleNotificationStatus
  /**
   * Questo metodo serve per attivare o disattivare lo stato "letto" sulla notifica.
   *
   *
   * @param notificationID
   */
  const handleToggleNotificationStatus = (notificationID: string) => {
    // Crea una nuova copia dell'array delle notifiche
    const updatedNotifications = notificationsData.map((notification) => {
      // Se la notifica corrente ha lo stesso ID di quello cliccato, inverti lo stato di readed
      if (notification.notificationID === notificationID) {
        //TODO: Aggiungere logica per il backend
        return {
          ...notification,
          readed: !notification.readed,
        };
      }
      return notification; // Altrimenti, mantieni la notifica invariata
    });

    // Aggiorna lo stato delle notifiche con la nuova copia aggiornata
    callbackSetNotificationData(updatedNotifications);
  };

  // --- handleRemoveNotification
  /**
   * Questo metodo serve per rimuovere/cancellare una notifica.
   *
   * @param notificationID
   */
  const handleRemoveNotification = (notificationID: string) => {
    // Filtra le notifiche, rimuovendo quella con l'ID corrispondente
    const updatedNotifications = notificationsData.filter(
      (notification) => notification.notificationID !== notificationID
    );

    // Aggiorna lo stato delle notifiche con il nuovo array filtrato
    callbackSetNotificationData(updatedNotifications);
    //TODO: Aggiungere logica per il backend
  };

  // --- handleGoToPage
  const handleGoToPage = (notifica: typeNotification) => {
    console.log("Go to page : ", notifica.category);
  };
  //RETURN COMPONENT -----------------
  return (
    <IonList inset>
      <IonListHeader>
        <IonLabel>{title}</IonLabel>
        <IonButton onClick={button_callback}>
          {button_text}
          {button_icon && <IonIcon icon={button_icon} />}
        </IonButton>
      </IonListHeader>
      {notificationsData.map((notification: typeNotification) => {
        let data: string = "";
        let icona: string = "";
        const currentDate = new Date();
        const notificationDate = new Date(notification.createdAt);
        const notificationDay = notificationDate.getDate();
        const currentDay = currentDate.getDate();
        if (notificationDay === currentDay) {
          // È oggi, restituisci solo l'ora
          const hours = String(notificationDate.getHours()).padStart(2, "0");
          const minutes = String(notificationDate.getMinutes()).padStart(
            2,
            "0"
          );
          data = `Ore ${hours}:${minutes}`;
        } else {
          // Non è oggi, restituisci la data
          const day = String(notificationDate.getDate()).padStart(2, "0");
          const month = String(notificationDate.getMonth() + 1).padStart(
            2,
            "0"
          );
          const hours = String(notificationDate.getHours()).padStart(2, "0");
          const minutes = String(notificationDate.getMinutes()).padStart(
            2,
            "0"
          );
          data = `${day}/${month} - Ore ${hours}:${minutes}`;
        }

        switch (notification.category) {
          case "feedback":
            icona = chatbubbleEllipsesOutline;
            break;
          case "inventory":
            icona = fileTrayFullOutline;
            break;
          case "orders":
            icona = listCircleOutline;
            break;
          case "reservation":
            icona = calendarNumberOutline;
            break;

          default:
            icona = notificationsOutline;
            break;
        }
        return (
          <ItemNotification
            key={notification.notificationID}
            notification={notification}
            callbackOnClick={handleGoToPage}
            handleRemoveNotification={handleRemoveNotification}
            handleToggleNotificationStatus={handleToggleNotificationStatus}
            data={data}
            icona={icona}
          />
        );
      })}
    </IonList>
  );
};

export default ListNotifications;
