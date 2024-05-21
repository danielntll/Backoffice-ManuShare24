import { useContext, useEffect, useState } from "react";
import styles from "./WidgetIngredientsLowStock.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonList } from "@ionic/react";
import ListHeader from "../List__Header/ListHeader";
import { WidgetInventoryIngredientsLowStock } from "../../constants/widgets/inventory/WidgetInventoryIngredientsLowStock";
import { typeIngredient } from "../../types/typeIngredient";
import { mockIngredients } from "../../mock/mockIngredients";
import ItemIngredientsStockOveriview from "../Item__Ingredients__Stock__Overiview/ItemIngredientsStockOveriview";
import { close, trashOutline, trendingDown } from "ionicons/icons";
import { typeFilterWidgetLowStock } from "../../types/typeFilterWidgetLowStock";
import ModalWidgetIngredientsLowStock from "../Modal__Widget__Ingredients__Low__Stock/ModalWidgetIngredientsLowStock";

interface ContainerProps {}

const WidgetIngredientsLowStock: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  // --- isModalOpen
  /// Questa variabile serve per indicare se il modal è aperto dove è presente
  /// la lista degli ingredienti con lo stato selezionato.
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // --- isFetching
  /// Indica se la fetch degli ingredienti è in corso.
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // --- ingredientsLowStock
  /// Lista di ingredienti con stock sotto il limite impostato
  const [ingredientsLowStock, setIngredientsLowStock] = useState<
    typeIngredient[] | null
  >(null);
  // --- ingredientsNoStock
  /// Lista di ingredienti senza stock
  const [ingredientsNoStock, setIngredientsNoStock] = useState<
    typeIngredient[] | null
  >(null);
  // --- ingredientsExpiredStock
  /// Lista di ingredienti scaduti
  const [ingredientsExpiredStock, setIngredientsExpiredStock] = useState<
    typeIngredient[] | null
  >(null);

  // --- filter
  /// Stato del filtro
  const [filter, setFilter] = useState<typeFilterWidgetLowStock>("lowStock");

  //FUNCTIONS ------------------------
  // --- useEffect [ingredientsLowStock, ingredientsNoStock, ingredientsExpiredStock]
  /**
   * 1. Inizializza tutti i dati
   */
  useEffect(() => {
    if (
      ingredientsLowStock === null ||
      ingredientsNoStock === null ||
      ingredientsExpiredStock === null
    ) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
    }

    if (ingredientsLowStock === null) {
      fetchIngredientsLowStock();
    }
    if (ingredientsNoStock === null) {
      fetchIngredientsNoStock();
    }
    if (ingredientsExpiredStock === null) {
      fetchIngredientsExpiredStock();
    }
  }, [ingredientsLowStock, ingredientsNoStock, ingredientsExpiredStock]);

  // --- fetchIngredientsLowStock
  /**
   *  Questa funzione scarica gli ingredienti con uno
   * stock inferiore al limite impostato.
   *
   * @param nessuno
   *
   */
  const fetchIngredientsLowStock = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIngredientsLowStock([mockIngredients[0], mockIngredients[1]]);
  };

  // --- fetchIngredientsNoStock
  /**
   *  Questa funzione scarica gli ingredienti senza stock.
   *
   * @param nessuno
   *
   */

  const fetchIngredientsNoStock = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIngredientsNoStock([mockIngredients[2], mockIngredients[3]]);
  };

  // --- fetchIngredientsExpiredStock
  /**
   *  Questa funzione scarica gli ingredienti scaduti.
   *
   * @param nessuno
   *
   */

  const fetchIngredientsExpiredStock = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIngredientsExpiredStock([mockIngredients[4]]);
  };

  // --- callbackListAction
  /**
   * Questo metodo serve per aprire il modale
   * con la lista degli ingredienti con lo stato
   * selezionato.
   *
   * @param nessuno
   *
   */
  const handleOpenModal = (filter: typeFilterWidgetLowStock) => {
    setFilter(filter);
    setIsModalOpen(!isModalOpen);
  };
  //RETURN COMPONENT -----------------
  return (
    <>
      <div className={styles.container}>
        <IonList inset>
          <ListHeader
            title={WidgetInventoryIngredientsLowStock.name[l]}
            subtitle={
              WidgetInventoryIngredientsLowStock.category !== undefined
                ? WidgetInventoryIngredientsLowStock.category[l]
                : undefined
            }
            callbackListAction={() => handleOpenModal("lowStock")}
          />
          <ItemIngredientsStockOveriview
            title={text[l].item_LowStock_title}
            subtitle={text[l].item_LowStock_subtitle}
            icon={trendingDown}
            number={ingredientsLowStock?.length ?? 0}
            callbackClick={() => handleOpenModal("lowStock")}
            skeleton={isFetching}
          />
          <ItemIngredientsStockOveriview
            title={text[l].item_NoStock_title}
            subtitle={text[l].item_NoStock_subtitle}
            icon={close}
            number={ingredientsNoStock?.length ?? 0}
            callbackClick={() => handleOpenModal("noStock")}
            skeleton={isFetching}
          />
          <ItemIngredientsStockOveriview
            title={text[l].item_Expired_title}
            subtitle={text[l].item_Expired_subtitle}
            icon={trashOutline}
            number={ingredientsExpiredStock?.length ?? 0}
            callbackClick={() => handleOpenModal("expiredStock")}
            skeleton={isFetching}
          />
        </IonList>
      </div>
      {/* ----------------- EXTRA UI ----------------------*/}
      <ModalWidgetIngredientsLowStock
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        filter={filter}
        ingredientsLowStock={ingredientsLowStock ?? []}
        ingredientsNoStock={ingredientsNoStock ?? []}
        ingredientsExpiredStock={ingredientsExpiredStock ?? []}
      />
    </>
  );
};

export default WidgetIngredientsLowStock;
