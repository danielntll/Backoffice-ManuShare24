import { useContext, useEffect, useRef, useState } from "react";
import styles from "./ImageUploader.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonActionSheet,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import ImageUploaderItem from "../Image__Uploader__Item/ImageUploaderItem";
import { textButtons } from "../../text/textButtons";

interface ContainerProps {
  defaultImages?: string[];
}

const ImageUploader: React.FC<ContainerProps> = ({ defaultImages }) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const dafaultImageSize = 0.5;
  //USE STATE ------------------------
  const [imagesFILE, setImagesFILE] = useState<any>([]);
  const [imageURL, setImageURLs] = useState(defaultImages ? defaultImages : []);
  const refInputImmage = useRef<any>(null);
  const [imagesToCompress, setImagesToCompress] = useState<any>([]);
  const [isSelectMethodOpen, setIsSelectMethodOpen] = useState<boolean>(false);
  //USE EFFECT -----------------------
  useEffect(() => {
    console.log(imagesFILE);
    const newImageUrls: any = [];
    imagesFILE?.forEach((image: any) => {
      newImageUrls.push(URL.createObjectURL(image));
      if (image.size / (1024 * 1024) > dafaultImageSize) {
        imagesToCompress.push(image);
      }
    });
    setImageURLs(newImageUrls);
    setImagesFILE(imagesFILE);
  }, [imagesFILE]);

  //FUNCTIONS ------------------------
  function onImageChange(e: any) {
    setImagesFILE([...imagesFILE, ...e.target.files]);
  }

  function handleRemoveImage(index: number) {
    const newImages = [...imagesFILE];
    const newImagesURL = [...imageURL];
    newImages.splice(index, 1);
    newImagesURL.splice(index, 1);
    setImagesFILE(newImages);
    setImageURLs(newImagesURL);
    if (refInputImmage.current != null) {
      refInputImmage.current.value = null;
    }
  }

  function selectFromLocal() {
    refInputImmage.current?.click();
  }

  function takePic() {}

  function galleryCloud() {}

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
          <IonButton onClick={() => setIsSelectMethodOpen(!isSelectMethodOpen)}>
            {text[l].btn__select}
          </IonButton>
        </IonListHeader>

        {/* SELECTED IMAGES */}
        {imageURL.length === 0 ? (
          <IonItem>
            <IonLabel>
              <p>{text[l].text_images}</p>
            </IonLabel>
          </IonItem>
        ) : (
          <>
            {imageURL.map((image: string, index: number) => (
              <ImageUploaderItem
                key={index}
                imageURL={image}
                imageFILE={imagesFILE[index]}
                callbackRemoveImage={() => handleRemoveImage(index)}
              />
            ))}
          </>
        )}

        <div className="ion-padding-bottom"></div>
      </IonList>
      {imageURL.length > 0 ? (
        <IonLabel>
          <p className="ion-padding-horizontal ion-padding-bottom">
            {text[l].info}
          </p>
        </IonLabel>
      ) : (
        <></>
      )}
      {/* -------------  EXTRA UI ------------ */}
      <IonActionSheet
        isOpen={isSelectMethodOpen}
        header={textButtons[l].btn__select}
        buttons={[
          {
            text: text[l].btn__picture,
            role: "take_pic",
          },
          {
            text: text[l].btn__local,
            role: "local",
          },
          {
            text: text[l].btn__galleria,
            role: "gallery",
          },
          {
            text: textButtons[l].btn__annulla,
            role: "cancel",
          },
        ]}
        onDidDismiss={({ detail }) => {
          if (detail.role === "local") selectFromLocal();
          if (detail.role === "take_pic") takePic();
          if (detail.role === "gallery") galleryCloud();
          setIsSelectMethodOpen(false);
        }}
      ></IonActionSheet>
    </>
  );
};

export default ImageUploader;
