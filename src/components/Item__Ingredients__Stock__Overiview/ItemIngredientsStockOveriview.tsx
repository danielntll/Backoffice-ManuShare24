import { useContext } from "react";
import { ContextLanguage } from "../../context/contextLanguage";
import {
  IonAvatar,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonSkeletonText,
} from "@ionic/react";

interface ContainerProps {
  callbackClick: () => void;
  icon: string;
  title: string;
  subtitle: string;
  number: number;
  skeleton?: boolean;
}

const ItemIngredientsStockOveriview: React.FC<ContainerProps> = ({
  callbackClick,
  icon,
  title,
  subtitle,
  number,
  skeleton = false,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonItem button onClick={callbackClick}>
      {skeleton ? (
        <IonAvatar slot="start">
          <IonSkeletonText animated={true}></IonSkeletonText>
        </IonAvatar>
      ) : (
        <IonIcon slot="start" icon={icon} />
      )}
      <IonLabel>
        <h2>
          {skeleton ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            title
          )}
        </h2>
        <p>
          {skeleton ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            subtitle
          )}
        </p>
      </IonLabel>
      <IonNote>
        {skeleton ? (
          <IonSkeletonText animated={true}></IonSkeletonText>
        ) : (
          number
        )}
      </IonNote>
    </IonItem>
  );
};

export default ItemIngredientsStockOveriview;
