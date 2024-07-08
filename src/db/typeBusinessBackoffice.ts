export type typeBusinessBackoffice = {
  // Identificativo Univoco
  UID: string;
  // Identificativo dell'attività
  businessUID: string;
  // Elenco degli identificativi degli ordini ricevuti
  ordersUIDs: string[];
  // Identificativo dell'inventario
  inventoryUID: string;
  // Elenco degli identificativi dei tavoli dell'attività (opzionale)
  tablesUIDs?: string[];
};
