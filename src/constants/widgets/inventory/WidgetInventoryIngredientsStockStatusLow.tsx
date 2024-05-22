import WidgetIngredientsStockStatusLow from "../../../components/Widget__Ingredients__Stock__Status__Low/WidgetIngredientsStockStatusLow";
import { typeWidget } from "../../../types/typeWidget";

export const WidgetInventoryIngredientsStockStatusLow: typeWidget = {
  widgetID: "WidgetInventoryIngredientsStockStatusLow",
  component: <WidgetIngredientsStockStatusLow />,
  category: {
    it_IT: "Inventario",
    en_GB: "Inventario",
  },
  name: {
    it_IT: "Scorte basse",
    en_GB: "Scorte basse",
  },
  description: {
    it_IT:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    en_GB:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
};
