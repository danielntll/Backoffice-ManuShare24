import ReviewsDetails from "../../../pages/Home/components/ReviewsDetails/ReviewsDetails";
import { typeWidget } from "../../../types/typeWidget";

export const WidgetReviews: typeWidget = {
  widgetID: "ReviewsDetails",
  component: <ReviewsDetails />,
  name: {
    it_IT: "Recensioni",
    en_GB: "Reviews Details",
  },
  description: {
    it_IT:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    en_GB:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
};
