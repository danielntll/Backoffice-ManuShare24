import WidgetBookingTodayApproved from "../../../components/Widget__Booking__Today__Approved/WidgetBookingTodayApproved";
import { typeWidget } from "../../../types/typeWidget";

export const ConstDefinitionWidgetBookingTodayApproved: typeWidget = {
  widgetID: "ConstDefinitionWidgetBookingTodayApproved",
  component: <WidgetBookingTodayApproved />,
  category: {
    it_IT: "Prenotazioni",
    en_GB: "Booking Details",
  },
  name: {
    it_IT: "Prenotazioni di oggi approvate",
    en_GB: "Reservation Details",
  },
  description: {
    it_IT:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    en_GB:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
};
