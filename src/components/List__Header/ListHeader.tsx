import React, { useContext } from "react";
import styles from "./ListHeader.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { IonButton, IonIcon, IonLabel, IonListHeader } from "@ionic/react";
import { textButtons } from "../../text/textButtons";
import { chevronForward } from "ionicons/icons";

interface ContainerProps {
  title: string;
  subtitle?: string;
  callbackListAction?: () => void;
  button?: React.ReactNode;
}

const ListHeader: React.FC<ContainerProps> = ({
  title,
  subtitle,
  callbackListAction,
  button = (
    <IonButton size="small">
      <IonIcon icon={chevronForward} />
    </IonButton>
  ),
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonListHeader onClick={callbackListAction}>
      <IonLabel className={styles.lable}>
        {subtitle ? <p className="ion-padding-top">{subtitle}</p> : ""}
        <h1>
          <b>{title}</b>
        </h1>
      </IonLabel>
      {callbackListAction ? button : ""}
    </IonListHeader>
  );
};

export default ListHeader;
