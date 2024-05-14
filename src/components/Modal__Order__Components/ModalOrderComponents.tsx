import { useContext, useEffect, useState } from "react";
import styles from "./ModalOrderComponents.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { textButtons } from "../../text/textButtons";
import { typeWidget } from "../../types/typeWidget";
import OrderDetails from "../../pages/Home/components/OrderDetails/OrderDetails";
import ReservationDetails from "../../pages/Home/components/ReservationDetails/ReservationDetails";
import InventoryDetails from "../../pages/Home/components/InventoryDetails/InventoryDetails";
import ReviewsDetails from "../../pages/Home/components/ReviewsDetails/ReviewsDetails";
import AnalyticsDetails from "../../pages/Home/components/AnalyticsDetails/AnalyticsDetails";
import { typeWidgetsCategory } from "../../types/typeWidgetsCategory";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  components: typeWidget[];
  callbackSetComponents: (newVal: typeWidget[]) => void;
}

const ModalOrderComponents: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  components,
  callbackSetComponents,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [componentsLocal, setComponentsLocal] =
    useState<typeWidget[]>(components);

  const [isOrderDisabled, setIsOrderDisabled] = useState<boolean>(true);

  const [allComponents, setAllComponents] = useState<typeWidgetsCategory[]>([
    {
      categoryID: "ordersDetails",
      name: {
        it_IT: "Dettagli ordine",
        en_GB: "Order Details",
      },
      description: "Dettagli ordine",
      widgets: [
        {
          widgetID: "OrderDetails",
          component: <OrderDetails />,
          name: {
            it_IT: "Ordini",
            en_GB: "Order Details",
          },
        },
        {
          widgetID: "ReservationDetails",
          component: <ReservationDetails />,
          name: {
            it_IT: "Prenotazioni",
            en_GB: "Reservation Details",
          },
        },
        {
          widgetID: "InventoryDetails",
          component: <InventoryDetails />,
          name: {
            it_IT: "Inventario",
            en_GB: "Inventory Details",
          },
        },
        {
          widgetID: "ReviewsDetails",
          component: <ReviewsDetails />,
          name: {
            it_IT: "Recensioni",
            en_GB: "Reviews Details",
          },
        },
        {
          widgetID: "AnalyticsDetails",
          component: <AnalyticsDetails />,
          name: {
            it_IT: "Analytics",
            en_GB: "Analytics Details",
          },
        },
      ],
    },
    {
      categoryID: "inventoryDetails",
      name: {
        it_IT: "Inventario",
        en_GB: "Inventory Details",
      },
      description: "Inventario",
      widgets: [
        {
          widgetID: "OrderDetails",
          component: <OrderDetails />,
          name: {
            it_IT: "Ordini",
            en_GB: "Order Details",
          },
        },
        {
          widgetID: "ReservationDetails",
          component: <ReservationDetails />,
          name: {
            it_IT: "Prenotazioni",
            en_GB: "Reservation Details",
          },
        },
        {
          widgetID: "InventoryDetails",
          component: <InventoryDetails />,
          name: {
            it_IT: "Inventario",
            en_GB: "Inventory Details",
          },
        },
        {
          widgetID: "ReviewsDetails",
          component: <ReviewsDetails />,
          name: {
            it_IT: "Recensioni",
            en_GB: "Reviews Details",
          },
        },
        {
          widgetID: "AnalyticsDetails",
          component: <AnalyticsDetails />,
          name: {
            it_IT: "Analytics",
            en_GB: "Analytics Details",
          },
        },
      ],
    },
  ]);
  //FUNCTIONS ------------------------

  // --- handleReorder
  /**
   * Questo metodo serve per riordinare gli elementi nella lista
   * degli widget permettendo all'utente di spostare gli elementi
   * come meglio vuole.
   *
   * @param event CustomEvent
   */
  const handleReorder = (event: CustomEvent) => {
    const reorderedComponents = [...componentsLocal];
    const itemToMove = reorderedComponents.splice(event.detail.from, 1)[0];
    reorderedComponents.splice(event.detail.to, 0, itemToMove);
    setComponentsLocal(reorderedComponents);
  };

  // --- handleSave
  /**
   * Questo metodo serve per salvare l'ordine selezionato
   * dall'utente e chiudere il modal.
   *
   */
  const handleSave = () => {
    callbackSetComponents(componentsLocal);
    setIsOpen(false);
  };

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
          <IonButtons slot="end">
            <IonButton color={"success"} onClick={handleSave}>
              {textButtons[l].btn__upload}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* ------------- CONTENT ------------ */}
        {/* <IonList>
          <IonReorderGroup
            disabled={isOrderDisabled}
            onIonItemReorder={handleReorder}
          >
            {componentsLocal?.map((component: typeWidget, index: number) => (
              <IonItem key={component.widgetID + index}>
                <IonLabel>{component.name[l]}</IonLabel>
                <IonReorder slot="start"></IonReorder>
              </IonItem>
            ))}
          </IonReorderGroup>
        </IonList> */}
        {allComponents.map((category: typeWidgetsCategory, index: number) => (
          <IonList key={category.categoryID + index}>
            <IonListHeader>
              <IonLabel>{category.name[l]}</IonLabel>
            </IonListHeader>
            {category.widgets.map((widget: typeWidget, index: number) => (
              <IonItem key={widget.widgetID + index}>
                <IonLabel>{widget.name[l]}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        ))}
      </IonContent>
    </IonModal>
  );
};

export default ModalOrderComponents;
