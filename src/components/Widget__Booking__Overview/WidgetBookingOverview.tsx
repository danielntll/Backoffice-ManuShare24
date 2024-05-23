import { useContext, useEffect, useState } from "react";
import styles from "./WidgetBookingOverview.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import ListHeader from "../List__Header/ListHeader";
import { IonList } from "@ionic/react";
import { typeBookingStatus } from "../../types/typeBookingStatus";
import { typeBooking } from "../../types/typeBooking";
import { mockBookings } from "../../mock/mockBooking";
import { isToday } from "../../utils/isToday";
import { ConstDefinitionWidgetBookingOverview } from "../../constants/widgets/booking/ConstDefinition__WidgetBookingOverview";

interface ContainerProps {}

const WidgetBookingOverview: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  // --- filter
  /// Stato del filtro
  const [filter, setFilter] = useState<typeBookingStatus>("approved");

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

  // --- bookingApproved
  /// Lista delle prenotazioni approvata dal ristoratore
  const [bookingApproved, setBookingApproved] = useState<typeBooking[] | null>(
    null
  );

  // --- bookingApproved
  /// Lista delle prenotazioni da approvare
  const [bookingPending, setBookingPending] = useState<typeBooking[] | null>(
    null
  );

  // --- bookingApproved
  /// Lista delle prenotazioni rifiutate dal ristoratore
  const [bookingRejected, setBookingRejected] = useState<typeBooking[] | null>(
    null
  );

  // --- bookingApproved
  /// Lista delle prenotazioni cancellate dal utente
  const [bookingCancelled, setBookingCancelled] = useState<
    typeBooking[] | null
  >(null);

  //FUNCTIONS ------------------------

  // --- useEffect [bookingApproved, bookingPending, bookingRejected, bookingCancelled]
  /**
   * 1. Inizializza tutti i dati
   */
  useEffect(() => {
    if (
      bookingApproved === null ||
      bookingPending === null ||
      bookingRejected === null ||
      bookingCancelled === null
    ) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
    }

    if (bookingApproved === null) {
      fetchBookingApproved();
    }
    if (bookingPending === null) {
      fetchBookingPending();
    }
    if (bookingRejected === null) {
      fetchBookingRejected();
    }
    if (bookingCancelled === null) {
      fetchBookingCancelled();
    }
  }, [bookingApproved, bookingPending, bookingRejected, bookingCancelled]);

  // --- fetchBookingApproved
  /**
   *
   */
  const fetchBookingApproved = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const bookingApproved: typeBooking[] = mockBookings.filter(
      (booking) => booking.bookingStatus === "approved"
    );

    setBookingApproved(
      mockBookings.filter((booking) => booking.bookingStatus === "approved")
    );
    setBookingApprovedForToday(
      bookingApproved.filter((booking) => isToday(booking.bookingDate))
    );
  };
  // --- fetchBookingPending
  /**
   *
   */
  const fetchBookingPending = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setBookingPending(
      mockBookings.filter((booking) => booking.bookingStatus === "pending")
    );
  };
  // --- fetchBookingRejected
  /**
   *
   */
  const fetchBookingRejected = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setBookingRejected(
      mockBookings.filter((booking) => booking.bookingStatus === "rejected")
    );
  };
  // --- fetchBookingCancelled
  /**
   *
   */
  const fetchBookingCancelled = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setBookingCancelled(
      mockBookings.filter((booking) => booking.bookingStatus === "cancelled")
    );
  };

  // --- handleOpenModal
  /**
   * Questo metodo serve per aprire il modale
   * con la lista di tutti gli eventi di prenotazione
   *
   * @param filter: typeBookingStatus - lo stato di prenotazione da visualizzare
   *
   */
  const handleOpenModal = (filter: typeBookingStatus) => {
    setFilter(filter);
    setIsModalOpen(!isModalOpen);
  };
  //RETURN COMPONENT -----------------
  return (
    <>
      <div className={styles.container}>
        <IonList inset>
          <ListHeader
            title={ConstDefinitionWidgetBookingOverview.name[l]}
            subtitle={
              ConstDefinitionWidgetBookingOverview.category !== undefined
                ? ConstDefinitionWidgetBookingOverview.category[l]
                : undefined
            }
            callbackListAction={() => handleOpenModal("approved")}
          />
        </IonList>
        <p>{text[l].componentTitle}</p>
      </div>
      {/* ----------------- EXTRA UI ----------------------*/}
    </>
  );
};

export default WidgetBookingOverview;
