import { useContext } from "react";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonSegment, IonSegmentButton } from "@ionic/react";

interface ContainerProps {
  callbackSelectFilter: (filter: string) => void;
}

const SegmentFilterNotifications: React.FC<ContainerProps> = ({
  callbackSelectFilter,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  const handleSelectFilter = (event: string) => {
    callbackSelectFilter(event);
  };
  //RETURN COMPONENT -----------------
  return (
    <IonSegment
      scrollable={true}
      onIonChange={(e) => handleSelectFilter(e.target.value?.toString() ?? "")}
    >
      <IonSegmentButton value="all">{text[l].filter_all}</IonSegmentButton>
      <IonSegmentButton value="unread">
        {text[l].filter_unread}
      </IonSegmentButton>
      <IonSegmentButton value="orders">
        {text[l].filter_orders}
      </IonSegmentButton>
      <IonSegmentButton value="inventory">
        {text[l].filter_inventory}
      </IonSegmentButton>
      <IonSegmentButton value="reservation">
        {text[l].filter_reservation}
      </IonSegmentButton>
      <IonSegmentButton value="feedback">
        {text[l].filter_feedback}
      </IonSegmentButton>
    </IonSegment>
  );
};

export default SegmentFilterNotifications;
