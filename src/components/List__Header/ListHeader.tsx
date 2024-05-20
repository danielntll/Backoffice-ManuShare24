import { useContext } from "react";
import styles from "./ListHeader.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { IonButton, IonIcon, IonLabel, IonListHeader } from "@ionic/react";
import { textButtons } from "../../text/textButtons";
import { chevronForward } from "ionicons/icons";

interface ContainerProps {
  title: string;
  subtitle?: string;
  callbackListAction: () => void;
}

const ListHeader: React.FC<ContainerProps> = ({
  title,
  subtitle,
  callbackListAction,
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
      <IonButton size="small">
        {textButtons[l].btn__go_to_page}
        <IonIcon icon={chevronForward} />
      </IonButton>
    </IonListHeader>
  );
};

export default ListHeader;
