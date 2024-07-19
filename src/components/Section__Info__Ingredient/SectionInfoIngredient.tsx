import { useContext, useState } from "react";
import styles from "./SectionInfoIngredient.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
} from "@ionic/react";
import ListHeader from "../List__Header/ListHeader";
import ImageUploader from "../Image__Uploader/ImageUploader";
import SectionAllergens from "../Section__Allergens/SectionAllergens";
import SectionDietaryRestriction from "../Section__Dietary__Restriction/SectionDietaryRestriction";

interface ContainerProps {}

const SectionInfoIngredient: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [name, setName] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      <IonList inset>
        <ListHeader title={text[l].componentTitle} />

        {/* --- NAME --- */}
        <IonItem>
          <IonInput
            required
            clearInput
            label={text[l].input_name.label}
            placeholder={text[l].input_name.ph}
            labelPlacement="stacked"
            type={"text"}
            value={name}
            counter={true}
            onIonInput={(e) => setName(e.detail.value!)}
          />
        </IonItem>
        {/* --- DESCRIPTION --- */}
        <IonItem>
          <IonTextarea
            label={text[l].input_description.label}
            placeholder={text[l].input_description.ph}
            labelPlacement="stacked"
            value={description}
            autoGrow={true}
            onIonInput={(e) => setDescription(e.detail.value!)}
          />
        </IonItem>
      </IonList>

      <IonLabel>
        <p className="ion-padding-horizontal">
          {text[l].input_description.help}
        </p>
      </IonLabel>

      {/* --- ALLERGENS --- */}
      <SectionAllergens />

      <IonLabel>
        <p className="ion-padding-horizontal">{text[l].input_allergens.help}</p>
      </IonLabel>

      {/* --- DIETARY RESTRICTIONS --- */}
      <SectionDietaryRestriction />

      <IonLabel>
        <p className="ion-padding-horizontal">
          {text[l].input_dietaryRestrictions.help}
        </p>
      </IonLabel>

      {/* --- IMAGES --- */}
      <ImageUploader />

      <IonLabel>
        <p className="ion-padding-horizontal ion-padding-bottom">
          {text[l].input_images.help}
        </p>
      </IonLabel>
    </div>
  );
};

export default SectionInfoIngredient;
