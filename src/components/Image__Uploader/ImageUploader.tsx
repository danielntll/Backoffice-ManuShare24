import { useContext, useEffect, useRef, useState } from "react";
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
import { closeOutline, image } from "ionicons/icons";

interface ContainerProps {
  defaultImages?: string[];
}

const ImageUploader: React.FC<ContainerProps> = ({ defaultImages }) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //USE STATE ------------------------
  const [images, setImages] = useState([] as any);
  const [imageURLS, setImageURLs] = useState(
    defaultImages ? defaultImages : []
  );
  const refInputImmage = useRef<HTMLInputElement | null>(null);
  //USE EFFECT -----------------------
  useEffect(() => {
    console.log(images);
    const newImageUrls: any = [];
    images.forEach((image: any) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    setImageURLs(newImageUrls);
    setImages(images);
  }, [images]);

  //FUNCTIONS ------------------------
  function onImageChange(e: any) {
    setImages([...images, ...e.target.files]);
  }

  function handleDeleteImage(index: number) {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }

  //RETURN COMPONENT -----------------
  return (
    <>
      <input
        ref={refInputImmage}
        onChange={onImageChange}
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
        {imageURLS.length == 0 ? (
          <IonItem>
            <IonLabel>
              <p>Nessuna immagine selezionata</p>
            </IonLabel>
          </IonItem>
        ) : (
          <>
            {imageURLS.map((image: string, index: number) => (
              <IonItem key={index + "img"}>
                <IonThumbnail>
                  <img src={image} />
                </IonThumbnail>
                <IonLabel>{index}</IonLabel>
                <IonButton
                  onClick={() => handleDeleteImage(index)}
                  slot="end"
                  color={"danger"}
                >
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonItem>
            ))}
          </>
        )}
        <div className="ion-padding-bottom"></div>
      </IonList>
    </>
  );
};

export default ImageUploader;
