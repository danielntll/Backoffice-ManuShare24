import { useContext } from "react";
import styles from "./WidgetIngredientsCritics.module.css";
import { ContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";

interface ContainerProps {}

const WidgetIngredientsCritics: React.FC<ContainerProps> = ({}) => {
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

export default WidgetIngredientsCritics;
