import { useContext, useState } from "react";
import styles from "./ModalIngredientUpdates.module.css";
import { text } from "./text";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ContextLanguage } from "../../context/contextLanguage";
import { textButtons } from "../../text/textButtons";
import ListIngredientUpdatesSupply from "../List__Ingredient__Updates__Supply/ListIngredientUpdatesSupply";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
}

const ModalIngredientUpdates: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const [selectedSegment, setSelectedSegment] = useState<any>("Supplies"); // Default segment

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
        <IonToolbar>
          <IonSegment
            scrollable={true}
            value={selectedSegment}
            onIonChange={(e) => setSelectedSegment(e.detail.value)}
          >
            <IonSegmentButton value="Supplies">
              {text[l].segments.supplies}
            </IonSegmentButton>
            <IonSegmentButton value="Inventory">
              {text[l].segments.inventoryUpdate}
            </IonSegmentButton>
            <IonSegmentButton value="Details">
              {text[l].segments.detailsUpdate}
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* ------------- CONTENT ------------ */}
        {selectedSegment === "Supplies" && <ListIngredientUpdatesSupply />}
        {selectedSegment === "Inventory" && <ListIngredientUpdatesSupply />}
        {selectedSegment === "Details" && <ListIngredientUpdatesSupply />}
      </IonContent>
    </IonModal>
  );
};

export default ModalIngredientUpdates;
