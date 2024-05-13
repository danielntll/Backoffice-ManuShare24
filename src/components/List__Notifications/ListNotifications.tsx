import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { typeNotification } from "../../types/typeNotification";
import ItemNotification from "../Item__Notification/ItemNotification";
import {
  calendarNumberOutline,
  chatbubbleEllipsesOutline,
  checkmark,
  fileTrayFullOutline,
  listCircleOutline,
  notificationsOutline,
} from "ionicons/icons";
import { text } from "./text";
import { ContextLanguage } from "../../context/contextLanguage";
import { useContext } from "react";

interface ContainerProps {
  title: string;
  notificationsData: typeNotification[];
  callbackRemoveNotification: (notificationID: string) => void;
  callbackUpdateNotificationStatus: (notificationID: string) => void;
  callbackOpenNotificationDetails: (notificationID: string) => void;
  button_text: string;
  button_callback: () => void;
  button_icon?: string;
}

const ListNotifications: React.FC<ContainerProps> = ({
  notificationsData,
  callbackRemoveNotification,
  callbackUpdateNotificationStatus,
  callbackOpenNotificationDetails,
  title,
  button_text,
  button_callback,
  button_icon,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
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
      {notificationsData.length === 0 && (
        <IonItem>
          <IonIcon icon={checkmark} color="success" slot="start" />
          <IonLabel>
            <p>{text[l].no_notifications_sop}</p>
            <h3>{text[l].no_notifications}</h3>
          </IonLabel>
        </IonItem>
      )}
      {notificationsData.map(
        (notification: typeNotification, index: number) => {
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
              key={notification.notificationID + index}
              notification={notification}
              callbackOnClick={callbackOpenNotificationDetails}
              handleRemoveNotification={callbackRemoveNotification}
              handleToggleNotificationStatus={callbackUpdateNotificationStatus}
              data={data}
              icona={icona}
            />
          );
        }
      )}
    </IonList>
  );
};

export default ListNotifications;
