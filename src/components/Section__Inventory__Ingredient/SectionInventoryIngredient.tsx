import { useContext, useState } from "react";
import styles from "./SectionInventoryIngredient.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/react";
import ListHeader from "../List__Header/ListHeader";
import WidgetIngredientUpdatesByUID from "../Widget__Ingredient__Updates__By__UID/WidgetIngredientUpdatesByUID";

interface ContainerProps {}

const SectionInventoryIngredient: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [selectedUnit, setSelectedUnit] = useState<any>("KG"); // Default unit
  const [price, setPrice] = useState<any>(undefined);

  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      {/* ---- QUANTITA DISPONIBILE */}
      <IonList inset>
        <ListHeader title={text[l].list_quantity} />
        <IonItem lines="none">
          <IonInput
            labelPlacement="stacked"
            label={text[l].input_quantity_stock.label}
            type="number"
            placeholder={text[l].input_quantity_stock.ph}
          ></IonInput>
        </IonItem>
      </IonList>
      <IonLabel>
        <p className="ion-padding-horizontal">
          {text[l].input_quantity_stock.help}
        </p>
      </IonLabel>

      {/* ---- MIN STOCK & NOTIFICATION*/}

      <IonList inset>
        <IonItem>
          <IonInput
            labelPlacement="stacked"
            label={text[l].input_quantity_min.label}
            type="number"
            placeholder={text[l].input_quantity_min.ph}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>{text[l].input_notifications.label}</IonLabel>
          <IonToggle slot="end" />
        </IonItem>
      </IonList>
      <IonLabel>
        <p className="ion-padding-horizontal">
          {text[l].input_quantity_min.help}
        </p>
      </IonLabel>

      {/* ---- UNIT OF MEASURE */}
      <IonList inset>
        <IonItem>
          <IonLabel>{text[l].input_unit.label}</IonLabel>
          <IonSelect
            value={selectedUnit}
            onIonChange={(e) => setSelectedUnit(e.detail.value)}
          >
            <IonSelectOption value="KG">KG</IonSelectOption>
            <IonSelectOption value="g">g</IonSelectOption>
            <IonSelectOption value="l">L</IonSelectOption>
            <IonSelectOption value="pz">pz</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
      <IonLabel>
        <p className="ion-padding-horizontal">{text[l].input_unit.help}</p>
      </IonLabel>

      {/* ---- PRICE */}
      <IonList inset>
        <IonItem>
          <IonInput
            labelPlacement="stacked"
            label={text[l].input_price.label}
            type="number"
            placeholder={text[l].input_price.ph}
            onIonChange={(e) => setPrice(parseFloat(e.detail.value ?? "0"))}
          ></IonInput>
        </IonItem>
      </IonList>
      <IonLabel>
        <p className="ion-padding-horizontal ion-padding-bottom">
          {text[l].input_price.help}
        </p>
      </IonLabel>

      {/* SUPPLY History */}
      <WidgetIngredientUpdatesByUID />
    </div>
  );
};

export default SectionInventoryIngredient;
