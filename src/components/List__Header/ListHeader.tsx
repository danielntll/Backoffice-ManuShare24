import { useContext } from "react";
import styles from "./ListHeader.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { IonButton, IonIcon, IonLabel, IonListHeader } from "@ionic/react";
import { textButtons } from "../../text/textButtons";
import { chevronForward } from "ionicons/icons";

interface ContainerProps {
  title: string;
  callbackListAction: () => void;
}

const ListHeader: React.FC<ContainerProps> = ({
  title,
  callbackListAction,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonListHeader onClick={callbackListAction}>
      <IonLabel className={styles.lable}>{title}</IonLabel>
      <IonButton size="small">
        {textButtons[l].btn__go_to_page}
        <IonIcon icon={chevronForward} />
      </IonButton>
    </IonListHeader>
  );
};

export default ListHeader;
