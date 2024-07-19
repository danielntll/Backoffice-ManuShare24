import { useContext } from "react";
import styles from "./ModalDietaryRestriction.module.css";
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
import ItemAllergen from "../Item__Allergen/ItemAllergen";
import { typeDietaryRestictions } from "../../db/typeDietaryRestictions";
import { constDietaryRestrictions } from "../../constants/constDietaryRestriction";
import ItemDietaryRestriction from "../Item__Dietary__Restriction/ItemDietaryRestriction";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  dietaryRestrictions: typeDietaryRestictions[];
  callbackDietaryRestrictionOnClick: (
    selectedDietaryRestriction: typeDietaryRestictions
  ) => void;
}

const ModalDietaryRestriction: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  dietaryRestrictions,
  callbackDietaryRestrictionOnClick,
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
          {constDietaryRestrictions.map(
            (dietaryRestriction: typeDietaryRestictions) => {
              //VARIABLES ------------------------
              //CONDITIONS -----------------------
              //FUNCTIONS ------------------------
              //RETURN COMPONENT -----------------
              return (
                <ItemDietaryRestriction
                  key={"ModalDietaryRestriction-" + dietaryRestriction.UID}
                  dietaryRestriction={dietaryRestriction}
                  isSelected={dietaryRestrictions.includes(dietaryRestriction)}
                  callbackOnClick={() =>
                    callbackDietaryRestrictionOnClick(dietaryRestriction)
                  }
                />
              );
            }
          )}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ModalDietaryRestriction;
