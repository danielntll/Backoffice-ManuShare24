import { useContext, useEffect, useState } from "react";
import styles from "./ModalWidgetIngredientsStockStatus.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { typeIngredient } from "../../types/typeIngredient";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { textButtons } from "../../text/textButtons";
import { WidgetInventoryIngredientsStockStatus } from "../../constants/widgets/inventory/WidgetInventoryIngredientsStockStatus";
import ItemIngredientCritic from "../Item__Ingredient_Critic/ItemIngredientCritic";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  ingredientsLowStock: typeIngredient[];
  ingredientsNoStock: typeIngredient[];
  ingredientsExpiredStock: typeIngredient[];
  filter: string;
}

const ModalWidgetIngredientsStockStatus: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  ingredientsLowStock,
  ingredientsNoStock,
  ingredientsExpiredStock,
  filter,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [filterLocal, setFilterLocal] = useState<string>("lowStock");
  //FUNCTIONS ------------------------
  useEffect(() => {
    setFilterLocal(filter);
  }, [filter]);
  //RETURN COMPONENT -----------------
  return (
    <>
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
            <IonTitle>{WidgetInventoryIngredientsStockStatus.name[l]}</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSegment
              value={filterLocal}
              onIonChange={(e) =>
                setFilterLocal(e.target.value?.toString() ?? "lowStock")
              }
            >
              <IonSegmentButton value="lowStock">
                {text[l].filter_lowstock}
              </IonSegmentButton>
              <IonSegmentButton value="noStock">
                {text[l].filter_nostock}
              </IonSegmentButton>
              <IonSegmentButton value="expiredStock">
                {text[l].filter_exiperd}
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* ------------- CONTENT ------------ */}
          <IonList>
            {filterLocal === "lowStock" && (
              <>
                <IonListHeader>
                  <IonLabel className={styles.lable}>
                    {text[l].filter_lowstock}
                  </IonLabel>
                  <IonLabel className="ion-text-end ion-padding-end">
                    {ingredientsLowStock?.length ?? 0}
                  </IonLabel>
                </IonListHeader>
                {ingredientsLowStock.map(
                  (ingredient: typeIngredient, index: number) => {
                    return (
                      <ItemIngredientCritic
                        key={
                          "ModalWidgetIngredientsStockStatus" +
                          ingredient.ingredientID +
                          index
                        }
                        ingredient={ingredient}
                        type={"button"}
                      />
                    );
                  }
                )}
              </>
            )}
            {filterLocal === "noStock" && (
              <>
                <IonListHeader>
                  <IonLabel className={styles.lable}>
                    {text[l].filter_nostock}
                  </IonLabel>
                  <IonLabel className="ion-text-end ion-padding-end">
                    {ingredientsNoStock?.length ?? 0}
                  </IonLabel>
                </IonListHeader>
                {ingredientsNoStock.map(
                  (ingredient: typeIngredient, index: number) => {
                    return (
                      <ItemIngredientCritic
                        key={
                          "ModalWidgetIngredientsStockStatus" +
                          ingredient.ingredientID +
                          index
                        }
                        ingredient={ingredient}
                        type={"button"}
                      />
                    );
                  }
                )}
              </>
            )}
            {filterLocal === "expiredStock" && (
              <>
                <IonListHeader>
                  <IonLabel className={styles.lable}>
                    {text[l].filter_exiperd}
                  </IonLabel>
                  <IonLabel className="ion-text-end ion-padding-end">
                    {ingredientsExpiredStock?.length ?? 0}
                  </IonLabel>
                </IonListHeader>
                {ingredientsExpiredStock.map(
                  (ingredient: typeIngredient, index: number) => {
                    return (
                      <ItemIngredientCritic
                        key={
                          "ModalWidgetIngredientsStockStatus" +
                          ingredient.ingredientID +
                          index
                        }
                        ingredient={ingredient}
                        type={"button"}
                      />
                    );
                  }
                )}
              </>
            )}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ModalWidgetIngredientsStockStatus;
