import WidgetIngredientsStockStatus from "../../../components/Widget__Ingredients__Stock__Status/WidgetIngredientsStockStatus";
import { typeWidget } from "../../../types/typeWidget";

export const WidgetInventoryIngredientsStockStatus: typeWidget = {
  widgetID: "WidgetInventoryIngredientsStockStatus",
  component: <WidgetIngredientsStockStatus />,
  category: {
    it_IT: "Inventario",
    en_GB: "Inventory Status",
  },
  name: {
    it_IT: "Status Scorte",
    en_GB: "Ingrents critics",
  },
  description: {
    it_IT:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    en_GB:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
};
