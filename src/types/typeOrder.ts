export type typeOrder = {
  orderID: string;
  statusID: string;
  tableID: string;
  createdAt: number;
  updates: typeUpdateOrder[];
  products: typeOrderProduct[];
};

export type typeUpdateOrder = {
  userID: string;
  createdAt: number;
  statusOrderName: string;
};

export type typeOrderProduct = {
  productID: string;
  notes: string;
};

export type typeProduct = {
  productID: string;
  name: string;
  description: string;
  ingredients: string[];
};
