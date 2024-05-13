import { useContext } from "react";
import styles from "./ReviewsDetails.module.css";
import { text } from "./text";
import { ContextLanguage } from "../../../../context/contextLanguage";
import { IonIcon, IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import { chatbubbleEllipsesOutline, happyOutline } from "ionicons/icons";
import ListHeader from "../../../../components/List__Header/ListHeader";

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
        <ListHeader
          title={text[l].componentTitle}
          callbackListAction={handleListAction}
        />
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
