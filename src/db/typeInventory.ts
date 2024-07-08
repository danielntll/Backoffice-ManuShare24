export type typeInventory = {
  // Identificativo Univoco
  UID: string;
  // Elenco degli identificativi degli ingredienti in inventario
  ingredientsUIDs: string[];
  // Elenco degli identificativi dei prodotti in inventario
  productsUIDs: string[];
};
