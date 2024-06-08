import { useContext, useEffect, useState } from "react";
import styles from "./ModalWidgetBookingOverviewCalendar.module.css";
import { text } from "./text";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ContextLanguage } from "../../context/contextLanguage";
import { textButtons } from "../../text/textButtons";
import { add } from "ionicons/icons";
import { ConstDefinitionWidgetBookingOverviewCalendar } from "../../constants/widgets/booking/ConstDefinition__WidgetBookingOverview__Calendar";
import { typeBooking } from "../../types/typeBooking";
import { mockBookings } from "../../mock/mockBooking";
import ListBooking from "../List__Booking/ListBooking";
import ModalWidgetBookingAdd from "../Modal__Widget__Booking__Add/ModalWidgetBookingAdd";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  selectedDate: string;
  isLoading: boolean;
}

const ModalWidgetBookingOverviewCalendar: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  selectedDate,
  isLoading,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  // --- filterLocal
  /**
   * Rappresenta lo stato del panel con gli item da visualizzare.
   * Si basa sui dati di typeBookingStatus:
   *"pending"
  | "approved"
  | "rejected"
  | "cancelled"
   */
  const [filterLocal, setFilterLocal] = useState<string>("approved");
  // --- bookingOfTheDay
  /**
   * Rappresenta tutti i booking con la data passata nella props.
   */
  const [bookingOfTheDay, setBookingOfTheDay] = useState<typeBooking[]>([]);
  // --- booking
  const [approved, setApproved] = useState<typeBooking[]>([]);
  const [pending, setPending] = useState<typeBooking[]>([]);
  const [rejected, setRejected] = useState<typeBooking[]>([]);
  const [cancelled, setCancelled] = useState<typeBooking[]>([]);

  // --- dayString
  /**
   * Rappresenta la data selezionata dal utente in formato
   * "dd/mm/yyyy". Viene settata nel useEffect.
   */
  const [dayString, setDayString] = useState<string>("");

  // --- isModalAddOpen
  /**
   * Rappresenta lo stato del modale che permette di aggiungere un nuovo booking
   * manualmente.
   */
  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);

  //FUNCTIONS ------------------------
  useEffect(() => {
    // Filtra i booking per data
    const bookingOfTheDay: typeBooking[] = mockBookings.filter((booking) => {
      // Convert booking.bookingDate and selectedDate to Date objects
      const bookingDate = new Date(booking.bookingDate);
      const selectedDateObj = new Date(selectedDate);

      // Compare only the day (year, month, and date)
      return (
        bookingDate.getFullYear() === selectedDateObj.getFullYear() &&
        bookingDate.getMonth() === selectedDateObj.getMonth() &&
        bookingDate.getDate() === selectedDateObj.getDate()
      );
    });

    // Set dayString
    const date = new Date(selectedDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // I mesi partono da 0
    const year = date.getFullYear().toString();
    setDayString(`${day}/${month}/${year}`);

    // Set bookingOfTheDay
    setBookingOfTheDay(bookingOfTheDay);
    // Set approved
    setApproved(
      bookingOfTheDay.filter((booking) => booking.bookingStatus === "approved")
    );
    // Set pending
    setPending(
      bookingOfTheDay.filter((booking) => booking.bookingStatus === "pending")
    );
    // Set rejected
    setRejected(
      bookingOfTheDay.filter((booking) => booking.bookingStatus === "rejected")
    );
    // Set cancelled
    setCancelled(
      bookingOfTheDay.filter((booking) => booking.bookingStatus === "cancelled")
    );
  }, [selectedDate]);

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
                {textButtons[l].btn__close}
              </IonButton>
            </IonButtons>
            <IonTitle>
              {ConstDefinitionWidgetBookingOverviewCalendar.name[l]}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsModalAddOpen(true)}>
                <IonIcon icon={add} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSegment
              scrollable={true}
              value={filterLocal}
              onIonChange={(e) =>
                setFilterLocal(e.target.value?.toString() ?? "all")
              }
            >
              <IonSegmentButton value="all">
                <div className="inline-row-sb">
                  <IonBadge
                    className="icon-margin-right-light"
                    color={"medium"}
                  >
                    {bookingOfTheDay.length}
                  </IonBadge>
                  <span>{text[l].segment__all}</span>
                </div>
              </IonSegmentButton>
              <IonSegmentButton value="approved">
                <div className="inline-row-sb">
                  {approved.length > 0 ? (
                    <IonBadge
                      className="icon-margin-right-light"
                      color={"medium"}
                    >
                      {approved.length}
                    </IonBadge>
                  ) : (
                    <></>
                  )}
                  <span>{text[l].segment__approved}</span>
                </div>
              </IonSegmentButton>
              <IonSegmentButton value="pending">
                <div className="inline-row-sb">
                  {pending.length > 0 ? (
                    <IonBadge
                      className="icon-margin-right-light"
                      color={"medium"}
                    >
                      {pending.length}
                    </IonBadge>
                  ) : (
                    <></>
                  )}
                  <span>{text[l].segment__pending}</span>
                </div>
              </IonSegmentButton>
              <IonSegmentButton value="cancelled">
                <div className="inline-row-sb">
                  {cancelled.length > 0 ? (
                    <IonBadge
                      className="icon-margin-right-light"
                      color={"medium"}
                    >
                      {cancelled.length}
                    </IonBadge>
                  ) : (
                    <></>
                  )}
                  <span>{text[l].segment__cancelled}</span>
                </div>
              </IonSegmentButton>
              <IonSegmentButton value="rejected">
                <div className="inline-row-sb">
                  {rejected.length > 0 ? (
                    <IonBadge
                      className="icon-margin-right-light"
                      color={"medium"}
                    >
                      {rejected.length}
                    </IonBadge>
                  ) : (
                    <></>
                  )}
                  <span>{text[l].segment__rejected}</span>
                </div>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* ------------- CONTENT ------------ */}
          {/* ALL LIST */}
          {filterLocal === "all" && (
            <>
              <ListBooking
                title={dayString}
                bookingList={bookingOfTheDay}
                isLoading={isLoading}
              />
            </>
          )}
          {/* APPROVED LIST */}
          {filterLocal === "approved" && (
            <>
              <ListBooking
                title={dayString}
                bookingList={approved}
                isLoading={isLoading}
              />
            </>
          )}
          {/* PENDING LIST */}
          {filterLocal === "pending" && (
            <>
              <ListBooking
                title={dayString}
                bookingList={pending}
                isLoading={isLoading}
              />
            </>
          )}
          {/* REJECTED LIST */}
          {filterLocal === "rejected" && (
            <>
              <ListBooking
                title={dayString}
                bookingList={rejected}
                isLoading={isLoading}
              />
            </>
          )}
          {/* CANCELLED LIST */}
          {filterLocal === "cancelled" && (
            <>
              <ListBooking
                title={dayString}
                bookingList={cancelled}
                isLoading={isLoading}
              />
            </>
          )}
        </IonContent>
      </IonModal>
      {/* ------------- EXTRA UI CONTENT ------------ */}
      <ModalWidgetBookingAdd
        isOpen={isModalAddOpen}
        setIsOpen={setIsModalAddOpen}
        date={selectedDate}
      />
    </>
  );
};

export default ModalWidgetBookingOverviewCalendar;
