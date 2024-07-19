import { useContext } from "react";
import styles from "./ModalAllergens.module.css";
import { text } from "./text";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ContextLanguage } from "../../context/contextLanguage";
import { textButtons } from "../../text/textButtons";
import { typeAllergens } from "../../db/typeAllergens";
import { constAllergens } from "../../constants/constAllergens";
import ItemAllergen from "../Item__Allergen/ItemAllergen";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  allergens: typeAllergens[];
  callbackAllergenOnClick: (selectedAllergens: typeAllergens) => void;
}

const ModalAllergens: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  allergens,
  callbackAllergenOnClick,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={() => setIsOpen(false)}
      className={styles.container}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color={"medium"} onClick={() => setIsOpen(false)}>
              {textButtons[l].btn__close}
            </IonButton>
          </IonButtons>
          <IonTitle>{text[l].componentTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* ------------- CONTENT ------------ */}
        <IonList inset>
          {constAllergens.map((allergen: typeAllergens) => {
            //VARIABLES ------------------------
            //CONDITIONS -----------------------
            //FUNCTIONS ------------------------
            //RETURN COMPONENT -----------------
            return (
              <ItemAllergen
                key={"ModalAllergens-" + allergen.UID}
                allergen={allergen}
                isSelected={allergens.includes(allergen)}
                callbackOnClick={() => callbackAllergenOnClick(allergen)}
              />
            );
          })}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ModalAllergens;
