import { useContext, useRef, useState } from "react";
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
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
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
  const ref = useRef<any>(null);
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
  const onItemClick = () => {
    if (ref != null) {
      ref.current.open();
    }
  };
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonItemSliding ref={ref}>
        <IonItem button onClick={onItemClick}>
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
          </IonLabel>
        </IonItem>
        <IonItemOptions side="end">
          {/* BUTTON OTTIMIZZA */}
          {sizeMB > dafaultImageSize && compressetFile == null ? (
            <IonItemOption onClick={compress} color={"warning"}>
              <IonIcon slot="end" icon={colorWandOutline}></IonIcon>
              {text[l].btn_comprimi}
            </IonItemOption>
          ) : (
            <></>
          )}
          {/* BUTTON VISUALIZZA */}
          <IonItemOption
            onClick={() => setIsFullScreen(true)}
            color={"primary"}
          >
            <IonIcon slot="end" icon={eye} />
            {text[l].btn_visualizza}
          </IonItemOption>
          {/* BUTTON ELIMINA */}
          <IonItemOption onClick={() => callbackRemoveImage()} color={"danger"}>
            <IonIcon icon={trashBin} />
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>

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
