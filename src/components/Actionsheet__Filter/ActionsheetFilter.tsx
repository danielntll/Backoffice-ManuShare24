import { useContext } from "react";
import { ContextLanguage } from "../../context/contextLanguage";
import { ActionSheetButton, IonActionSheet } from "@ionic/react";
import { text } from "./text";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  callbackSelectedValue: (value: string) => void;
  buttons: ActionSheetButton[];
}

const ActionsheetFilter: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  callbackSelectedValue,
  buttons,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonActionSheet
      isOpen={isOpen}
      header={text[l].title}
      buttons={[
        ...buttons,

        {
          text: text[l].btn__cancel,
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ]}
      onDidDismiss={({ detail }) => {
        callbackSelectedValue(JSON.stringify(detail, null, 2));
        setIsOpen(false);
      }}
    ></IonActionSheet>
  );
};

export default ActionsheetFilter;
