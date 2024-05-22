import WidgetIngredientsStockStatusNoStock from "../../../components/Widget__Ingredients__Stock__Status__NoStock/WidgetIngredientsStockStatusNoStock";
import { typeWidget } from "../../../types/typeWidget";

export const WidgetInventoryIngredientsStockStatusNoStock: typeWidget = {
  widgetID: "WidgetInventoryIngredientsStockStatusNoStock",
  component: <WidgetIngredientsStockStatusNoStock />,
  category: {
    it_IT: "Inventario",
    en_GB: "Inventario",
  },
  name: {
    it_IT: "Scorte esaurite",
    en_GB: "Scorte esaurite",
  },
  description: {
    it_IT:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    en_GB:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
};
