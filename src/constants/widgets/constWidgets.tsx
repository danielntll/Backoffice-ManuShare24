import { typeWidget } from "../../types/typeWidget";
import { WidgetAnalytics } from "./analytics/WidgetAnalytics";
import { WidgetInventory } from "./inventory/WidgetInventory";
import { WidgetStatusOrders } from "./orders/WidgetStatusOrders";
import { WidgetStatusOrdersStandard } from "./orders/WidgetStatusOrdersStandard";
import { WidgetReservations } from "./reservation/WidgetReservations";
import { WidgetReservationsPro } from "./reservation/WidgetReservationsPro";
import { WidgetReviews } from "./reviews/WidgetReviews";
import { WidgetReviewsPro } from "./reviews/WidgetReviewsPro";
import { WidgetReviewsStandard } from "./reviews/WidgetReviewsStandard";

export const constWidgetsFREE: typeWidget[] = [
  WidgetStatusOrders,
  WidgetReservations,
  WidgetInventory,
  WidgetAnalytics,
  WidgetReviews,
];

export const constWidgetsSTANDARD: typeWidget[] = [
  WidgetReviewsStandard,
  WidgetStatusOrdersStandard,
];
export const constWidgetsPRO: typeWidget[] = [
  WidgetReviewsPro,
  WidgetReservationsPro,
];
