import { useContext } from "react";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonBadge,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonNote,
} from "@ionic/react";
import { typeNotification } from "../../types/typeNotification";
import { notifications, notificationsOff, trash } from "ionicons/icons";

interface ContainerProps {
  notification: typeNotification;
  callbackOnClick: (notificationID: string) => void;
  handleRemoveNotification: (notificationID: string) => void;
  handleToggleNotificationStatus: (notificationID: string) => void;
  data: string;
  icona: string;
}

const ItemNotification: React.FC<ContainerProps> = ({
  notification,
  callbackOnClick,
  handleRemoveNotification,
  handleToggleNotificationStatus,
  data,
  icona,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonItemSliding>
      <IonItem
        button
        onClick={() => callbackOnClick(notification.notificationID)}
      >
        <IonIcon
          color={notification.readed === false ? "primary" : ""}
          slot="start"
          icon={icona}
        />
        <IonLabel>
          <p>{notification.title}</p>
          <h3>{notification.description}</h3>
          <p>{data}</p>
        </IonLabel>
        <IonNote>
          {notification.readed === false ? (
            <IonBadge>{text[l].new}</IonBadge>
          ) : null}
        </IonNote>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption
          onClick={() => handleRemoveNotification(notification.notificationID)}
          color={"danger"}
        >
          <IonIcon icon={trash} />
        </IonItemOption>
      </IonItemOptions>
      <IonItemOptions side="start">
        <IonItemOption
          onClick={() =>
            handleToggleNotificationStatus(notification.notificationID)
          }
        >
          <IonIcon
            icon={
              notification.readed === false ? notificationsOff : notifications
            }
          />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ItemNotification;
