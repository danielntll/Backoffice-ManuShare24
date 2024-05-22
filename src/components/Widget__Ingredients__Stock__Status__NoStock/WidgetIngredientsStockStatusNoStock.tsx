import { useContext, useEffect, useState } from "react";
import styles from "./WidgetIngredientsStockStatusNoStock.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonList } from "@ionic/react";
import ListHeader from "../List__Header/ListHeader";
import { typeIngredient } from "../../types/typeIngredient";
import { mockIngredients } from "../../mock/mockIngredients";
import { WidgetInventoryIngredientsStockStatusNoStock } from "../../constants/widgets/inventory/WidgetInventoryIngredientsStockStatusNoStock";
import ModalWidgetIngredientsStockStatusNoStock from "../Modal__Widget__Ingredients__Stock__Status__NoStock/ModalWidgetIngredientsStockStatusNoStock";
import ItemIngredientStockStatusNoStock from "../Item__Ingredient__Stock__Status__NoStock/ItemIngredientStockStatusNoStock";

interface ContainerProps {}

const WidgetIngredientsStockStatusNoStock: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  // --- isLoading
  /// Questa variabile serve per indicare se il widget è in caricamento
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // --- selectedIngredient
  /// Questa variabile serve per indicare gli ingredienti selezionati
  const [selectedIngredients, setSelectedIngredients] = useState<
    typeIngredient[]
  >([]);

  // --- isModalHandleIngredientsCriticsOpen
  /// Questa variabile serve per indicare se il modal è aperto dove è presente la lista degli ingredienti con stato critico con la possibilità di selezionare altri ingredienti da visualizzare o di aprire gli ingredienti in stato critico.
  const [
    isModalHandleIngredientsCriticsOpen,
    setIsModalHandleIngredientsCriticsOpen,
  ] = useState<boolean>(false);

  //FUNCTIONS ------------------------
  // --- useEffect
  /** */
  useEffect(() => {
    getSelectedIngredients();
  }, []);

  // --- getSelectedIngredients
  /**
   * Questo metodo serve per scaricare la lista degli ingredienti selezionati
   * e di settare la variabile "selectedIngredients""
   *
   * @param nessuno
   *
   */
  const getSelectedIngredients = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSelectedIngredients([
      mockIngredients[0],
      mockIngredients[1],
      mockIngredients[2],
    ]);
    setIsLoading(false);
  };

  // --- callbackListAction
  /**
   * Questo metodo serve per aprire il modale   * con la lista degli ingredienti con stato critico
   *
   * @param nessuno
   *
   */
  const openModalHandleIngredientsCritics = () => {
    setIsModalHandleIngredientsCriticsOpen(
      !isModalHandleIngredientsCriticsOpen
    );
  };

  // --- handleSetSelectedIngredients
  /**
   * Questo metodo serve per salvare la nuova lista degli ingredienti
   * solo localmente.
   *
   * @param newIngredients - la nuova lista di ingredienti selezionati
   */
  const handleSetSelectedIngredients = (newIngredients: typeIngredient[]) => {
    setSelectedIngredients(newIngredients);
  };
  //RETURN COMPONENT -----------------
  return (
    <>
      <div className={styles.container}>
        <IonList inset>
          <ListHeader
            title={WidgetInventoryIngredientsStockStatusNoStock.name[l]}
            subtitle={
              WidgetInventoryIngredientsStockStatusNoStock.category !==
              undefined
                ? WidgetInventoryIngredientsStockStatusNoStock.category[l]
                : undefined
            }
            callbackListAction={openModalHandleIngredientsCritics}
          />
          {isLoading ? (
            <>
              <ItemIngredientStockStatusNoStock skeleton />
              <ItemIngredientStockStatusNoStock skeleton />
              <ItemIngredientStockStatusNoStock skeleton />
            </>
          ) : (
            <>
              {selectedIngredients.map(
                (ingredient: typeIngredient, index: number) => {
                  return (
                    <ItemIngredientStockStatusNoStock
                      key={
                        "WidgetIngredientsStockStatusNoStock" +
                        ingredient.ingredientID +
                        index
                      }
                      ingredient={ingredient}
                    />
                  );
                }
              )}
            </>
          )}
        </IonList>
      </div>
      {/* ----------------- EXTRA UI ----------------------*/}
      <ModalWidgetIngredientsStockStatusNoStock
        isOpen={isModalHandleIngredientsCriticsOpen}
        setIsOpen={setIsModalHandleIngredientsCriticsOpen}
        ingredients={selectedIngredients}
        callbackSetSelectedIngredients={handleSetSelectedIngredients}
      />
    </>
  );
};

export default WidgetIngredientsStockStatusNoStock;
