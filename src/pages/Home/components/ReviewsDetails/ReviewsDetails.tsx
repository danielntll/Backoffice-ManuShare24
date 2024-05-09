import { useContext } from "react";
import styles from "./ReviewsDetails.module.css";
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
  chatbubbleEllipsesOutline,
  chevronForward,
  fileTrayFullOutline,
  happyOutline,
} from "ionicons/icons";

interface ContainerProps {}

const ReviewsDetails: React.FC<ContainerProps> = ({}) => {
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
          <IonIcon slot="start" icon={chatbubbleEllipsesOutline} />
          <IonLabel>
            <p>Da rispondere</p>
            <h2>Feedback sui prodotti</h2>
          </IonLabel>
          <IonNote slot="end">{5}</IonNote>
        </IonItem>
        <IonItem button={true} onClick={() => {}}>
          <IonIcon slot="start" icon={happyOutline} />
          <IonLabel>
            <p>Da rispondere</p>
            <h2>Feedback sul servizio</h2>
          </IonLabel>
          <IonNote slot="end">{5}</IonNote>
        </IonItem>
      </IonList>
    </div>
  );
};

export default ReviewsDetails;
