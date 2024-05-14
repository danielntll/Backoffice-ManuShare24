import { useContext, useEffect, useState } from "react";
import styles from "./ModalOrderComponents.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { textButtons } from "../../text/textButtons";
import { typeWidget } from "../../types/typeWidget";
import { constWidgets } from "../../constants/widgets/constWidgets";
import { typeWidgetAvailableToUser } from "../../types/typeWidgetAvailableToUser";
import { mockWidgetsAvailabeToUser } from "../../mock/mockWidgetsAvailabeToUser";
import {
  cart,
  cartOutline,
  checkmark,
  checkmarkCircleOutline,
  lockClosed,
  lockOpen,
} from "ionicons/icons";

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

  const [allComponents, setAllComponents] =
    useState<typeWidget[]>(constWidgets);

  const [avilableComponents, setAvilableComponents] = useState<
    typeWidgetAvailableToUser[]
  >([]);
  //FUNCTIONS ------------------------
  useEffect(() => {
    setAvilableComponents(mockWidgetsAvailabeToUser);
  }, []);

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

  const handleToggleWidget = (widget: typeWidget) => {
    const newComponentsLocal = componentsLocal.filter(
      (c) => c.widgetID !== widget.widgetID
    );
    if (newComponentsLocal.length === componentsLocal.length) {
      newComponentsLocal.push({
        widgetID: widget.widgetID,
        component: widget.component,
        name: widget.name,
        description: widget.description,
      });
    }
    setComponentsLocal(newComponentsLocal);
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
        <IonList inset>
          {allComponents.map((widget: typeWidget, index: number) => {
            let isNotAvailable = avilableComponents.every(
              (c) => c.widgetID !== widget.widgetID
            );
            return (
              <IonItem key={widget.widgetID + index} button={isNotAvailable}>
                {isNotAvailable ? (
                  <IonIcon slot="start" icon={lockClosed} size="small" />
                ) : (
                  <></>
                )}

                <IonLabel>
                  <h2 className="inline-row-gap">
                    {isNotAvailable ? (
                      <IonBadge color={"success"}>Premium</IonBadge>
                    ) : (
                      <></>
                    )}
                    {widget.name[l]}
                  </h2>
                  <p>{widget.description[l]}</p>
                </IonLabel>
                {!isNotAvailable ? (
                  <IonToggle
                    slot="end"
                    checked={componentsLocal.some(
                      (c) => c.widgetID === widget.widgetID
                    )}
                    onIonChange={() => handleToggleWidget(widget)}
                  />
                ) : (
                  <></>
                )}
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ModalOrderComponents;
