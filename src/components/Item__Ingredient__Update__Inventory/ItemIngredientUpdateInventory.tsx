import { useContext } from "react";
import styles from "./ItemIngredientUpdateInventory.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonItem, IonLabel } from "@ionic/react";

interface ContainerProps {}

const ItemIngredientUpdateInventory: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonItem>
      <IonLabel>
        <p>{text[l].componentTitle}</p>
        <h3>{text[l].componentTitle}</h3>
      </IonLabel>
    </IonItem>
  );
};

export default ItemIngredientUpdateInventory;
