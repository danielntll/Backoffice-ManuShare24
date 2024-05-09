import { useContext } from "react";
import styles from "./AnalyticsDetails.module.css";

import { text } from "./text";
import { ContextLanguage } from "../../../../context/contextLanguage";
import {
  IonBadge,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import {
  chevronForward,
  diamondOutline,
  earthOutline,
  trendingUp,
} from "ionicons/icons";
import { textButtons } from "../../../../text/textButtons";

interface ContainerProps {}

const AnalyticsDetails: React.FC<ContainerProps> = ({}) => {
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
        <IonItem button>
          <IonIcon slot="start" icon={earthOutline} />
          <IonLabel>
            <p>Oggi</p>
            <h2>Visite</h2>
          </IonLabel>
          <IonBadge color={"medium"}>25</IonBadge>
        </IonItem>
        <IonItem button>
          <IonIcon color={"success"} slot="start" icon={trendingUp} />
          <IonLabel>
            <p>Categoria più vista</p>
            <h2>Colazione</h2>
          </IonLabel>
          <IonBadge color={"success"}>+3</IonBadge>
        </IonItem>
        <IonItem button>
          <IonIcon color={"success"} slot="start" icon={diamondOutline} />
          <IonLabel>
            <p>Prodotto più ordinato</p>
            <h2>Brioche</h2>
          </IonLabel>
          <IonBadge color={"success"}>+25</IonBadge>
        </IonItem>
      </IonList>
    </div>
  );
};

export default AnalyticsDetails;
