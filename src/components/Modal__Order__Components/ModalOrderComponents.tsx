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
  IonListHeader,
  IonModal,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { textButtons } from "../../text/textButtons";
import { typeWidget } from "../../types/typeWidget";
import { typeWidgetAvailableToUser } from "../../types/typeWidgetAvailableToUser";
import { mockWidgetsAvailabeToUser } from "../../mock/mockWidgetsAvailabeToUser";
import {
  lockClosed,
  reorderFour,
  reorderThree,
  toggleOutline,
} from "ionicons/icons";
import {
  constWidgetsFREE,
  constWidgetsPRO,
  constWidgetsSTANDARD,
} from "../../constants/widgets/constWidgets";
import ModalPurchase from "../Modal__Purchase/ModalPurchase";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  widgets: typeWidget[];
  callbackUpdateWidgets: (newVal: typeWidget[]) => void;
}

const ModalOrderComponents: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  widgets,
  callbackUpdateWidgets,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------

  // --- isOrderEnabled
  /**
   * Questa variabile serve per visualizzare o meno la lista per ordinare
   * la disposizione degli widget nella schermata HomePage.
   */
  const [isOrderEnabled, setIsOrderEnabled] = useState<boolean>(false);

  // --- widgetsLocal
  /// Questa varibile contiene una copia locale degli widget della HomePage
  /// Viene settato sul useEffect [widgets]
  const [widgetsLocal, setWidgetsLocal] = useState<typeWidget[]>([]);

  // --- avilableComponents
  /// Questa varibile contiene tutti gli widget disponibili all'utente in base
  /// al suo profilo o acquisti. Viene settato sul useEffect [isOpen]
  const [avilableComponents, setAvilableComponents] = useState<
    typeWidgetAvailableToUser[]
  >([]);

  // --- needToSave
  /// Questa variabile serve per capire se ci sono stati dei cambiamenti rispetto ai dati originali.
  /// Viene settato sul useEffect [widgetsLocal]
  const [needToSave, setNeedToSave] = useState<boolean>(false);

  // --- isModalPurchaseOpen
  /// Questa variabile serve per capire se il modale di acquisto è aperto.
  const [isModalPurchaseOpen, setIsModalPurchaseOpen] =
    useState<boolean>(false);

  //FUNCTIONS ------------------------

  // --- useEffect [widgets]
  /**
   * Questo useEffect serve:
   * 1. Creare una copia locale degli widgets ogni volta che questi cambiano.
   */
  useEffect(() => {
    setWidgetsLocal(widgets);
  }, [widgets]);

  // --- useEffect [isOpen]
  /**
   * Questo useEffect serve:
   * 1. Per scaricare gli widget dell'utente se il modale è aperto
   */
  useEffect(() => {
    if (isOpen) {
      getUserWidgets();
    }
  }, [isOpen]);

  // --- useEffect [widgetsLocal]
  /**
   * Questo useEffect serve:
   * 1 - Per capire se ci sono stati dei cambiamenti rispetto ai dati originali
   * Se sì compare il tasto salva per permette di sovrascrivere con i dati aggiornati.
   *
   */
  useEffect(() => {
    if (widgetsLocal !== widgets) {
      setNeedToSave(true);
    } else {
      setNeedToSave(false);
    }
  }, [widgetsLocal]);

  // --- getUserWidgets()
  /**
   * Questa funzione serve per fare una chiamata API e
   * scaricare gli widget disponibili all'utente in base
   * al suo profilo o acquisti.
   *
   */
  const getUserWidgets = async () => {
    //Chiamata API
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const resp = mockWidgetsAvailabeToUser;
    setAvilableComponents(resp);
  };

  // --- handleReorder()
  /**
   * Questo metodo serve per riordinare gli elementi nella lista
   * degli widget permettendo all'utente di spostare gli elementi
   * come meglio vuole.
   *
   * @param event CustomEvent
   */
  const handleReorder = (event: CustomEvent) => {
    const reorderedComponents = [...widgetsLocal];
    const itemToMove = reorderedComponents.splice(event.detail.from, 1)[0];
    reorderedComponents.splice(event.detail.to, 0, itemToMove);
    setWidgetsLocal(reorderedComponents);
    event.detail.complete();
  };

  // --- handleSave
  /**
   * Questo metodo serve per salvare l'ordine selezionato
   * dall'utente e chiudere il modal.
   *
   */
  const handleSave = () => {
    callbackUpdateWidgets(widgetsLocal);
    setNeedToSave(false);
  };

  // --- handleCloseModal()
  /**
   * Questo metodo serve per chiudere il modal.
   * E resettare gli elementi
   *
   */
  const handleCloseModal = () => {
    setWidgetsLocal(widgets);
    setIsOpen(false);
  };

  // --- handleToggleWidget()
  /**
   * La funzione handleToggleWidget gestisce l'attivazione o disattivazione di
   * un widget all'interno del modal. Prende come argomento un oggetto widget e
   * svolge le seguenti azioni:
   * Filtra la lista corrente di componenti: Crea un nuovo array
   * newComponentsLocal contenente tutti i componenti tranne quello passato
   * come argomento (widget).
   *
   * Verifica se il widget era precedentemente selezionato: Confronta la
   * lunghezza del nuovo array con l'array originale. Se sono uguali, significa
   * che il widget era precedentemente selezionato e deve essere aggiunto
   * nuovamente alla lista.
   *
   * Aggiunge il widget alla lista: Se il widget era precedentemente
   * selezionato, lo aggiunge nuovamente all'array newComponentsLocal.
   *
   * Aggiorna lo stato: Infine, aggiorna la variabile di stato componentsLocal
   * con il nuovo array newComponentsLocal, riflettendo la modifica nella
   * disponibilità del widget.
   *
   * @param widget typeWidget - Widget selezionato dall'utente
   */
  const handleToggleWidget = (widget: typeWidget) => {
    const newComponentsLocal = widgetsLocal.filter(
      (c) => c.widgetID !== widget.widgetID
    );
    if (newComponentsLocal.length === widgetsLocal.length) {
      newComponentsLocal.push(widget);
    }
    setWidgetsLocal(newComponentsLocal);
  };

  // --- handleToggleOrdierList()
  /** */
  const handleToggleOrdierList = () => {
    setIsOrderEnabled(!isOrderEnabled);
  };

  // --- handleTogglePurchaseModal()
  /**
   *
   */
  const handleTogglePurchaseModal = () => {
    setIsModalPurchaseOpen(!isModalPurchaseOpen);
  };

  //RETURN COMPONENT -----------------
  return (
    <>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={handleCloseModal}
        className={styles.container}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color={"medium"} onClick={handleCloseModal}>
                {textButtons[l].btn__close}
              </IonButton>
            </IonButtons>
            <IonTitle>{text[l].componentTitle}</IonTitle>
            {needToSave && (
              <IonButtons slot="end">
                <IonButton fill="solid" color={"success"} onClick={handleSave}>
                  {textButtons[l].btn__upload}
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* ------------- CONTENT ------------ */}

          <IonList inset>
            <IonListHeader>
              <IonLabel>
                {isOrderEnabled ? text[l].reorder_list : text[l].widgets}
              </IonLabel>
              <IonButton onClick={handleToggleOrdierList}>
                {isOrderEnabled ? (
                  <IonIcon icon={toggleOutline} />
                ) : (
                  <IonIcon icon={reorderThree} />
                )}
              </IonButton>
            </IonListHeader>
            {isOrderEnabled ? (
              <>
                <IonReorderGroup
                  disabled={false}
                  onIonItemReorder={handleReorder}
                >
                  {widgets.map((widget: typeWidget, index: number) => {
                    return (
                      <IonItem key={widget.widgetID + index}>
                        <IonReorder slot="end"></IonReorder>
                        <IonLabel>
                          <h2>{widget.name[l]}</h2>
                          <p>{widget.description[l]}</p>
                        </IonLabel>
                      </IonItem>
                    );
                  })}
                </IonReorderGroup>
              </>
            ) : (
              constWidgetsFREE.map((widget: typeWidget, index: number) => {
                let isNotAvailable = avilableComponents.every(
                  (c) => c.widgetID !== widget.widgetID
                );
                return (
                  <IonItem
                    key={widget.widgetID + index}
                    button={isNotAvailable}
                  >
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
                        checked={widgetsLocal.some(
                          (c) => c.widgetID === widget.widgetID
                        )}
                        onIonChange={() => handleToggleWidget(widget)}
                      />
                    ) : (
                      <></>
                    )}
                  </IonItem>
                );
              })
            )}
          </IonList>

          <IonList inset>
            <IonListHeader>
              <IonLabel>{text[l].standard_widgets}</IonLabel>
              <IonButton>{text[l].btn__go_standard}</IonButton>
            </IonListHeader>
            {constWidgetsSTANDARD.map((widget: typeWidget, index: number) => {
              let isNotAvailable = avilableComponents.every(
                (c) => c.widgetID !== widget.widgetID
              );
              return (
                <IonItem
                  onClick={handleTogglePurchaseModal}
                  key={widget.widgetID + index}
                  button={isNotAvailable}
                >
                  {isNotAvailable ? (
                    <IonIcon slot="start" icon={lockClosed} size="small" />
                  ) : (
                    <></>
                  )}

                  <IonLabel>
                    <h2 className="inline-row-gap">
                      {isNotAvailable ? (
                        <IonBadge color={"primary"}>
                          {text[l].standard_widgets}
                        </IonBadge>
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
                      checked={widgetsLocal.some(
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

          <IonList inset>
            <IonListHeader>
              <IonLabel>{text[l].premium_widgets}</IonLabel>
              <IonButton>{text[l].btn__go_premium}</IonButton>
            </IonListHeader>
            {constWidgetsPRO.map((widget: typeWidget, index: number) => {
              let isNotAvailable = avilableComponents.every(
                (c) => c.widgetID !== widget.widgetID
              );
              return (
                <IonItem
                  onClick={handleTogglePurchaseModal}
                  key={widget.widgetID + index}
                  button={isNotAvailable}
                >
                  {isNotAvailable ? (
                    <IonIcon slot="start" icon={lockClosed} size="small" />
                  ) : (
                    <></>
                  )}

                  <IonLabel>
                    <h2 className="inline-row-gap">
                      {isNotAvailable ? (
                        <IonBadge color={"success"}>
                          {text[l].premium_widgets}
                        </IonBadge>
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
                      checked={widgetsLocal.some(
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
      {/* ----------------- EXTRA UI ----------------------*/}
      <ModalPurchase
        isOpen={isModalPurchaseOpen}
        setIsOpen={setIsModalPurchaseOpen}
      />
    </>
  );
};

export default ModalOrderComponents;
