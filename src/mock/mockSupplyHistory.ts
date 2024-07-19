import { typeSupplyHistory } from "../db/typeSupplyHistory";

export const mockSupplyHistory: typeSupplyHistory[] = [
  {
    UID: "supply1",
    supplierUID: "supplierA",
    createdAt: new Date("2023-03-15T10:00:00"),
    supplyRequiredUID: "product1",
    quantity: 10,
    unit: "KG",
    pricePerUnit: 10.5,
  },
  {
    UID: "supply2",
    supplierUID: "supplierB",
    createdAt: new Date("2023-03-22T14:30:00"),
    supplyRequiredUID: "product2",
    quantity: 5,
    unit: "KG",
    pricePerUnit: 12,
  },
  {
    UID: "supply3",
    supplierUID: "supplierC",
    createdAt: new Date("2023-03-29T16:15:00"),
    supplyRequiredUID: "product3",
    quantity: 20,
    unit: "PZ",
    pricePerUnit: 2.5,
  },
];
