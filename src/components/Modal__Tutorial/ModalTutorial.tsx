import { useContext } from "react";
import styles from "./ModalTutorial.module.css";
import { text } from "./text";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ContextLanguage } from "../../context/contextLanguage";
import { textButtons } from "../../text/textButtons";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
}

const ModalTutorial: React.FC<ContainerProps> = ({ isOpen, setIsOpen }) => {
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
      <IonContent className="ion-padding">
        {/* ------------- CONTENT ------------ */}
      </IonContent>
    </IonModal>
  );
};

export default ModalTutorial;
