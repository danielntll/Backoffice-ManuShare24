import { useContext, useState } from "react";
import styles from "./SectionAllergens.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonAvatar, IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import ListHeader from "../List__Header/ListHeader";
import { textButtons } from "../../text/textButtons";
import { typeAllergens } from "../../db/typeAllergens";
import ItemAllergen from "../Item__Allergen/ItemAllergen";
import { chevronBack } from "ionicons/icons";
import ModalAllergens from "../Modal__Allergens/ModalAllergens";

interface ContainerProps {}

const SectionAllergens: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [isModalAllergensOpen, setIsModalAllergensOpen] =
    useState<boolean>(false);

  const [allergens, setAllergens] = useState<typeAllergens[]>([]);
  //FUNCTIONS ------------------------
  // --- openModalAllergens
  /**
   * Questa funzione serve per aprire il modale
   * degli allergeni.
   */
  function openModalAllergens() {
    setIsModalAllergensOpen(!isModalAllergensOpen);
  }

  // --- toggleAllergenFromList
  /**
   * Questa funzione gestisce l'aggiunta o la rimozione di un allergene dalla lista.
   *
   * @param allergenToToggle L'allergene da aggiungere o rimuovere dalla lista.
   */
  function toggleAllergenFromList(allergenToToggle: typeAllergens) {
    // Se l'allergene è già presente nella lista, lo rimuoviamo
    if (allergens.includes(allergenToToggle)) {
      setAllergens(
        allergens.filter((allergen) => allergen.UID !== allergenToToggle.UID)
      );
    } else {
      // Altrimenti, lo aggiungiamo
      setAllergens([...allergens, allergenToToggle]);
    }
  }
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      <IonList inset>
        <ListHeader
          title={text[l].label}
          callbackOnClick={openModalAllergens}
          buttonText={textButtons[l].btn__select}
        />
        {allergens.length === 0 ? (
          <IonItem lines="none">
            <IonLabel>
              <p>{text[l].info}</p>
            </IonLabel>
          </IonItem>
        ) : (
          allergens.map((allergen: typeAllergens) => (
            <ItemAllergen
              key={allergen.UID}
              allergen={allergen}
              isSelected={true}
              callbackOnClick={() => toggleAllergenFromList(allergen)}
            />
          ))
        )}
      </IonList>

      {/* --- MODAL ALLERGENS --- */}
      <ModalAllergens
        isOpen={isModalAllergensOpen}
        setIsOpen={setIsModalAllergensOpen}
        allergens={allergens}
        callbackAllergenOnClick={toggleAllergenFromList}
      />
    </div>
  );
};

export default SectionAllergens;
