import { useContext } from "react";
import styles from "./ListBooking.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonLabel, IonList, IonListHeader } from "@ionic/react";
import { typeBooking } from "../../types/typeBooking";
import ItemBookingStatus from "../Item__Booking__Status/ItemBookingStatus";
import ItemBookingDoPromote from "../Item__Booking_DoPromote/ItemBookingDoPromote";

interface ContainerProps {
  title: string;

  bookingList: typeBooking[];
  isLoading: boolean;
}

const ListBooking: React.FC<ContainerProps> = ({
  title,
  bookingList,
  isLoading,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      <IonList className={styles.list} inset>
        <IonListHeader>
          <IonLabel className={styles.lable}>
            <p>{text[l].subtitle}</p>
            <h1>
              <b>{title}</b>
            </h1>
          </IonLabel>
          <IonLabel className="ion-text-end ion-padding-end">
            {bookingList?.length ?? 0}
          </IonLabel>
        </IonListHeader>
        {bookingList.map((booking: typeBooking, index: number) => {
          return (
            <ItemBookingStatus
              key={
                "ModalWidgetBookingOverviewCalendar" +
                booking.bookingID +
                index +
                "approved"
              }
              booking={booking}
              isLoading={isLoading}
              onClick={() => {}}
            />
          );
        })}
        {bookingList.length === 0 && <ItemBookingDoPromote />}
      </IonList>
    </div>
  );
};

export default ListBooking;
