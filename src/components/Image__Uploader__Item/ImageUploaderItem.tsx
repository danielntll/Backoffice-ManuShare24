import { useContext, useState } from "react";
import styles from "./ImageUploaderItem.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonProgressBar,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline, colorWandOutline, eye, trashBin } from "ionicons/icons";
import imageCompression from "browser-image-compression";

interface ContainerProps {
  imageURL: string;
  imageFILE: File;
  callbackRemoveImage: () => void;
}

const ImageUploaderItem: React.FC<ContainerProps> = ({
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
              onClick={() => setIsFullScreen(true)}
              color={"primary"}
              fill="clear"
            >
              <IonIcon icon={eye} />
            </IonButton>
            {/* BUTTON OTTIMIZZA */}
            {sizeMB > dafaultImageSize && compressetFile == null ? (
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
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                color={"medium"}
                onClick={() => setIsFullScreen(false)}
              >
                Chiudi
              </IonButton>
            </IonButtons>
            <IonTitle>Immagine a schermo intero</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <img src={imageURL} alt="Immagine a schermo intero" />
        </IonContent>
      </IonModal>
    </>
  );
};

export default ImageUploaderItem;
