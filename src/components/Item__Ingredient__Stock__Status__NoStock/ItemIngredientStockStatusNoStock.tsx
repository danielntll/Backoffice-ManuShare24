import { useContext, useEffect, useState } from "react";
import styles from "./ItemIngredientStockStatusNoStock.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonAvatar,
  IonBadge,
  IonItem,
  IonLabel,
  IonNote,
  IonReorder,
  IonSkeletonText,
  IonToggle,
} from "@ionic/react";
import { typeIngredient } from "../../types/typeIngredient";
import { typeListModify } from "../../types/typeListModify";
import { dateGGMMAAAA } from "../../utils/dateGGMMAAAA";

interface ContainerProps {
  ingredient?: typeIngredient;
  skeleton?: boolean;
  type?: typeListModify;
  isSelected?: boolean;
  callbackSelect?: () => void;
}

const ItemIngredientStockStatusNoStock: React.FC<ContainerProps> = ({
  ingredient,
  skeleton = false,
  type = "button",
  isSelected = false,
  callbackSelect,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [data, setData] = useState<string>("");
  //FUNCTIONS ------------------------

  useEffect(() => {
    if (ingredient && ingredient?.storico_forniture) {
      setData(dateGGMMAAAA(ingredient?.storico_forniture[0].createdAt));
    }
  }, [ingredient]);

  // --- openIngredientPage
  /**
   * Questo metodo serve per aprire la pagina con i dettagli dell'ingrediente
   *
   * @param ingredientID - l'ID dell'ingrediente da aprire
   */
  const openIngredientPage = (ingredientID: string) => {
    if (skeleton) return;
    console.log("Open ingredientID ", ingredientID, " page");
  };

  //RETURN COMPONENT -----------------
  return (
    <IonItem
      button={type === "button" ? true : false}
      onClick={() => {
        openIngredientPage(ingredient?.ingredientID ?? "");
      }}
    >
      <IonAvatar slot="start">
        {skeleton ? (
          <IonSkeletonText animated={true}></IonSkeletonText>
        ) : (
          <img
            alt="Silhouette of a person's head"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        )}
      </IonAvatar>
      <IonLabel>
        <h2>
          {skeleton ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            ingredient?.data.nome
          )}
        </h2>
        <p>
          {skeleton ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            text[l].critic_limit
          )}
        </p>
      </IonLabel>
      {type === "reorder" ? (
        <IonReorder slot="end"></IonReorder>
      ) : type === "selecting" ? (
        <IonToggle
          slot="end"
          checked={isSelected}
          onIonChange={callbackSelect}
        />
      ) : (
        <IonNote slot="end">
          {skeleton ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            data
          )}
        </IonNote>
      )}
    </IonItem>
  );
};

export default ItemIngredientStockStatusNoStock;
