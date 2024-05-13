export type typeNotification = {
  notificationID: string;
  title: string;
  description: string;
  createdAt: number;
  category: "orders" | "inventory" | "reservation" | "feedback";
  readed: boolean;
};
