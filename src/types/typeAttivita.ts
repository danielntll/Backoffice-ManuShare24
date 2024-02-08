import { typeAttivitaStatus } from "./typeAttivitaStatus";

export type typeAttivita = {
  UID: string;
  logoURL?: string;
  title: string;
  createdAt: number;
  createdBy: string;
  status: typeAttivitaStatus;
  menuUID?: string | null;
};
