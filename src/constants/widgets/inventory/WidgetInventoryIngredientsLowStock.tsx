import WidgetIngredientsLowStock from "../../../components/Widget__Ingredients__Low__Stock/WidgetIngredientsLowStock";
import { typeWidget } from "../../../types/typeWidget";

export const WidgetInventoryIngredientsLowStock: typeWidget = {
  widgetID: "WidgetIngredientsLowStock",
  component: <WidgetIngredientsLowStock />,
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
