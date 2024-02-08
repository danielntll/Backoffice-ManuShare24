import { useContext } from "react";
import styles from "./CardAttivita.module.css";
import { text } from "./text";
import { typeAttivita } from "../../types/typeCreateAttivita";
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { earth, qrCode } from "ionicons/icons";
import { ContextLanguage } from "../../context/contextLanguage";

interface ContainerProps {
  attivitaData: typeAttivita;
}

const CardAttivita: React.FC<ContainerProps> = ({ attivitaData }) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const createdDate = new Date(attivitaData.createdAt).toLocaleDateString();
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{createdDate}</IonCardSubtitle>
        <IonCardTitle>{attivitaData.title}</IonCardTitle>
      </IonCardHeader>
      <IonList inset>
        <IonListHeader>
          <IonLabel>{text[l].componentTitle}</IonLabel>
          <IonButton>{text[l].btn__seeAll}</IonButton>
        </IonListHeader>
        {/* ----- Stato attivita ------ */}
        <IonItem button>
          <IonIcon icon={earth} className="icon-margin-right" />
          <IonLabel>
            <h2>{text[l].item__status.title}</h2>
            <p>{text[l].item__status.description}</p>
          </IonLabel>
          <IonChip
            color={attivitaData.status === "Online" ? "success" : "danger"}
          >
            {attivitaData.status}
          </IonChip>
        </IonItem>
        {/* ----- Menù ------ */}
        <IonItem button>
          <IonIcon icon={qrCode} className="icon-margin-right" />
          <IonLabel>
            <h2>{text[l].item__menu.title}</h2>
            <p>{text[l].item__menu.description}</p>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonCard>
  );
};

export default CardAttivita;
