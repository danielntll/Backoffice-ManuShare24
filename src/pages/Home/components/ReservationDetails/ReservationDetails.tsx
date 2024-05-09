import { useContext } from "react";
import styles from "./ReservationDetails.module.css";
import { text } from "./text";
import { ContextLanguage } from "../../../../context/contextLanguage";
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
} from "@ionic/react";
import { textButtons } from "../../../../text/textButtons";
import {
  calendarNumber,
  calendarNumberOutline,
  calendarOutline,
  chevronForward,
} from "ionicons/icons";

interface ContainerProps {}

const ReservationDetails: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  // --- handleListAction
  /**
   * Questo metodo è il button sul titolo della lista.
   *
   * Si occuperà di aprire la pagina dei dettagli degli ordini.
   *
   * PARAMS:
   * - Nessuno
   */
  const handleListAction = () => {};

  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      <IonList inset>
        <IonListHeader>
          <IonLabel>{text[l].componentTitle}</IonLabel>
          <IonButton onClick={handleListAction}>
            {textButtons[l].btn__go_to_page}
            <IonIcon icon={chevronForward} />
          </IonButton>
        </IonListHeader>
        <IonItem button={true} onClick={() => {}}>
          <IonIcon
            color={"success"}
            slot="start"
            icon={calendarNumberOutline}
          />
          <IonLabel>
            <p>Oggi</p>
            <h2>Approvate</h2>
          </IonLabel>
          <IonNote slot="end">{5}</IonNote>
        </IonItem>
        <IonItem button={true} onClick={() => {}}>
          <IonIcon
            color={"warning"}
            slot="start"
            icon={calendarNumberOutline}
          />
          <IonLabel>
            <p>Oggi</p>
            <h2>Da approvare</h2>
          </IonLabel>
          <IonNote slot="end">{5}</IonNote>
        </IonItem>
        <IonItem button={true} onClick={() => {}}>
          <IonIcon color={"success"} slot="start" icon={calendarOutline} />
          <IonLabel>
            <p>Prossime</p>
            <h2>Approvate</h2>
          </IonLabel>
          <IonNote slot="end">{5}</IonNote>
        </IonItem>
        <IonItem button={true} onClick={() => {}}>
          <IonIcon color={"warning"} slot="start" icon={calendarOutline} />
          <IonLabel>
            <p>Prossime</p>
            <h2>Da approvare</h2>
          </IonLabel>
          <IonNote slot="end">{5}</IonNote>
        </IonItem>
      </IonList>
    </div>
  );
};

export default ReservationDetails;
