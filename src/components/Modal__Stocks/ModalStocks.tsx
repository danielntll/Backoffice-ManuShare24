import { useContext } from "react";
import styles from "./ModalStocks.module.css";
import { text } from "./text";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ContextLanguage } from "../../context/contextLanguage";
import { textButtons } from "../../text/textButtons";
import { typeIngredient } from "../../types/typeIngredient";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  title: string;
  ingredients: typeIngredient[];
}

const ModalStocks: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  title,
  ingredients,
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
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* ------------- CONTENT ------------ */}
        <IonList inset>
          {ingredients.map((ingredient: typeIngredient, index: number) => {
            return (
              <IonItem key={index} button detail>
                <IonAvatar slot="start">
                  <img
                    alt="Silhouette of a person's head"
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </IonAvatar>
                <IonLabel>
                  <p>{ingredient.data.marca}</p>
                  <h2>{ingredient.data.nome}</h2>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ModalStocks;
