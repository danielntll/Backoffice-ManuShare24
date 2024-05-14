import OrderDetails from "../../../pages/Home/components/OrderDetails/OrderDetails";
import { typeWidget } from "../../../types/typeWidget";

export const WidgetStatusOrders: typeWidget = {
  widgetID: "statusOrders",
  component: <OrderDetails />,
  name: {
    it_IT: "Status ordini",
    en_GB: "Order Status",
  },
  description: {
    it_IT:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    en_GB:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
};
