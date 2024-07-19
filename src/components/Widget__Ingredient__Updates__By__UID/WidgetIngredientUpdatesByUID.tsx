import { useContext, useState } from "react";
import styles from "./WidgetIngredientUpdatesByUID.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import ListHeader from "../List__Header/ListHeader";
import { calendarOutline, stopwatchOutline } from "ionicons/icons";
import ModalIngredientUpdates from "../Modal__Ingredient__Updates/ModalIngredientUpdates";

interface ContainerProps {}

const WidgetIngredientUpdatesByUID: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      <IonList inset>
        <ListHeader
          title={text[l].componentTitle}
          buttonText={text[l].componentButton}
          callbackOnClick={() => setIsOpen(!isOpen)}
        />
        <IonItem>
          <IonIcon className="ion-padding-end" icon={calendarOutline} />
          <IonLabel>
            <p>{text[l].lastSupply}</p>
            <h3>15/05/2022</h3>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon className="ion-padding-end" icon={stopwatchOutline} />
          <IonLabel>
            <p>{text[l].lastUpdate}</p>
            <h3>15/05/2022</h3>
          </IonLabel>
        </IonItem>
      </IonList>

      {/* MODAL INGREDIENT UPDATES */}
      <ModalIngredientUpdates isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default WidgetIngredientUpdatesByUID;
