/**
 * Questo type rappresenta i dati del tavolo del ristorante,
 * nell'ottica in cui il ristorante volesse aggiungere informazioni
 * sui vari tavoli a disposizione, per permettere al cliente
 * di poter selezionare (in caso) il tavolo con la descrizione
 * più accattivante/attraente.
 */
export type typeTable = {
  tableID: string;
  tableName: string;
  tableDescription: string;
  tablePrice?: number;
  tableImage: string;
};

// typeTable.ts
