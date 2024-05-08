import { useContext } from "react";
import styles from "./ModalOrderDetails.module.css";
import { text } from "./text";
import { ContextLanguage } from "../../../../context/contextLanguage";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { textButtons } from "../../../../text/textButtons";
import { typeStatusOrder } from "../../../../types/typeStatusOrder";
import { typeListOrders } from "../../../../types/typeListOrders";
import {
  typeOrder,
  typeOrderProduct,
  typeProduct,
} from "../../../../types/typeOrder";
import { chevronForward } from "ionicons/icons";
import { mockProducts } from "../../../../mock/mockProducts";

interface ContainerProps {
  isModalPreviewOpen: boolean;
  setIsModalPreviewOpen: (update: boolean) => void;
  statusOrders: typeStatusOrder[];
  listToPreview: typeListOrders | null;
  callbackHandleListAction: () => void;
}

const ModalOrderDetails: React.FC<ContainerProps> = ({
  isModalPreviewOpen,
  setIsModalPreviewOpen,
  statusOrders,
  listToPreview,
  callbackHandleListAction,
}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  console.log(listToPreview);
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonModal
      isOpen={isModalPreviewOpen}
      onDidDismiss={() => setIsModalPreviewOpen(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color={"medium"}
              onClick={() => setIsModalPreviewOpen(false)}
            >
              {textButtons[l].btn__toast__close}
            </IonButton>
          </IonButtons>
          <IonTitle>{text[l].componentTitle}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={callbackHandleListAction}>
              {textButtons[l].btn__go_to_page}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {
                statusOrders.find(
                  (status) => status.statusOrderID === listToPreview?.statusID
                )?.name
              }
            </IonCardTitle>
          </IonCardHeader>
          {listToPreview?.orders.map((order: typeOrder, index: number) => {
            return (
              <IonList inset key={order.orderID}>
                <IonListHeader>
                  <IonLabel>{order.tableID}</IonLabel>
                  <IonButton onClick={() => {}}>
                    {text[l].btn__table}
                    <IonIcon icon={chevronForward} />
                  </IonButton>
                </IonListHeader>

                {order.products.map(
                  (orderProduct: typeOrderProduct, index: number) => {
                    const product: typeProduct | undefined = mockProducts.find(
                      (prod) => prod.productID === orderProduct.productID
                    );
                    return (
                      <IonItem
                        key={index + orderProduct.productID}
                        button={true}
                        onClick={() => {}}
                      >
                        <IonLabel>
                          <h3>{product?.name}</h3>
                          <p>{orderProduct.notes}</p>
                        </IonLabel>
                      </IonItem>
                    );
                  }
                )}
              </IonList>
            );
          })}
        </IonCard>
      </IonContent>
    </IonModal>
  );
};

export default ModalOrderDetails;
