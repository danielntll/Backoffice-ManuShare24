import { useContext, useEffect, useState } from "react";
import styles from "./ItemBookingStatus.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonAvatar,
  IonBadge,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonSkeletonText,
} from "@ionic/react";
import { typeBooking } from "../../types/typeBooking";
import { dateHHMM } from "../../utils/dateHHMM";
import { typeBookingStatus } from "../../types/typeBookingStatus";
import { dateGGMMAAAA } from "../../utils/dateGGMMAAAA";
import {
  calendarNumberOutline,
  callOutline,
  chatbubblesOutline,
  mailOutline,
  timeOutline,
} from "ionicons/icons";
import { typeTable } from "../../types/typeTable";
import { mockTables } from "../../mock/mockTables";

interface ContainerProps {
  booking?: typeBooking;
  onClick: () => void;
  isLoading: boolean;
  showStatus?: boolean;
}

const ItemBookingStatus: React.FC<ContainerProps> = ({
  booking,
  onClick,
  isLoading,
  showStatus = true,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  // --- statusLocal
  /// Questa variabile rappresenta lo stato attuale della prenotazione
  /// E si basa sullo stato dell'oggetto booking passato.
  const [statusLocal, setStatusLocal] = useState<
    string | typeBookingStatus | undefined
  >();

  // --- color
  /// Questa variabile rappresenta il colore del badge dell'oggetto booking passato.
  /// E si basa sullo stato dell'oggetto booking passato.
  const [color, setColor] = useState<string | undefined>();

  // --- tableInformation
  /// Questa variabile rappresenta le informazioni del tavolo associato alla prenotazione
  /// E si basa sullo stato dell'oggetto booking passato.
  const [tableInformation, setTableInformation] = useState<
    typeTable | undefined
  >();

  //FUNCTIONS ------------------------
  useEffect(() => {
    if (!isLoading) {
      switch (booking?.bookingStatus) {
        case "approved":
          setStatusLocal(text[l].status_approved);
          setColor("success");
          break;
        case "rejected":
          setStatusLocal(text[l].status_rejected);
          setColor("danger");
          break;
        case "pending":
          setStatusLocal(text[l].status_pending);
          setColor("warning");
          break;
        case "cancelled":
          setStatusLocal(text[l].status_cancelled);
          setColor("danger");
          break;
        default:
          setStatusLocal(text[l].status_approved);
          setColor("success");
          break;
      }
      if (booking?.tableID != null) {
        getTableInformations(booking.tableID);
      }
    }
  }, [booking, isLoading]);

  // --- getTableInformations()
  /// Questa funzione si occupa di ottenere le informazioni del tavolo associato alla prenotazione.
  const getTableInformations = (tableID: string) => {
    setTableInformation(mockTables.find((table) => table.tableID === tableID));
  };
  //RETURN COMPONENT -----------------
  return (
    <IonItem button onClick={onClick}>
      <IonAvatar slot="start">
        {isLoading ? (
          <IonSkeletonText animated={true}></IonSkeletonText>
        ) : (
          <img
            alt="Silhouette of a person's head"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        )}
      </IonAvatar>
      <IonLabel>
        <p className="inline-row-gap">
          {isLoading ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            <h3 className="inline-row-gap">
              {booking?.customerData.firstName} {booking?.customerData.lastName}
              {booking?.customerData.userID != null ? (
                <IonIcon icon={chatbubblesOutline} />
              ) : (
                ""
              )}
              {booking?.customerData.email != null ? (
                <IonIcon icon={mailOutline} />
              ) : (
                ""
              )}
              {booking?.customerData.phone != null ? (
                <IonIcon icon={callOutline} />
              ) : (
                ""
              )}
            </h3>
          )}

          {showStatus && <IonBadge color={color}>{statusLocal ?? ""}</IonBadge>}
        </p>
        <h2 className="inline-row-gap">
          {isLoading ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            <span className="inline-row-sb">
              <IonIcon className="icon-margin-right" icon={timeOutline} />
              {booking && dateHHMM(booking.bookingDate)}
            </span>
          )}
        </h2>
        <h2 className="inline-row-gap">
          {isLoading ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            <span className="inline-row-sb">
              <IonIcon
                className="icon-margin-right"
                icon={calendarNumberOutline}
              />
              {booking && dateGGMMAAAA(booking.bookingDate)}
            </span>
          )}
        </h2>

        <p className="inline-row-gap">
          {isLoading ? (
            <IonSkeletonText animated={true}></IonSkeletonText>
          ) : (
            <IonBadge className="inline-row-gap" color={"medium"}>
              x{booking?.peopleNumber}
            </IonBadge>
          )}
          {booking?.noteByCustomer != null
            ? "Note: " + `${booking.noteByCustomer ?? ""}`
            : ""}
        </p>
      </IonLabel>
      <IonNote slot="end">
        {isLoading ? (
          <IonSkeletonText animated={true}></IonSkeletonText>
        ) : (
          tableInformation?.tableID ?? ""
        )}
      </IonNote>
    </IonItem>
  );
};

export default ItemBookingStatus;
