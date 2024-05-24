import { useContext } from "react";
import styles from "./ItemBookingPending.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonItem, IonLabel } from "@ionic/react";
import { typeBooking } from "../../types/typeBooking";
import { dateHHMM } from "../../utils/dateHHMM";

interface ContainerProps {
  booking: typeBooking;
  onClick: () => void;
}

const ItemBookingPending: React.FC<ContainerProps> = ({ booking, onClick }) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonItem button onClick={onClick}>
      <IonLabel>
        <h2>{dateHHMM(booking.bookingDate)}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default ItemBookingPending;
