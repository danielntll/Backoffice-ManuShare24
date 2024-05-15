import { useContext, useEffect, useState } from "react";
import styles from "./ModalOrderDetails.module.css";
import { text } from "./text";
import { ContextLanguage } from "../../../../context/contextLanguage";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
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
import { chevronForward, filterOutline, timeOutline } from "ionicons/icons";
import { mockProducts } from "../../../../mock/mockProducts";
import ActionsheetFilter from "../../../../components/Actionsheet__Filter/ActionsheetFilter";

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
  const [listOrders, setListOrders] = useState<typeListOrders | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  //FUNCTIONS ------------------------
  useEffect(() => {
    setListOrders(listToPreview);
  }, [listToPreview]);

  const handleSelectFilter = (value: string) => {
    console.log(value);
  };
  //RETURN COMPONENT -----------------
  return (
    <>
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
            <IonTitle>
              {
                statusOrders.find(
                  (status) => status.statusOrderID === listOrders?.statusID
                )?.name
              }
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsFiltersOpen(true)} fill="clear">
                {text[l].btn__filter}
                <IonIcon className="icon-margin-left" icon={filterOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {listOrders?.orders.map((order: typeOrder, index: number) => {
            const now = Date.now();
            const differenceInMilliseconds = now - order.createdAt;
            const differenceInMinutes = Math.floor(
              differenceInMilliseconds / (1000 * 60)
            );
            return (
              <IonCard key={order.orderID + index}>
                <IonCardHeader className={styles.header}>
                  <IonCardSubtitle className="inline-row-sb">
                    <h3 className="inline-row-gap">
                      <IonBadge
                        style={{
                          background: statusOrders.find(
                            (status) =>
                              status.statusOrderID === listOrders?.statusID
                          )?.color,
                          color: "#000",
                        }}
                        className={styles.badge}
                      >
                        <IonIcon icon={timeOutline} />
                        {differenceInMinutes} min
                      </IonBadge>{" "}
                    </h3>
                    <IonButton size="small" fill="clear" onClick={() => {}}>
                      {order.tableID}
                      <IonIcon icon={chevronForward} />
                    </IonButton>
                  </IonCardSubtitle>
                </IonCardHeader>
                <span className="ion-padding-start">{text[l].orders}</span>
                <IonList inset>
                  {order.products.map(
                    (orderProduct: typeOrderProduct, index: number) => {
                      const product: typeProduct | undefined =
                        mockProducts.find(
                          (prod) => prod.productID === orderProduct.productID
                        );
                      return (
                        <IonItem key={index + orderProduct.productID}>
                          <IonLabel>
                            <h3>{product?.name}</h3>
                            <p>{orderProduct.notes}</p>
                          </IonLabel>
                        </IonItem>
                      );
                    }
                  )}
                </IonList>
                <IonLabel></IonLabel>
              </IonCard>
            );
          })}
        </IonContent>
      </IonModal>
      {/* ----------------- EXTRA UI ----------------------*/}
      <ActionsheetFilter
        isOpen={isFiltersOpen}
        setIsOpen={setIsFiltersOpen}
        callbackSelectedValue={handleSelectFilter}
        buttons={[
          {
            text: "Tempo di attesa",
            data: {
              action: "Tempo di attesa",
            },
          },
          {
            text: "Nome tavolo",
            data: {
              action: "Nome tavolo",
            },
          },
          {
            text: "Numero ordini",
            data: {
              action: "Numero ordini",
            },
          },
        ]}
      />
    </>
  );
};

export default ModalOrderDetails;
