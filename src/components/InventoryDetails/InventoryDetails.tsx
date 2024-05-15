import { useContext } from "react";
import styles from "./InventoryDetails.module.css";
import { text } from "./text";
import { ContextLanguage } from "../../context/contextLanguage";
import { IonIcon, IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import {
  calendarNumberOutline,
  calendarOutline,
  fileTrayFullOutline,
  fileTrayOutline,
} from "ionicons/icons";
import ListHeader from "../List__Header/ListHeader";
import ItemInventoryStockUnderLimit from "../Item__Inventory_Stock_Under_Limit/ItemInventoryStockUnderLimit";

interface ContainerProps {}

const InventoryDetails: React.FC<ContainerProps> = ({}) => {
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
        {/* -------------- */}
        <ItemInventoryStockUnderLimit />
        {/* -------------- */}
        <IonItem button={true} onClick={() => {}}>
          <IonIcon color={"danger"} slot="start" icon={fileTrayOutline} />
          <IonLabel>
            <p>Scorte</p>
            <h2>Esaurite</h2>
          </IonLabel>
          <IonNote slot="end">{5}</IonNote>
        </IonItem>
        <IonItem button={true} onClick={() => {}}>
          <IonIcon color={"warning"} slot="start" icon={calendarOutline} />
          <IonLabel>
            <p>Scorte</p>
            <h2>In scadenza</h2>
          </IonLabel>
          <IonNote slot="end">{5}</IonNote>
        </IonItem>
        <IonItem button={true} onClick={() => {}}>
          <IonIcon color={"danger"} slot="start" icon={calendarNumberOutline} />
          <IonLabel>
            <p>Scorte</p>
            <h2>Scadute</h2>
          </IonLabel>
          <IonNote slot="end">{5}</IonNote>
        </IonItem>
      </IonList>
    </div>
  );
};

export default InventoryDetails;
