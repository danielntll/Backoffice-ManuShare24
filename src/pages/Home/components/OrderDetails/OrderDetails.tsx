import { useContext, useEffect, useState } from "react";
import styles from "./OrderDetails.module.css";

import { text } from "./text";
import { ContextLanguage } from "../../../../context/contextLanguage";
import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
} from "@ionic/react";
import { textButtons } from "../../../../text/textButtons";
import * as icons from "ionicons/icons";
import { mockOrders } from "../../../../mock/mockOrders";
import { typeListOrders } from "../../../../types/typeListOrders";
import { groupOrdersByStatus } from "../../../../utils/groupOrdersByStatus";
import { typeStatusOrder } from "../../../../types/typeStatusOrder";
import { mockStatusOrders } from "../../../../mock/mockStatusOrders";
import ModalOrderDetails from "../ModalOrderDetails/ModalOrderDetails";

interface ContainerProps {}

const OrderDetails: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);

  //CONDITIONS -----------------------
  const [orders, setOrders] = useState<typeListOrders[]>([]);

  const [isModalPreviewOpen, setIsModalPreviewOpen] = useState<boolean>(false);

  const [listToPreview, setListToPreview] = useState<typeListOrders | null>(
    null
  );

  const [statusOrders, setStatusOrders] = useState<typeStatusOrder[]>([]);
  //FUNCTIONS ------------------------
  useEffect(() => {
    setOrders(groupOrdersByStatus(mockOrders));
    setStatusOrders(mockStatusOrders);
  }, []);

  // --- handleListAction
  /**
   * Questo metodo è il button sul titolo della lista.
   *
   * Si occuperà di aprire la pagina dei dettagli degli ordini.
   *
   * PARAMS:
   * - Nessuno
   */
  const handleListAction = () => {};

  // --- handlePreviewOrdersList
  /**
   * Questo metodo serve per aprire il modale per visualizzare i dettagli
   * degli ordini in corso.
   *
   * PARAMS:
   * */
  const handlePreviewOrdersList = (list: typeListOrders) => {
    setListToPreview(list);
    setIsModalPreviewOpen(true);
  };
  //RETURN COMPONENT -----------------
  return (
    <>
      <div className={styles.container}>
        <IonCard>
          <IonList inset>
            <IonListHeader>
              <IonLabel>{text[l].componentTitle}</IonLabel>
              <IonButton onClick={handleListAction}>
                {textButtons[l].btn__go_to_page}
                <IonIcon icon={icons["chevronForward"]} />
              </IonButton>
            </IonListHeader>
            {statusOrders.map((status: typeStatusOrder, index: number) => {
              const listOrders: typeListOrders[] = orders.filter(
                (listOrd: typeListOrders) =>
                  listOrd.statusID === status.statusOrderID
              );

              return (
                <IonItem
                  key={index + status.statusOrderID}
                  button={listOrders.length > 0 ? true : false}
                  onClick={
                    listOrders.length > 0
                      ? () => handlePreviewOrdersList(listOrders[0])
                      : () => {}
                  }
                >
                  <IonIcon
                    style={{ color: status?.color }}
                    slot="start"
                    icon={status?.icon}
                    size="large"
                  ></IonIcon>
                  <IonLabel>{status?.name}</IonLabel>
                  <IonNote slot="end">{listOrders[0]?.orders.length}</IonNote>
                </IonItem>
              );
            })}
          </IonList>
        </IonCard>
      </div>
      {/* ----------------- EXTRA UI ----------------------*/}
      <ModalOrderDetails
        callbackHandleListAction={handleListAction}
        isModalPreviewOpen={isModalPreviewOpen}
        setIsModalPreviewOpen={setIsModalPreviewOpen}
        listToPreview={listToPreview}
        statusOrders={statusOrders}
      />
    </>
  );
};

export default OrderDetails;
