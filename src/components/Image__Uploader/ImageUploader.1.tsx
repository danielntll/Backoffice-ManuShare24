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
import {
  folderOutline,
  imagesOutline,
  informationCircle,
} from "ionicons/icons";
import ImageUploaderItem from "../Image__Uploader__Item/ImageUploaderItem";
import { ContainerProps } from "./ImageUploader";

export const ImageUploader: React.FC<ContainerProps> = ({ defaultImages }) => {
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
          <IonButton>{text[l].btn__select}</IonButton>
        </IonListHeader>

        {/* BUTTON SELECT FROM COMPUTER */}
        <IonButton
          expand="block"
          size="small"
          fill="clear"
          onClick={() => refInputImmage.current?.click()}
        >
          <IonIcon icon={folderOutline} className="icon-margin-right" />
          {text[l].btn__select}
        </IonButton>
        {/* BUTTON SELECT FROM GALLERY */}
        <IonButton
          size="small"
          fill="clear"
          expand="block"
          onClick={() => refInputImmage.current?.click()}
        >
          <IonIcon icon={imagesOutline} className="icon-margin-right" />
          {text[l].btn__galleria}
        </IonButton>

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
          <p className="inline-row-gap ion-padding-horizontal ion-padding-bottom">
            <IonIcon size="large" icon={informationCircle} color="warning" />
            {text[l].info}
          </p>
        </IonLabel>
      ) : (
        <></>
      )}
      {/* -------------  EXTRA UI ------------ */}
      <IonActionSheet
        isOpen={isSelectMethodOpen}
        header={btn__select[l].btn__select}
        buttons={[
          {
            text: "Delete",
            role: "destructive",
            data: {
              action: "delete",
            },
          },
          {
            text: "Share",
            data: {
              action: "share",
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
        onDidDismiss={() => setIsSelectMethodOpen(false)}
      ></IonActionSheet>
    </>
  );
};
