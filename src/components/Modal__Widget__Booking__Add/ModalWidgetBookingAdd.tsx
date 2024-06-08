import { useContext, useState } from "react";
import styles from "./ModalWidgetBookingAdd.module.css";
import { text } from "./text";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ContextLanguage } from "../../context/contextLanguage";
import { textButtons } from "../../text/textButtons";
import { dateConvertPicketToString } from "../../utils/dateConvertPicketToString";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  date: string;
}

const ModalWidgetBookingAdd: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  date,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [selectedDate, setSelectedDate] = useState<string>(date);
  //FUNCTIONS ------------------------

  // --- handleOnDateClick()
  /**
   * Gestisce l'evento di click su una data nel calendario.
   *
   * Questa funzione aggiorna lo stato `selectedDate` con la data selezionata,
   * convertendo il valore dell'evento in una stringa utilizzando la funzione
   * `dateConvertPicketToString`.
   *
   * @param date La data selezionata, in formato string | string[] | undefined | null.
   */
  const handleOnDateClick = (date: string | string[] | undefined | null) => {
    setSelectedDate(dateConvertPicketToString(date));
  };

  //RETURN COMPONENT -----------------
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={() => setIsOpen(false)}
      className={styles.container}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color={"medium"} onClick={() => setIsOpen(false)}>
              {textButtons[l].btn__close}
            </IonButton>
          </IonButtons>
          <IonTitle>{text[l].componentTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* ------------- CONTENT ------------ */}
        <IonList inset={true}>
          <IonItem>
            <>
              <IonLabel>
                <h3>{text[l].data__title}</h3>
              </IonLabel>
              <IonDatetimeButton
                slot="end"
                datetime="datetime"
              ></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  onIonChange={(event) => handleOnDateClick(event.detail.value)}
                  highlightedDates={(isoString) => {
                    const date = new Date(isoString);
                    const utcDay = date.getUTCDate();

                    if (utcDay % 5 === 0) {
                      return {
                        textColor: "var(--ion-color-success-contrast)",
                        backgroundColor: "var(--ion-color-success)",
                      };
                    }

                    if (utcDay % 3 === 0) {
                      return {
                        textColor: "var(--ion-color-warning-contrast)",
                        backgroundColor: "var(--ion-color-warning)",
                      };
                    }

                    return undefined;
                  }}
                  id="datetime"
                ></IonDatetime>
              </IonModal>
            </>
          </IonItem>
        </IonList>
        <IonNote className="ion-padding-horizontal">
          {text[l].data__subtitle}
        </IonNote>
      </IonContent>
    </IonModal>
  );
};

export default ModalWidgetBookingAdd;
