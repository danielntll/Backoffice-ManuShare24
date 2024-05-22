import { useContext, useEffect, useState } from "react";
import styles from "./ModalWidgetIngredientsStockStatusLow.module.css";
import { text } from "./text";
import {
  IonActionSheet,
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
  IonReorderGroup,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
} from "@ionic/react";
import { ContextLanguage } from "../../context/contextLanguage";
import { textButtons } from "../../text/textButtons";
import { typeIngredient } from "../../types/typeIngredient";
import { WidgetInventoryIngredientsStockStatusLow } from "../../constants/widgets/inventory/WidgetInventoryIngredientsStockStatusLow";
import ItemIngredientCritic from "../Item__Ingredient_Critic/ItemIngredientCritic";
import { optionsOutline } from "ionicons/icons";
import { typeListModify } from "../../types/typeListModify";
import { mockIngredients } from "../../mock/mockIngredients";
import { ContextToast } from "../../context/contextToast";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  ingredients: typeIngredient[];
  callbackSetSelectedIngredients: (newVal: typeIngredient[]) => void;
}

const ModalWidgetIngredientsStockStatusLow: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  ingredients,
  callbackSetSelectedIngredients,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const { toast } = useContext(ContextToast);
  const maxSelectedLength = 5;
  //CONDITIONS -----------------------

  // --- selectedIngredientsLocal
  /**
   * Lista degli ingredienti selezionati dall'utente ed impostati con quelli
   * salvati nel server.
   * Questa lista sarà modificata localmente e se non salvato questi dati
   * verranno sovrascritti.
   */
  const [selectedIngredientsLocal, setSelectedIngredientsLocal] = useState<
    typeIngredient[]
  >([]);

  // --- allIngredients
  /**
   * Questa variabile rappresenta la fetch di tutti gli ingredienti, in step da 10 elementi.
   */
  const [allIngredients, setAllIngredients] = useState<typeIngredient[]>([]);

  // --- isFetching
  /**
   * Indica se la fetch degli ingredienti è in corso.
   */

  const [isFetching, setIsFetching] = useState<boolean>(false);

  // --- searchResult
  /**
   * Risultato della ricerca degli ingredienti.
   */
  const [searchResult, setSearchResult] = useState<typeIngredient[] | null>(
    null
  );

  // --- isSearching
  /**
   * Indica se la ricerca degli ingredienti è in corso.
   */
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // --- isModifing
  /**
   * Indica se l'utente sta modificando gli oggetti ingredienti.
   * Verrà impostata dalle action della variabile "options".
   *
   * Se NULL allora visualizza normalmente gli items.
   */
  const [isModifing, setIsModifing] = useState<typeListModify | null>(null);

  // --- isActionsSheetOpen
  /// Questa variabile indica se il menu delle azioni è aperto o meno.
  const [isActionsSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);

  // --- needSave
  /// Questa variabile indica se serve salvare delle modifiche o meno. Il controllo è settato in un useEffect che confrontaray  l'array locale con l'array di ingredienti arrivato tramite props.
  const [needSave, setNeedSave] = useState<boolean>(false);
  //FUNCTIONS ------------------------

  // --- useEffect [ingredients]
  /**
   * 1. Imposta una copia locale degli ingredienti selezionati passati tramite props
   * 2. Esegue una chiamata di fetch se tutti gli ingredienti sono vuoti
   */
  useEffect(() => {
    setSelectedIngredientsLocal(ingredients);
    if (allIngredients.length === 0) {
      fetchIngredients();
    }
  }, [ingredients]);

  // --- useEffect [selectedIngredientsLocal]
  /**
   *  Serve per:
   * 1. Controlla se ci sono delle modifiche tra l'array locale e quello arrivato tramite props: se sì, si attiva il pulsante "salva". In caso contrario rimane attivo il pulsante "opzioni"
   *
   */
  useEffect(() => {
    if (selectedIngredientsLocal !== ingredients) {
      setNeedSave(true);
    } else {
      setNeedSave(false);
    }
  }, [selectedIngredientsLocal]);

  // --- fetchIngredients()
  /**
   * Questo metodo si occupa di eseguire la fetch di tutti gli ingredienti
   */
  const fetchIngredients = async () => {
    setIsFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAllIngredients([...mockIngredients, ...mockIngredients]);
    setIsFetching(false);
  };

  // --- handleSaveSelectedIngredients()
  /**
   * Questo metodo serve per salvare la nuova lista degli ingredienti
   * sia nel server che localmente.
   *
   */
  const handleSaveSelectedIngredients = () => {
    // TODO: creare salvataggio sul server
    callbackSetSelectedIngredients(selectedIngredientsLocal);
    setNeedSave(false);
    setIsModifing(null);
  };

  // --- handleSearchInput()
  /**
   * Questo metodo serve per gestire la ricerca degli ingredienti.
   * Imposta anche lo stato di loading.
   *
   * Ha un debounce di 1 secondo.
   *
   * @param ev - Evento input
   */

  const handleSearchInput = async (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
    if (query != "") {
      setIsSearching(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSearchResult(
        selectedIngredientsLocal.filter(
          (d) => d.data.nome.toLowerCase().indexOf(query) > -1
        )
      );

      setIsSearching(false);
    }
  };

  // --- handleClearSearchInput()
  /**
   * Questo metodo serve per cancellare la ricerca degli ingredienti
   * e visualizzare nuovamente la lista locale.
   *
   */
  const handleClearSearchInput = () => {
    setSearchResult(null);
    setIsSearching(false);
  };

  // --- handleOpenOptions()
  /**
   * Questo metodo permette di aprire l'action sheet delle azioni
   * che permetterà di modificare la lista degli ingredienti.
   */
  const handleOpenOptions = () => {
    setIsActionSheetOpen(!isActionsSheetOpen);
  };

  // --- handleReorder
  /**
   * Questo metodo si occupa di riordinare la lista degli ingredienti locali nella variabile "selectedIngredientsLocal".
   *
   * @param event CustomEvent<ItemReorderEventDetail> - evento di reorder dal componente di default
   */
  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);

    // Update the local state with the reordered list
    const reorderedList = [...selectedIngredientsLocal];
    const [reorderedItem] = reorderedList.splice(event.detail.from, 1);
    reorderedList.splice(event.detail.to, 0, reorderedItem);
    setSelectedIngredientsLocal(reorderedList);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  };

  // --- handleSelectDeselect()
  /**
   * Questo metodo permette di selezionare o deselezionare dalla lista locale un ingrediente dato il suo ID
   *
   * @param ingredientToToggle typeIngredient - Ingrediente da selezionare o deselezionare
   *
   */
  const handleSelectDeselect = (ingredientToToggle: typeIngredient) => {
    const newComponentsLocal = selectedIngredientsLocal.filter(
      (c) => c.ingredientID !== ingredientToToggle.ingredientID
    );
    if (newComponentsLocal.length === selectedIngredientsLocal.length) {
      if (selectedIngredientsLocal.length < maxSelectedLength) {
        newComponentsLocal.push(ingredientToToggle);
      } else {
        toast("warning", text[l].warning_max_limit);
      }
    }
    setSelectedIngredientsLocal(newComponentsLocal);
  };

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
            <IonTitle>
              {WidgetInventoryIngredientsStockStatusLow.name[l]}
            </IonTitle>
            <IonButtons slot="end">
              {needSave ? (
                <IonButton
                  color={"success"}
                  onClick={handleSaveSelectedIngredients}
                >
                  {textButtons[l].btn__upload}
                </IonButton>
              ) : (
                <IonButton onClick={handleOpenOptions}>
                  <IonIcon icon={optionsOutline} />
                </IonButton>
              )}
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              placeholder={text[l].search_ingredient}
              debounce={500}
              onIonClear={handleClearSearchInput}
              onIonInput={(ev) => handleSearchInput(ev)}
            ></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* ------------- CONTENT ------------ */}
          <IonList>
            <IonListHeader>
              <IonLabel className={styles.lable}>
                {isSearching || searchResult !== null
                  ? text[l].list_research
                  : text[l].list_selected}
              </IonLabel>
              <IonLabel className="ion-text-end ion-padding-end">
                {isSearching || searchResult !== null
                  ? searchResult?.length ?? ""
                  : selectedIngredientsLocal.length + "/" + maxSelectedLength}
              </IonLabel>
            </IonListHeader>
            <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
              {isSearching ? (
                <>
                  <ItemIngredientCritic skeleton />
                  <ItemIngredientCritic skeleton />
                  <ItemIngredientCritic skeleton />
                </>
              ) : (
                <>
                  {searchResult === null
                    ? selectedIngredientsLocal.map(
                        (ingredient: typeIngredient, index: number) => {
                          return (
                            <ItemIngredientCritic
                              key={
                                "ModalWidgetIngredientsStockStatusLow" +
                                ingredient.ingredientID +
                                index
                              }
                              ingredient={ingredient}
                              type={isModifing ?? "button"}
                              isSelected={selectedIngredientsLocal.some(
                                (c) =>
                                  c.ingredientID === ingredient.ingredientID
                              )}
                              callbackSelect={() =>
                                handleSelectDeselect(ingredient)
                              }
                            />
                          );
                        }
                      )
                    : searchResult.map(
                        (ingredient: typeIngredient, index: number) => {
                          return (
                            <ItemIngredientCritic
                              key={
                                "ModalWidgetIngredientsStockStatusLow" +
                                ingredient.ingredientID +
                                index
                              }
                              ingredient={ingredient}
                              type={isModifing ?? "button"}
                              isSelected={selectedIngredientsLocal.some(
                                (c) =>
                                  c.ingredientID === ingredient.ingredientID
                              )}
                              callbackSelect={() =>
                                handleSelectDeselect(ingredient)
                              }
                            />
                          );
                        }
                      )}
                </>
              )}
            </IonReorderGroup>
          </IonList>
          {isSearching || searchResult !== null ? (
            <></>
          ) : (
            <IonList>
              <IonListHeader>
                <IonLabel className={styles.lable}>{text[l].list_all}</IonLabel>
              </IonListHeader>
              {isFetching ? (
                <IonItem>
                  <div className="ion-text-center">
                    <IonSpinner />
                  </div>
                </IonItem>
              ) : (
                allIngredients.map(
                  (ingredient: typeIngredient, index: number) => {
                    return (
                      <ItemIngredientCritic
                        key={
                          "ModalWidgetIngredientsStockStatusLow" +
                          ingredient.ingredientID +
                          index
                        }
                        ingredient={ingredient}
                        type={isModifing ?? "button"}
                        isSelected={selectedIngredientsLocal.some(
                          (c) => c.ingredientID === ingredient.ingredientID
                        )}
                        callbackSelect={() => handleSelectDeselect(ingredient)}
                      />
                    );
                  }
                )
              )}
            </IonList>
          )}
        </IonContent>
      </IonModal>
      {/* ----------------- EXTRA UI ----------------------*/}

      {/* Componente OPZIONI */}
      <IonActionSheet
        header={text[l].options_title}
        isOpen={isActionsSheetOpen}
        onDidDismiss={({ detail }) => {
          setIsModifing(
            detail.data === undefined || detail.data.action === "cancel"
              ? null
              : detail.data.action
          );
          setIsActionSheetOpen(false);
        }}
        buttons={[
          {
            text: text[l].opt_info,
            data: {
              action: "cancel",
            },
          },
          {
            text: text[l].opt_reorder,
            data: {
              action: "reorder",
            },
          },
          {
            text: text[l].opt_select,
            data: {
              action: "selecting",
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            data: {
              action: "cancel",
            },
          },
        ]}
      />
    </>
  );
};

export default ModalWidgetIngredientsStockStatusLow;
