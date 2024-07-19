import { useContext } from "react";
import styles from "./ItemDietaryRestriction.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonCheckbox, IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { typeDietaryRestictions } from "../../db/typeDietaryRestictions";

interface ContainerProps {
  dietaryRestriction: typeDietaryRestictions;
  isSelected: boolean;
  callbackOnClick: () => void;
}

const ItemDietaryRestriction: React.FC<ContainerProps> = ({
  dietaryRestriction,
  isSelected,
  callbackOnClick,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonItem onClick={callbackOnClick}>
      <IonThumbnail className={styles.thumbnail}>
        <img
          src={dietaryRestriction.iconURL.white}
          alt={dietaryRestriction.name[l]}
        />
      </IonThumbnail>
      <IonLabel className="ion-margin-start">
        <IonCheckbox checked={isSelected} justify="space-between">
          <h3>{dietaryRestriction.name[l]}</h3>
        </IonCheckbox>
      </IonLabel>
    </IonItem>
  );
};

export default ItemDietaryRestriction;
