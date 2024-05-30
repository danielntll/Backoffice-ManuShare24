import { useContext } from "react";
import styles from "./ItemBookingDoPromote.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonChip, IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { calendarClearOutline, checkmark } from "ionicons/icons";

interface ContainerProps {}

const ItemBookingDoPromote: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------

  // --- handleOpenDoPromote()
  /**
   * Questo metodo serve per aprire la pagina per effettuare
   * una promozione di un evento.
   *
   *
   */
  const handleOpenDoPromote = () => {
    console.log("click");
  };
  //RETURN COMPONENT -----------------
  return (
    <IonItem button onClick={handleOpenDoPromote}>
      <IonIcon slot="start" icon={calendarClearOutline} color="medium" />
      <IonLabel>
        <p>{text[l].subtitle}</p>
        <h2>{text[l].title}</h2>
      </IonLabel>
      <IonNote slot="end">
        <IonChip color={"success"}>{text[l].cta}</IonChip>
      </IonNote>
    </IonItem>
  );
};

export default ItemBookingDoPromote;
