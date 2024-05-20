import { typeAvailableLanguagesModel } from "./typeAvailableLanguage";

export type typeWidget = {
  widgetID: string;
  category?: typeAvailableLanguagesModel;
  name: typeAvailableLanguagesModel;
  description: typeAvailableLanguagesModel;
  component: any;
};
