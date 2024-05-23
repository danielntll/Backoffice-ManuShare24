import { typeWidget } from "../../types/typeWidget";
import { WidgetAnalytics } from "./analytics/WidgetAnalytics";
import { WidgetInventory } from "./inventory/WidgetInventory";
import { WidgetInventoryIngredientsCritics } from "./inventory/WidgetInventoryIngredientsCritics";
import { WidgetInventoryIngredientsStockStatus } from "./inventory/WidgetInventoryIngredientsStockStatus";
import { WidgetInventoryIngredientsStockStatusLow } from "./inventory/WidgetInventoryIngredientsStockStatusLow";
import { WidgetInventoryIngredientsStockStatusNoStock } from "./inventory/WidgetInventoryIngredientsStockStatusNoStock";
import { WidgetStatusOrders } from "./orders/WidgetStatusOrders";
import { WidgetStatusOrdersStandard } from "./orders/WidgetStatusOrdersStandard";
import { WidgetReservations } from "./booking/WidgetReservations";
import { WidgetReservationsPro } from "./booking/WidgetReservationsPro";
import { WidgetReviews } from "./reviews/WidgetReviews";
import { WidgetReviewsPro } from "./reviews/WidgetReviewsPro";
import { WidgetReviewsStandard } from "./reviews/WidgetReviewsStandard";
import { ConstDefinitionWidgetBookingOverview } from "./booking/ConstDefinition__WidgetBookingOverview";

export const constWidgetsFREE: typeWidget[] = [
  WidgetStatusOrders,
  WidgetReservations,
  WidgetInventory,
  ConstDefinitionWidgetBookingOverview,
  WidgetInventoryIngredientsStockStatusNoStock,
  WidgetInventoryIngredientsStockStatusLow,
  WidgetInventoryIngredientsStockStatus,
  WidgetInventoryIngredientsCritics,
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
