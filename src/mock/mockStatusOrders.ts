import { listCircle } from "ionicons/icons";
import { typeStatusOrder } from "../types/typeStatusOrder";

export const mockStatusOrders: typeStatusOrder[] = [
  {
    statusOrderID: "list1",
    color: "#eb445a",
    name: "In attesa",
    nextID: "list2",
    icon: listCircle,
  },
  {
    statusOrderID: "list2",
    color: "#ffc409",
    name: "Preparazione in corso",
    nextID: "list3",
    icon: listCircle,
  },
  {
    statusOrderID: "list3",
    color: "#2dd36f",
    name: "Consegnato",
    nextID: null,
    icon: listCircle,
  },
];
