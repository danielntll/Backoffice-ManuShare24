import { useContext } from "react";
import styles from "./ItemAllergen.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonCheckbox, IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { typeAllergens } from "../../db/typeAllergens";

interface ContainerProps {
  allergen: typeAllergens;
  isSelected: boolean;
  callbackOnClick: () => void;
}

const ItemAllergen: React.FC<ContainerProps> = ({
  allergen,
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
        <img src={allergen.iconURL.white} alt={allergen.name[l]} />
      </IonThumbnail>
      <IonLabel className="ion-margin-start">
        <IonCheckbox checked={isSelected} justify="space-between">
          <h3>{allergen.name[l]}</h3>
        </IonCheckbox>
      </IonLabel>
    </IonItem>
  );
};

export default ItemAllergen;
