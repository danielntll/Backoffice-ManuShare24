import { useContext, useEffect, useRef, useState } from "react";
import styles from "./ImageUploader.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
} from "@ionic/react";
import { textButtons } from "../../text/textButtons";
import { closeOutline, imagesOutline } from "ionicons/icons";

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
  const refInputImmage = useRef<any>(null);
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
    if (refInputImmage.current != null) {
      refInputImmage.current.value = null;
    }
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
        <IonItem className="ion-padding-top">
          <IonAvatar className="icon-margin-right">
            <IonIcon size="large" icon={imagesOutline} />
          </IonAvatar>
          {/* Generic info */}
          <IonLabel>
            <div className={styles.label}>
              {text[l].componentTitle}
              <IonBadge color={"medium"}>{imageURLS.length}</IonBadge>
            </div>
          </IonLabel>
          {/* Select button */}
          <IonButton onClick={() => refInputImmage.current?.click()}>
            {textButtons[l].btn__select}
          </IonButton>
        </IonItem>

        {imageURLS.length === 0 ? (
          <IonItem>
            <IonLabel>
              <p>{text[l].text_images}</p>
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
