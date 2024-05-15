import InventoryDetails from "../../../components/InventoryDetails/InventoryDetails";
import { typeWidget } from "../../../types/typeWidget";

export const WidgetInventory: typeWidget = {
  widgetID: "InventoryDetails",
  component: <InventoryDetails />,
  name: {
    it_IT: "Inventario",
    en_GB: "Inventory Status",
  },
  description: {
    it_IT:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    en_GB:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
};
