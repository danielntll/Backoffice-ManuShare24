import { useContext } from "react";
import styles from "./ModalPurchase.module.css";
import { text } from "./text";
import { IonButton, IonContent, IonLabel, IonModal } from "@ionic/react";
import { ContextLanguage } from "../../context/contextLanguage";
import ReviewsDetails from "../ReviewsDetails/ReviewsDetails";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
}

const ModalPurchase: React.FC<ContainerProps> = ({ isOpen, setIsOpen }) => {
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
      initialBreakpoint={0.5}
      breakpoints={[0.5, 0.75, 0.9]}
    >
      <IonContent className="ion-padding-top">
        {/* ------------- CONTENT ------------ */}
        <ReviewsDetails />
        <div className="ion-padding">
          <IonButton expand="block" color={"success"}>
            {text[l].btn__subscription}
          </IonButton>

          <IonLabel>
            <p className="ion-text-center"> {text[l].otherwise}</p>
          </IonLabel>

          <IonButton fill="outline" expand="block">
            {text[l].btn__purchase} $0.90/mese
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ModalPurchase;
