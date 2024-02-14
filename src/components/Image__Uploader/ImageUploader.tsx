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
  const dafaultImageSize = 0.5;
  //USE STATE ------------------------
  const [images, setImages] = useState<any>([]);
  const [imageURL, setImageURLs] = useState(defaultImages ? defaultImages : []);
  const refInputImmage = useRef<any>(null);
  const [imagesToCompress, setImagesToCompress] = useState<any>([]);
  //USE EFFECT -----------------------
  useEffect(() => {
    console.log(images);
    const newImageUrls: any = [];
    images?.forEach((image: any) => {
      newImageUrls.push(URL.createObjectURL(image));
      if (image.size > dafaultImageSize) {
        imagesToCompress.push(image);
      }
    });
    setImageURLs(newImageUrls);
    setImages(images);
  }, [images]);

  //FUNCTIONS ------------------------
  function onImageChange(e: any) {
    setImages([...images, ...e.target.files]);
  }

  function handleDeleteImage(index: number) {
    const newImages = [...images];
    const newImagesURL = [...imageURL];
    newImages.splice(index, 1);
    newImagesURL.splice(index, 1);
    setImages(newImages);
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
        <IonItem className="ion-padding-top">
          <IonAvatar className="icon-margin-right">
            <IonIcon size="large" icon={imagesOutline} />
          </IonAvatar>
          {/* Generic info */}
          <IonLabel>
            <div className={styles.label}>
              {text[l].componentTitle}
              <IonBadge color={"medium"}>{imageURL.length}</IonBadge>
            </div>
          </IonLabel>
          {/* Select button */}
          {imagesToCompress.length > 0 ? (
            <IonButton onClick={() => refInputImmage.current?.click()}>
              comprimi
            </IonButton>
          ) : (
            <></>
          )}
          {/* Select button */}
          <IonButton onClick={() => refInputImmage.current?.click()}>
            {textButtons[l].btn__select}
          </IonButton>
        </IonItem>

        {imageURL.length === 0 ? (
          <IonItem>
            <IonLabel>
              <p>{text[l].text_images}</p>
            </IonLabel>
          </IonItem>
        ) : (
          <>
            {imageURL.map((image: string, index: number) => (
              <IonItem key={index + "img"}>
                <IonThumbnail className="icon-margin-right">
                  <img src={image} />
                </IonThumbnail>

                <IonLabel>
                  <h3>
                    {text[l].name}
                    {": "}
                    {images[index].name}
                  </h3>
                  <h3 className="inline-row-gap">
                    {text[l].peso}
                    {": "}
                    <IonBadge
                      color={
                        images[index].size / (1024 * 1024) > dafaultImageSize
                          ? "warning"
                          : "success"
                      }
                    >
                      {(images[index].size / (1024 * 1024)).toFixed(2)}
                      {" MB"}
                    </IonBadge>
                    {}
                  </h3>
                  <p>
                    {text[l].ext}
                    {": "}
                    {images[index].type}
                  </p>
                </IonLabel>
                <IonButton
                  onClick={() => handleDeleteImage(index)}
                  slot="end"
                  color={"danger"}
                  fill="outline"
                >
                  <IonIcon icon={closeOutline} />
                </IonButton>
                <IonButton
                  onClick={() => handleDeleteImage(index)}
                  slot="end"
                  color={"danger"}
                  fill="outline"
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
