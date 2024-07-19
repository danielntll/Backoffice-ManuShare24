import React, { useContext } from "react";
import styles from "./ListHeader.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { IonButton, IonIcon, IonLabel, IonListHeader } from "@ionic/react";

interface ContainerProps {
  title: string;
  subtitle?: string;
  callbackOnClick?: () => void;
  buttonText?: string;
  buttonIcon?: string;
}

const ListHeader: React.FC<ContainerProps> = ({
  title,
  subtitle,
  callbackOnClick,
  buttonText,
  buttonIcon,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonListHeader onClick={callbackOnClick}>
      <IonLabel className={styles.lable}>
        {subtitle ? <p className="ion-padding-top">{subtitle}</p> : ""}
        <h1>
          <b>{title}</b>
        </h1>
      </IonLabel>

      {buttonText || buttonIcon ? (
        <IonButton className={styles.lable}>
          {buttonText ? <span>{buttonText}</span> : <></>}
          {buttonIcon ? (
            <IonIcon slot="end" name={buttonIcon} icon={buttonIcon}></IonIcon>
          ) : (
            <></>
          )}
        </IonButton>
      ) : (
        <></>
      )}
    </IonListHeader>
  );
};

export default ListHeader;
