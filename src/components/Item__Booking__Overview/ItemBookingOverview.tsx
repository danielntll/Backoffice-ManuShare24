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

const ItemBookingOverview: React.FC<ContainerProps> = ({
  callbackClick,
  icon,
  title,
  subtitle,
  number,
  skeleton = false,
}) => {
  //VARIABLES ------------------------
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
      <IonLabel className="ion-text-nowrap">
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

export default ItemBookingOverview;
