import { typeAvailableLanguagesModel } from "./typeAvailableLanguage";
import { typeWidget } from "./typeWidget";

export type typeWidgetsCategory = {
  categoryID: string;
  name: typeAvailableLanguagesModel;
  description: string;
  widgets: typeWidget[];
};
