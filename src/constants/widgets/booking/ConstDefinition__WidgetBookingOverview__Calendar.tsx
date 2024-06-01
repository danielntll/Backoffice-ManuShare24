import WidgetBookingOverviewCalendar from "../../../components/Widget__Booking__Overview__Calendar/WidgetBookingOverviewCalendar";
import { typeWidget } from "../../../types/typeWidget";

export const ConstDefinitionWidgetBookingOverviewCalendar: typeWidget = {
  widgetID: "ConstDefinitionWidgetBookingOverviewCalendar",
  component: <WidgetBookingOverviewCalendar />,
  category: {
    it_IT: "Prenotazioni",
    en_GB: "Booking Details",
  },
  name: {
    it_IT: "Calendario Prenotazioni",
    en_GB: "Reservation Details",
  },
  description: {
    it_IT:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    en_GB:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
};
