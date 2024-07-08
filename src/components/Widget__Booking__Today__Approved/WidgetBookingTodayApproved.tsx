import { useContext, useEffect, useState } from "react";
import styles from "./WidgetBookingTodayApproved.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { IonList } from "@ionic/react";
import ListHeader from "../List__Header/ListHeader";
import { ConstDefinitionWidgetBookingTodayApproved } from "../../constants/widgets/booking/ConstDefinition__WidgetBookingTodayApproved";
import { typeBooking } from "../../types/typeBooking";
import { mockBookings } from "../../mock/mockBooking";
import { isToday } from "../../utils/isToday";
import ItemBookingStatus from "../Item__Booking__Status/ItemBookingStatus";
import ItemBookingDoPromote from "../Item__Booking_DoPromote/ItemBookingDoPromote";

interface ContainerProps {}

const WidgetBookingTodayApproved: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------

  // --- isModalOpen
  /// Questa variabile serve per indicare se il modal è aperto
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // --- isFetching
  /// Indica se la fetch degli ingredienti è in corso.
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // --- bookingApprovedForToday
  /// Lista delle prenotazioni approvata dal ristoratore
  const [bookingApprovedForToday, setBookingApprovedForToday] = useState<
    typeBooking[] | null
  >(null);

  //FUNCTIONS ------------------------

  // --- useEffect [bookingApproved, bookingPending, bookingRejected, bookingCancelled]
  /**
   * 1. Inizializza tutti i dati
   */
  useEffect(() => {
    if (bookingApprovedForToday === null) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
    }

    if (bookingApprovedForToday === null) {
      fetchBookingApproved();
    }
  }, [bookingApprovedForToday]);

  // --- fetchBookingApproved
  /**
   *
   */
  const fetchBookingApproved = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const bookingApproved: typeBooking[] = mockBookings.filter(
      (booking) => booking.bookingStatus === "approved"
    );

    setBookingApprovedForToday(
      bookingApproved.filter((booking) => isToday(booking.bookingDate))
    );
  };

  // --- handleOpenModal
  /**
   * Questo metodo serve per aprire il modale
   * con la lista di tutti gli eventi di prenotazione
   *
   * @param filter: typeBookingFilter - lo stato di prenotazione da visualizzare
   *
   */
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  //RETURN COMPONENT -----------------
  return (
    <>
      <div className={styles.container}>
        <IonList inset>
          <ListHeader
            title={ConstDefinitionWidgetBookingTodayApproved.name[l]}
            subtitle={
              ConstDefinitionWidgetBookingTodayApproved.category !== undefined
                ? ConstDefinitionWidgetBookingTodayApproved.category[l]
                : undefined
            }
            callbackListAction={() => handleOpenModal()}
          />
          {isFetching ? (
            <>
              <ItemBookingStatus isLoading={isFetching} onClick={() => {}} />
              <ItemBookingStatus isLoading={isFetching} onClick={() => {}} />
              <ItemBookingStatus isLoading={isFetching} onClick={() => {}} />
            </>
          ) : (
            <></>
          )}
          {bookingApprovedForToday?.length === 0 && <ItemBookingDoPromote />}
          {bookingApprovedForToday?.map(
            (booking: typeBooking, index: number) => {
              return (
                <ItemBookingStatus
                  key={"WidgetBookingTodayApproved" + booking.bookingID + index}
                  booking={booking}
                  isLoading={isFetching}
                  onClick={() => {}}
                />
              );
            }
          )}
        </IonList>
      </div>
    </>
  );
};

export default WidgetBookingTodayApproved;
