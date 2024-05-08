import { typeOrder } from "../types/typeOrder";
import { mockStatusOrders } from "./mockStatusOrders";

export const mockOrders: typeOrder[] = [
  {
    orderID: "ORD-1234",
    statusID: mockStatusOrders[0].statusOrderID,
    tableID: "TBL-01",
    createdAt: Date.now(),
    updates: [
      {
        userID: "USR-5678",
        createdAt: Date.now() - 1000 * 60 * 5,
        statusOrderName: mockStatusOrders[0].name,
      },
    ],
    products: [
      {
        productID: "PROD-9012",
        notes: "Extra cheese, no onions",
      },
      {
        productID: "PROD-3456",
        notes: "",
      },
    ],
  },
  {
    orderID: "ORD-5678",
    statusID: mockStatusOrders[0].statusOrderID,
    tableID: "TBL-03",
    createdAt: Date.now() - 1000 * 60 * 15,
    updates: [],
    products: [
      {
        productID: "PROD-7890",
        notes: "",
      },
    ],
  },
  {
    orderID: "ORD-9012",
    statusID: mockStatusOrders[1].statusOrderID,
    tableID: "TBL-3",
    createdAt: Date.now() - 1000 * 60 * 60,
    updates: [
      {
        userID: "USR-5678",
        createdAt: Date.now() - 1000 * 60 * 30,
        statusOrderName: mockStatusOrders[1].name,
      },
    ],
    products: [
      {
        productID: "PROD-1234",
        notes: "Decaf coffee",
      },
    ],
  },
];
