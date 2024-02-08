import { useContext, useRef, useState } from "react";
import styles from "./ImageUploader.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonThumbnail,
} from "@ionic/react";
import { textButtons } from "../../text/textButtons";
import { closeOutline } from "ionicons/icons";

interface ContainerProps {
  defaultImages?: string[];
}

const ImageUploader: React.FC<ContainerProps> = ({ defaultImages }) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //USE STATE ------------------------
  const [images, setImages] = useState<string[]>(defaultImages ?? []);
  const refInputImmage = useRef<HTMLInputElement | null>(null);
  //USE EFFECT -----------------------
  //FUNCTIONS ------------------------
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImages([...images, reader.result as string]);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  //RETURN COMPONENT -----------------
  return (
    <>
      <input
        ref={refInputImmage}
        onChange={handleImageChange}
        type="file"
        accept="image/*"
        hidden
        multiple
      />
      <IonList className={styles.container} inset>
        <IonListHeader>
          <IonLabel>{text[l].componentTitle}</IonLabel>
          <IonButton onClick={() => refInputImmage.current?.click()}>
            {textButtons[l].btn__select}
          </IonButton>
        </IonListHeader>
        {images.map((image: string, index: number) => (
          <IonItem key={index}>
            <IonThumbnail>
              <img src={image} />
            </IonThumbnail>
            <IonLabel></IonLabel>
            <IonButton
              onClick={() => handleDeleteImage(index)}
              slot="end"
              color={"danger"}
            >
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonItem>
        ))}
      </IonList>
    </>
  );
};

export default ImageUploader;
