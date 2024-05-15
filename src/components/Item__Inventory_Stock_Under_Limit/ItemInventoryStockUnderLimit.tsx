import { useContext, useEffect, useState } from "react";
import styles from "./ItemInventoryStockUnderLimit.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { fileTrayFullOutline } from "ionicons/icons";
import ModalStocks from "../Modal__Stocks/ModalStocks";
import { typeIngredient } from "../../types/typeIngredient";
import { mockIngredients } from "../../mock/mockIngredients";

interface ContainerProps {}

const ItemInventoryStockUnderLimit: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------

  // --- isModalStocksOpen
  ///Questa variabile serve per settare se la modalStocks è aperta o chiusa
  const [isModalStocksOpen, setIsModalStocksOpen] = useState<boolean>(false);

  // --- ingredients
  ///Questa variabile contiene tutti gli ingredienti che sono sotto il limite di stock. Viene settato dal Context degli Ingredienti
  const [ingredients, setIngredients] = useState<typeIngredient[]>([]);
  //FUNCTIONS ------------------------
  useEffect(() => {
    setIngredients(mockIngredients);
  }, []);

  // --- handleToggleModalStocks()
  /** */
  const handleToggleModalStocks = () => {
    setIsModalStocksOpen(!isModalStocksOpen);
  };

  //RETURN COMPONENT -----------------
  return (
    <>
      <IonItem button={true} onClick={handleToggleModalStocks}>
        <IonIcon color={"warning"} slot="start" icon={fileTrayFullOutline} />
        <IonLabel>
          <p>{text[l].category}</p>
          <h2>{text[l].title}</h2>
        </IonLabel>
        <IonNote slot="end">{ingredients.length}</IonNote>
      </IonItem>
      {/* ----------------- EXTRA UI ----------------------*/}
      <ModalStocks
        title={text[l].title}
        ingredients={ingredients}
        isOpen={isModalStocksOpen}
        setIsOpen={setIsModalStocksOpen}
      />
    </>
  );
};

export default ItemInventoryStockUnderLimit;
