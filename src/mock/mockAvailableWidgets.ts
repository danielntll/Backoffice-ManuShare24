import { WidgetAnalytics } from "../constants/widgets/analytics/WidgetAnalytics";
import { ConstDefinitionWidgetBookingOverview } from "../constants/widgets/booking/ConstDefinition__WidgetBookingOverview";
import { ConstDefinitionWidgetBookingTodayApproved } from "../constants/widgets/booking/ConstDefinition__WidgetBookingTodayApproved";
import { WidgetReservations } from "../constants/widgets/booking/WidgetReservations";
import { WidgetInventory } from "../constants/widgets/inventory/WidgetInventory";
import { WidgetInventoryIngredientsStockStatus } from "../constants/widgets/inventory/WidgetInventoryIngredientsStockStatus";
import { WidgetStatusOrders } from "../constants/widgets/orders/WidgetStatusOrders";
import { WidgetReviews } from "../constants/widgets/reviews/WidgetReviews";
import { typeWidget } from "../types/typeWidget";

export const mockAvailableWidgets: typeWidget[] = [
  ConstDefinitionWidgetBookingTodayApproved,
  ConstDefinitionWidgetBookingOverview,
  WidgetInventoryIngredientsStockStatus,
  WidgetStatusOrders,
  WidgetInventory,
  WidgetReservations,
  WidgetAnalytics,
  WidgetReviews,
];
