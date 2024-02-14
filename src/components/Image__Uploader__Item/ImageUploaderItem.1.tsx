import { useContext, useState } from "react";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonBadge,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonProgressBar,
  IonThumbnail,
} from "@ionic/react";
import { colorWandOutline, trashBin } from "ionicons/icons";
import imageCompression from "browser-image-compression";
import { ContainerProps } from "./ImageUploaderItem";

export const ImageUploaderItem: React.FC<ContainerProps> = ({
  imageURL,
  imageFILE,
  callbackRemoveImage,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const divider = 1024 * 1024;
  const sizeMB: number = imageFILE.size / divider;
  const dafaultImageSize: number = 0.5;
  //CONDITIONS -----------------------
  const [isCompressing, setIsCompressing] = useState<number | null>(null);
  const [compressetFile, setCompressedFile] = useState<File | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  //FUNCTIONS ------------------------
  const compress = async () => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (value: number) => {
        setIsCompressing(value);
      },
    };

    try {
      const compressFile = await imageCompression(imageFILE, options);
      setCompressedFile(compressFile);
    } catch (error) {
      console.log("Compression error:", error);
      setCompressedFile(null);
    }
  };
  const openImage = () => {};
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonItem>
        <IonThumbnail className="icon-margin-right">
          <img src={imageURL} />
        </IonThumbnail>
        <IonLabel className="ion-text-nowrap">
          {isCompressing !== null ? (
            <IonProgressBar
              color={isCompressing / 100 === 1 ? "success" : "warning"}
              buffer={1}
              value={isCompressing / 100}
            ></IonProgressBar>
          ) : (
            <></>
          )}
          <h3>
            {text[l].name}
            {": "}
            {imageFILE.name}
          </h3>
          <h3 className="inline-row-gap">
            {text[l].peso}
            {": "}
            <IonBadge
              color={
                compressetFile !== null
                  ? "medium"
                  : sizeMB > dafaultImageSize
                  ? "warning"
                  : "success"
              }
            >
              {sizeMB.toFixed(2)}
              {" MB"}
            </IonBadge>
            {/* COMPRESSED FILE */}
            {compressetFile !== null ? (
              <IonBadge color={"success"}>
                {(compressetFile.size / divider).toFixed(2)}
                {" MB"}
              </IonBadge>
            ) : (
              <></>
            )}
          </h3>
          <p>
            {text[l].ext}
            {": "}
            {imageFILE.type}
          </p>
          <div className="inline-row-sb">
            {/* BUTTON ELIMINA */}
            <IonButton
              onClick={() => callbackRemoveImage()}
              color={"danger"}
              fill="clear"
            >
              <IonIcon icon={trashBin} />
            </IonButton>
            {/* BUTTON VISUALIZZA */}
            <IonButton
              onClick={() => openImage()}
              color={"danger"}
              fill="clear"
            >
              <IonIcon icon={trashBin} />
            </IonButton>
            {/* BUTTON OTTIMIZZA */}
            {sizeMB > dafaultImageSize ? (
              <IonButton color={"warning"} fill="clear" onClick={compress}>
                <IonIcon icon={colorWandOutline} />
              </IonButton>
            ) : (
              <></>
            )}
          </div>
        </IonLabel>
      </IonItem>

      {/* MODAL FULL SCREEN */}
      <IonModal
        isOpen={isFullScreen}
        onDidDismiss={() => setIsFullScreen(false)}
        swipeToClose
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Immagine a schermo intero</IonTitle>
            <IonButton slot="end" onClick={() => setIsFullScreen(false)}>
              Chiudi
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <img src={immagine} alt="Immagine a schermo intero" />
        </IonContent>
      </IonModal>
    </>
  );
};
