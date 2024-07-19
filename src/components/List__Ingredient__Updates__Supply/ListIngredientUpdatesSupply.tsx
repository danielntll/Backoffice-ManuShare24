import { useContext, useEffect, useState } from "react";
import styles from "./ListIngredientUpdatesSupply.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonList } from "@ionic/react";
import ListHeader from "../List__Header/ListHeader";
import { typeSupplyHistory } from "../../db/typeSupplyHistory";
import ItemIngredientUpdateSupply from "../Item__Ingredient__Update__Supply/ItemIngredientUpdateSupply";
import { mockSupplyHistory } from "../../mock/mockSupplyHistory";

interface ContainerProps {}

const ListIngredientUpdatesSupply: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [supplyUpdates, setSupplyUpdates] =
    useState<typeSupplyHistory[]>(mockSupplyHistory);
  //FUNCTIONS ------------------------
  useEffect(() => {}, []);
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      <IonList inset>
        <ListHeader title={text[l].componentTitle} />
        {supplyUpdates.map((update: typeSupplyHistory) => {
          return (
            <ItemIngredientUpdateSupply
              key={update.UID}
              supplyHistory={update}
            />
          );
        })}
      </IonList>
    </div>
  );
};

export default ListIngredientUpdatesSupply;
