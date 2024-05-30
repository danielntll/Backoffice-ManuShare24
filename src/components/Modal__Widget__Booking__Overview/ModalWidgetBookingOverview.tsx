import { useContext, useEffect, useState } from "react";
import styles from "./ModalWidgetBookingOverview.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { typeIngredient } from "../../types/typeIngredient";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { textButtons } from "../../text/textButtons";
import { ConstDefinitionWidgetBookingOverview } from "../../constants/widgets/booking/ConstDefinition__WidgetBookingOverview";
import { typeBooking } from "../../types/typeBooking";
import ItemBookingStatus from "../Item__Booking__Status/ItemBookingStatus";
import ItemBookingDoPromote from "../Item__Booking_DoPromote/ItemBookingDoPromote";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  bookingApprovedForToday: typeBooking[];
  bookingPendingForToday: typeBooking[];
  bookingApproved: typeBooking[];
  bookingPending: typeBooking[];
  bookingRejected: typeBooking[];
  filter: string;
  isLoading: boolean;
}

const ModalWidgetBookingOverview: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  filter,
  bookingApprovedForToday,
  bookingPendingForToday,
  bookingApproved,
  bookingPending,
  bookingRejected,
  isLoading,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [filterLocal, setFilterLocal] = useState<string>("filter_today");
  //FUNCTIONS ------------------------
  useEffect(() => {
    setFilterLocal(filter);
  }, [filter]);

  // --- handleOpenBookingDetails()
  /**
   * Questo metodo serve per aprire la pagina con i dettagli della prenotazione
   *
   *
   * @param typeBooking booking - l'oggetto prenotazione da visualizzare in dettaglio
   */
  const handleOpenBookingDetails = (booking: typeBooking) => {
    console.log(booking);
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
                {textButtons[l].btn__close}
              </IonButton>
            </IonButtons>
            <IonTitle>{ConstDefinitionWidgetBookingOverview.name[l]}</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSegment
              value={filterLocal}
              onIonChange={(e) =>
                setFilterLocal(e.target.value?.toString() ?? "filter_today")
              }
            >
              <IonSegmentButton value="filter_today">
                {text[l].filter_today}
              </IonSegmentButton>
              <IonSegmentButton value="filter_all_pending">
                {text[l].filter_all_pending}
              </IonSegmentButton>
              <IonSegmentButton value="filter_all_approved">
                {text[l].filter_all_approved}
              </IonSegmentButton>
              <IonSegmentButton value="filter_all_rejected">
                {text[l].filter_all_rejected}
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* ------------- CONTENT ------------ */}
          <IonList>
            {filterLocal === "filter_today" && (
              <>
                <IonListHeader>
                  <IonLabel className={styles.lable}>
                    {text[l].filter_today + " " + text[l].today_pending}
                  </IonLabel>
                  <IonLabel className="ion-text-end ion-padding-end">
                    {bookingApprovedForToday?.length ?? 0}
                  </IonLabel>
                </IonListHeader>
                {bookingPendingForToday.map(
                  (booking: typeBooking, index: number) => {
                    return (
                      <ItemBookingStatus
                        key={
                          "ModalWidgetBookingOverview" +
                          booking.bookingID +
                          index +
                          text[l].today_pending
                        }
                        booking={booking}
                        isLoading={isLoading}
                        onClick={() => {}}
                      />
                    );
                  }
                )}
                <IonListHeader>
                  <IonLabel className={styles.lable}>
                    {text[l].filter_today + " " + text[l].today_approved}
                  </IonLabel>
                  <IonLabel className="ion-text-end ion-padding-end">
                    {bookingApprovedForToday?.length ?? 0}
                  </IonLabel>
                </IonListHeader>
                {bookingApprovedForToday.length === 0 && (
                  <ItemBookingDoPromote />
                )}
                {bookingApprovedForToday.map(
                  (booking: typeBooking, index: number) => {
                    return (
                      <ItemBookingStatus
                        key={
                          "ModalWidgetBookingOverview" +
                          booking.bookingID +
                          index +
                          text[l].today_approved
                        }
                        booking={booking}
                        isLoading={isLoading}
                        onClick={() => {}}
                      />
                    );
                  }
                )}
              </>
            )}
            {filterLocal === "filter_all_pending" && (
              <>
                <IonListHeader>
                  <IonLabel className={styles.lable}>
                    {text[l].filter_all_pending}
                  </IonLabel>
                  <IonLabel className="ion-text-end ion-padding-end">
                    {bookingPending?.length ?? 0}
                  </IonLabel>
                </IonListHeader>
                {bookingPending.length === 0 && <ItemBookingDoPromote />}
                {bookingPending.map((booking: typeBooking, index: number) => {
                  return (
                    <ItemBookingStatus
                      key={
                        "ModalWidgetBookingOverview" +
                        booking.bookingID +
                        index +
                        +"filter_all_pending"
                      }
                      booking={booking}
                      isLoading={isLoading}
                      onClick={() => {}}
                    />
                  );
                })}
              </>
            )}

            {filterLocal === "filter_all_approved" && (
              <>
                <IonListHeader>
                  <IonLabel className={styles.lable}>
                    {text[l].filter_all_approved}
                  </IonLabel>
                  <IonLabel className="ion-text-end ion-padding-end">
                    {bookingApproved?.length ?? 0}
                  </IonLabel>
                </IonListHeader>
                {bookingApproved.length === 0 && <ItemBookingDoPromote />}
                {bookingApproved.map((booking: typeBooking, index: number) => {
                  return (
                    <ItemBookingStatus
                      key={
                        "ModalWidgetBookingOverview" +
                        booking.bookingID +
                        index +
                        +"filter_all_approved"
                      }
                      booking={booking}
                      isLoading={isLoading}
                      onClick={() => {}}
                    />
                  );
                })}
              </>
            )}

            {filterLocal === "filter_all_rejected" && (
              <>
                <IonListHeader>
                  <IonLabel className={styles.lable}>
                    {text[l].filter_all_rejected}
                  </IonLabel>
                  <IonLabel className="ion-text-end ion-padding-end">
                    {bookingRejected?.length ?? 0}
                  </IonLabel>
                </IonListHeader>
                {bookingRejected.length === 0 && <ItemBookingDoPromote />}
                {bookingRejected.map((booking: typeBooking, index: number) => {
                  return (
                    <ItemBookingStatus
                      key={
                        "ModalWidgetBookingOverview" +
                        booking.bookingID +
                        index +
                        +"filter_all_rejected"
                      }
                      booking={booking}
                      isLoading={isLoading}
                      onClick={() => {}}
                    />
                  );
                })}
              </>
            )}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ModalWidgetBookingOverview;
