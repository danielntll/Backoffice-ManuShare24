import WidgetIngredientsCritics from "../../../components/Widget__Ingredients__Critics/WidgetIngredientsCritics";
import { typeWidget } from "../../../types/typeWidget";

export const WidgetInventoryIngredientsCritics: typeWidget = {
  widgetID: "WidgetInventoryIngredientsCritics",
  component: <WidgetIngredientsCritics />,
  category: {
    it_IT: "Inventario",
    en_GB: "Inventory Status",
  },
  name: {
    it_IT: "Ingredienti critici",
    en_GB: "Ingrents critics",
  },
  description: {
    it_IT:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    en_GB:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
};
