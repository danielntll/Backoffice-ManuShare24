import { typeWidget } from "../../types/typeWidget";
import { WidgetAnalytics } from "./analytics/WidgetAnalytics";
import { WidgetInventory } from "./inventory/WidgetInventory";
import { WidgetStatusOrders } from "./orders/WidgetStatusOrders";
import { WidgetReservations } from "./reservation/WidgetReservations";
import { WidgetReservationsPro } from "./reservation/WidgetReservationsPro";
import { WidgetReviews } from "./reviews/WidgetReviews";
import { WidgetReviewsPro } from "./reviews/WidgetReviewsPro";

export const constWidgets: typeWidget[] = [
  WidgetStatusOrders,
  WidgetReservations,
  WidgetInventory,
  WidgetAnalytics,
  WidgetReviews,
  WidgetReviewsPro,
  WidgetReservationsPro,
];
