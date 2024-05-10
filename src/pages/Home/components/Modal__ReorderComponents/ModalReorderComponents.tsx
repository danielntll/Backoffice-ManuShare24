import { useContext } from "react";
import styles from "./ModalReorderComponents.module.css";
import { text } from "./text";
import { ContextLanguage } from "../../../../context/contextLanguage";

interface ContainerProps {}

const ModalReorderComponents: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      <p>{text[l].componentTitle}</p>
    </div>
  );
};

export default ModalReorderComponents;
