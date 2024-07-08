export type typeSupplyHistory = {
  // Identificativo Univoco
  UID: string;
  // Identificativo Univoco del Fornitore
  supplierUID: string;
  // Data della crazione in timestamp
  createdAt: Date;
  // L'UID del prodotto richiesto
  supplyRequiredUID: string;
  // Quantià richiesta
  quantity: number;
  // Unità di misura della quantità richiesta KG, g, l, pz ecc
  unit: string;
  // Costo unitario del prodotto
  pricePerUnit: number;
};
