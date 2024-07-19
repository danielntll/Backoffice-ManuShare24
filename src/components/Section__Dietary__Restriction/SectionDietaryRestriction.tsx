import { useContext, useState } from "react";
import styles from "./SectionDietaryRestriction.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import ListHeader from "../List__Header/ListHeader";
import { textButtons } from "../../text/textButtons";
import { typeDietaryRestictions } from "../../db/typeDietaryRestictions";
import ModalDietaryRestriction from "../Modal__Dietary__Restriction/ModalDietaryRestriction";
import ItemDietaryRestriction from "../Item__Dietary__Restriction/ItemDietaryRestriction";

interface ContainerProps {}

const SectionDietaryRestriction: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [isModalDietaryRestrictionOpen, setIsModalDietaryRestrictionOpen] =
    useState<boolean>(false);

  const [dietaryRestrictions, setDietaryRestrictions] = useState<
    typeDietaryRestictions[]
  >([]);
  //FUNCTIONS ------------------------
  // --- openModalDietaryRestriction
  /**
   * Questa funzione serve per aprire il modale
   * delle restrizioni alimentari.
   */
  function openModalDietaryRestriction() {
    setIsModalDietaryRestrictionOpen(!isModalDietaryRestrictionOpen);
  }

  // --- toggleDietaryRestrictionFromList
  /**
   * Questa funzione gestisce l'aggiunta o la rimozione di una restrizione alimentare dalla lista.
   *
   * @param dietaryRestrictionToToggle La restrizione alimentare da aggiungere o rimuovere dalla lista.
   */
  function toggleDietaryRestrictionFromList(
    dietaryRestrictionToToggle: typeDietaryRestictions
  ) {
    // Se La restrizione alimentare è già presente nella lista, lo rimuoviamo
    if (dietaryRestrictions.includes(dietaryRestrictionToToggle)) {
      setDietaryRestrictions(
        dietaryRestrictions.filter(
          (dietaryRestriction) =>
            dietaryRestriction.UID !== dietaryRestrictionToToggle.UID
        )
      );
    } else {
      // Altrimenti, lo aggiungiamo
      setDietaryRestrictions([
        ...dietaryRestrictions,
        dietaryRestrictionToToggle,
      ]);
    }
  }
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      <IonList inset>
        <ListHeader
          title={text[l].label}
          callbackOnClick={openModalDietaryRestriction}
          buttonText={textButtons[l].btn__select}
        />
        {dietaryRestrictions.length === 0 ? (
          <IonItem lines="none">
            <IonLabel>
              <p>{text[l].info}</p>
            </IonLabel>
          </IonItem>
        ) : (
          dietaryRestrictions.map(
            (dietaryRestriction: typeDietaryRestictions) => (
              <ItemDietaryRestriction
                key={dietaryRestriction.UID}
                dietaryRestriction={dietaryRestriction}
                isSelected={true}
                callbackOnClick={() =>
                  toggleDietaryRestrictionFromList(dietaryRestriction)
                }
              />
            )
          )
        )}
      </IonList>

      {/* --- MODAL DietaryRestriction --- */}
      <ModalDietaryRestriction
        isOpen={isModalDietaryRestrictionOpen}
        setIsOpen={setIsModalDietaryRestrictionOpen}
        dietaryRestrictions={dietaryRestrictions}
        callbackDietaryRestrictionOnClick={toggleDietaryRestrictionFromList}
      />
    </div>
  );
};

export default SectionDietaryRestriction;
