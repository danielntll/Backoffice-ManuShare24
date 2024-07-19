import { useContext } from "react";
import styles from "./ItemIngredientUpdateSupply.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonItem, IonLabel } from "@ionic/react";
import { typeSupplyHistory } from "../../db/typeSupplyHistory";

interface ContainerProps {
  supplyHistory: typeSupplyHistory;
}

const ItemIngredientUpdateSupply: React.FC<ContainerProps> = ({
  supplyHistory,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonItem button>
      <IonLabel>
        <p>{supplyHistory.createdAt.toDateString()}</p>
        <h3>
          {supplyHistory.quantity} - {supplyHistory.unit}
        </h3>
      </IonLabel>
    </IonItem>
  );
};

export default ItemIngredientUpdateSupply;
