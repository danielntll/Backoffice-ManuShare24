import { useContext, useState } from "react";
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
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ContextLanguage } from "../../context/contextLanguage";
import { typeNotification } from "../../types/typeNotification";
import { filterCircle, notifications, notificationsOff } from "ionicons/icons";
import ActionsheetFilter from "../Actionsheet__Filter/ActionsheetFilter";

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
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  //FUNCTIONS ------------------------
  const handleSelectFilter = (value: string) => {
    console.log(value);
  };

  const handleToggleNotificationStatus = (notificationID: string) => {
    // Crea una nuova copia dell'array delle notifiche
    const updatedNotifications = notificationsData.map((notification) => {
      // Se la notifica corrente ha lo stesso ID di quello cliccato, inverti lo stato di readed
      if (notification.notificationID === notificationID) {
        return {
          ...notification,
          readed: !notification.readed,
        };
      }
      return notification; // Altrimenti, mantieni la notifica invariata
    });

    // Aggiorna lo stato delle notifiche con la nuova copia aggiornata
    setNotificationData(updatedNotifications);
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
            <IonButtons slot="end">
              <IonButton onClick={() => setIsFiltersOpen(true)}>
                <IonIcon icon={filterCircle} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* ------------- CONTENT ------------ */}
          <IonList inset>
            {notificationsData.map((notifica: typeNotification) => {
              const currentDate = new Date();
              const notificationDate = new Date(notifica.createdAt);
              const notificationDay = notificationDate.getDate();
              const currentDay = currentDate.getDate();
              let data: string = "";
              if (notificationDay === currentDay) {
                // È oggi, restituisci solo l'ora
                const hours = String(notificationDate.getHours()).padStart(
                  2,
                  "0"
                );
                const minutes = String(notificationDate.getMinutes()).padStart(
                  2,
                  "0"
                );
                data = `${hours}:${minutes}`;
              } else {
                // Non è oggi, restituisci la data
                const day = String(notificationDate.getDate()).padStart(2, "0");
                const month = String(notificationDate.getMonth() + 1).padStart(
                  2,
                  "0"
                );
                const hours = String(notificationDate.getHours()).padStart(
                  2,
                  "0"
                );
                const minutes = String(notificationDate.getMinutes()).padStart(
                  2,
                  "0"
                );
                data = `${day}/${month} ${hours}:${minutes}`;
              }
              return (
                <IonItemSliding key={notifica.notificationID}>
                  <IonItem button>
                    <IonLabel>
                      <p>{notifica.title}</p>
                      <h3>{notifica.description}</h3>
                      <p>{data}</p>
                    </IonLabel>
                    <IonNote>
                      {notifica.readed === false ? (
                        <IonBadge>{text[l].new}</IonBadge>
                      ) : null}
                    </IonNote>
                  </IonItem>
                  <IonItemOptions side="start">
                    <IonItemOption
                      onClick={() =>
                        handleToggleNotificationStatus(notifica.notificationID)
                      }
                    >
                      <IonIcon
                        icon={
                          notifica.readed === false
                            ? notificationsOff
                            : notifications
                        }
                      />
                    </IonItemOption>
                  </IonItemOptions>
                  <IonItemOptions side="end">
                    <IonItemOption>Favorite</IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              );
            })}
          </IonList>
        </IonContent>
      </IonModal>
      {/* ----------------- EXTRA UI ----------------------*/}
      <ActionsheetFilter
        isOpen={isFiltersOpen}
        setIsOpen={setIsFiltersOpen}
        callbackSelectedValue={handleSelectFilter}
        buttons={[
          {
            text: "Notifiche di oggi",
            data: {
              action: "Notifiche di oggi",
            },
          },
          {
            text: "Nuovo",
            data: {
              action: "Nuovo",
            },
          },
          {
            text: "Categoria",
            data: {
              action: "Categoria",
            },
          },
        ]}
      />
    </>
  );
};

export default ModalNotifications;
