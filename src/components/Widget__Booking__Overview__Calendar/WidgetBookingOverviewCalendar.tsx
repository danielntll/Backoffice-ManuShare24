import { useContext, useState } from "react";
import styles from "./WidgetBookingOverviewCalendar.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { IonButton, IonDatetime, IonList } from "@ionic/react";
import ListHeader from "../List__Header/ListHeader";
import { ConstDefinitionWidgetBookingOverviewCalendar } from "../../constants/widgets/booking/ConstDefinition__WidgetBookingOverview__Calendar";
import ModalWidgetBookingOverviewCalendar from "../Modal__Widget__Booking__Overview__Calendar/ModalWidgetBookingOverviewCalendar";
import { text } from "./text";
import { dateConvertPicketToString } from "../../utils/dateConvertPicketToString";

interface ContainerProps {}

const WidgetBookingOverviewCalendar: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal
  const [selectedDate, setSelectedDate] = useState<string>(""); // State for selected date
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading
  //FUNCTIONS ------------------------

  /**
   * Gestisce l'evento di click su una data nel calendario.
   *
   * Questa funzione aggiorna lo stato `selectedDate` con la data selezionata,
   * convertendo il valore dell'evento in una stringa utilizzando la funzione
   * `dateConvertPicketToString`. Quindi, apre il modal.
   *
   * @param date La data selezionata, in formato stringa o array di stringhe.
   */
  const handleOnDateClick = (date: string | string[] | undefined | null) => {
    setSelectedDate(dateConvertPicketToString(date));
    setIsModalOpen(true);
  };

  // --- openTodayDate()
  /**
   * Questo metodo permette di aprire la data di oggi
   * nel calendario.
   *
   * @param Nessuno
   */
  const openTodayDate = () => {
    const today = new Date();
    const isoString = today.toISOString();
    handleOnDateClick(isoString);
  };
  //RETURN COMPONENT -----------------
  return (
    <>
      <div className={styles.container}>
        <IonList inset>
          <ListHeader
            title={ConstDefinitionWidgetBookingOverviewCalendar.name[l]}
            subtitle={
              ConstDefinitionWidgetBookingOverviewCalendar.category !==
              undefined
                ? ConstDefinitionWidgetBookingOverviewCalendar.category[l]
                : undefined
            }
            callbackListAction={openTodayDate}
            button={<IonButton>{text[l].today}</IonButton>}
          />
          <IonDatetime
            className={styles.calendar}
            presentation="date"
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
          ></IonDatetime>
        </IonList>
      </div>
      <ModalWidgetBookingOverviewCalendar
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectedDate={selectedDate}
        isLoading={isLoading}
      />
    </>
  );
};

export default WidgetBookingOverviewCalendar;
