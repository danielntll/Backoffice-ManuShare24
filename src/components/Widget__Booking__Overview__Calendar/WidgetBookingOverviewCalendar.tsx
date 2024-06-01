import { useContext } from "react";
import styles from "./WidgetBookingOverviewCalendar.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonDatetime, IonItem, IonList } from "@ionic/react";
import ListHeader from "../List__Header/ListHeader";
import { ConstDefinitionWidgetBookingOverviewCalendar } from "../../constants/widgets/booking/ConstDefinition__WidgetBookingOverview__Calendar";
import ItemBookingStatus from "../Item__Booking__Status/ItemBookingStatus";
import { mockBookings } from "../../mock/mockBooking";

interface ContainerProps {}

const WidgetBookingOverviewCalendar: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------

  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <>
      <div className={styles.container}>
        <IonList inset>
          <ListHeader
            title={ConstDefinitionWidgetBookingOverviewCalendar.name[l]}
            subtitle={
              ConstDefinitionWidgetBookingOverviewCalendar.category !==
              undefined
                ? ConstDefinitionWidgetBookingOverviewCalendar.category[l]
                : undefined
            }
            callbackListAction={() => {}}
          />
          <IonDatetime
            className={styles.calendar}
            presentation="date"
            highlightedDates={(isoString) => {
              const date = new Date(isoString);
              const utcDay = date.getUTCDate();

              if (utcDay % 5 === 0) {
                return {
                  textColor: "#800080",
                  backgroundColor: "#ffc0cb",
                };
              }

              if (utcDay % 3 === 0) {
                return {
                  textColor: "var(--ion-color-secondary-contrast)",
                  backgroundColor: "var(--ion-color-secondary)",
                };
              }

              return undefined;
            }}
          ></IonDatetime>

          <ItemBookingStatus
            key={"WidgetBookingOverviewCalendar"}
            booking={mockBookings[0]}
            isLoading={false}
            onClick={() => {}}
          />
        </IonList>
      </div>
    </>
  );
};

export default WidgetBookingOverviewCalendar;
