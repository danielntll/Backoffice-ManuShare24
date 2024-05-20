import { useContext, useEffect, useState } from "react";
import styles from "./ModalWidgetIngredientsCritics.module.css";
import { text } from "./text";
import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonModal,
  IonReorderGroup,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
  useIonActionSheet,
} from "@ionic/react";
import { ContextLanguage } from "../../context/contextLanguage";
import { textButtons } from "../../text/textButtons";
import { typeIngredient } from "../../types/typeIngredient";
import { WidgetInventoryIngredientsCritics } from "../../constants/widgets/inventory/WidgetInventoryIngredientsCritics";
import ItemIngredientCritic from "../Item__Ingredient_Critic/ItemIngredientCritic";
import { optionsOutline } from "ionicons/icons";
import ActionsheetFilter from "../Actionsheet__Filter/ActionsheetFilter";
import { typeListModify } from "../../types/typeListModify";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
  ingredients: typeIngredient[];
  callbackSetSelectedIngredients: (newVal: typeIngredient[]) => void;
}

const ModalWidgetIngredientsCritics: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  ingredients,
  callbackSetSelectedIngredients,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);

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
  //FUNCTIONS ------------------------

  // --- useEffect [ingredients]
  /**
   *
   */
  useEffect(() => {
    setSelectedIngredientsLocal(ingredients);
  }, [ingredients]);

  // --- handleSetSelectedIngredients()
  /**
   * Questo metodo serve per salvare la nuova lista degli ingredienti
   * sia nel server che localmente.
   *
   */
  const handleSetSelectedIngredients = () => {
    callbackSetSelectedIngredients(selectedIngredientsLocal);
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

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
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
            <IonTitle>{WidgetInventoryIngredientsCritics.name[l]}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleOpenOptions}>
                <IonIcon icon={optionsOutline} />
              </IonButton>
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
                                "ModalWidgetIngredientsCritics" +
                                ingredient.ingredientID +
                                index
                              }
                              ingredient={ingredient}
                              type={isModifing ?? "button"}
                            />
                          );
                        }
                      )
                    : searchResult.map(
                        (ingredient: typeIngredient, index: number) => {
                          return (
                            <ItemIngredientCritic
                              key={
                                "ModalWidgetIngredientsCritics" +
                                ingredient.ingredientID +
                                index
                              }
                              ingredient={ingredient}
                              type={isModifing ?? "button"}
                            />
                          );
                        }
                      )}
                </>
              )}
            </IonReorderGroup>
          </IonList>
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

export default ModalWidgetIngredientsCritics;
