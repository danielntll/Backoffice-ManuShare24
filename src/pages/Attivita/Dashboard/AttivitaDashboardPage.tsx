import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { text } from "./text";

import styles from "./AttivitaDashboardPage.module.css";
import { useContext, useEffect, useState } from "react";
import {
  checkmark,
  happyOutline,
  skullOutline,
  storefrontOutline,
  warning,
} from "ionicons/icons";
import { AuthContext } from "../../../context/contextAuth";
import { textButtons } from "../../../text/textButtons";
import {
  LOCAL_KEY_ATTIVITA,
  setLocalstorageData,
} from "../../../utils/localstorage";
import { DataContext } from "../../../context/data/contextData";
import { User } from "firebase/auth";
import CardAttivita from "../../../components/Card__Attivita/CardAttivita";
import { ContextLanguage } from "../../../context/contextLanguage";
import { serviceCreateAttivita } from "../../../services/attivita/service_create_attivita";
import { typeAttivita } from "../../../types/typeAttivita";
import { ContextToast } from "../../../context/contextToast";

interface PageProps {}

const AttivitaDashboardPage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const { authenticateUser } = useContext(AuthContext);
  const { attivita } = useContext(DataContext);
  const { toast } = useContext(ContextToast);
  //CONDITIONS -----------------------
  const [user, setUser] = useState<User>();
  const [nameAttivita, setNameAttivita] = useState<string>("");
  // USE EFFECTS ---------------------
  useEffect(() => {
    if (authenticateUser !== undefined) {
      console.log(authenticateUser);
      setUser(authenticateUser);
    }
  }, [authenticateUser]);

  //FUNCTIONS ------------------------
  const createAttivita = async () => {
    if (nameAttivita.length > 0) {
      // creazione attività sul db
      let resp = await serviceCreateAttivita(nameAttivita, user!.uid);
      if (resp !== null) {
        // salvataggio attività sul locale
        await setLocalstorageData(LOCAL_KEY_ATTIVITA, resp);
        // feedback posistivo al utente
        toast(
          "success",
          text[l].success__welcome__start +
            nameAttivita +
            text[l].success__welcome__end
        );
      } else {
        toast("danger", text[l].danger__creation);
      }
      setIsModalCreateOpen(false);
    } else {
      toast("warning", text[l].warning__noName);
    }
  };
  //EXTRA UI  ------------------------
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const openNewAttivitaModal = () => {
    setIsModalCreateOpen(true);
  };
  //RETURN COMPONENT -----------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{text[l].pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{text[l].pageTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* ----------------- PAGE CONTENT ------------------*/}
        <div className={styles.content}>
          {attivita.length === 0 ? (
            <>
              <IonLabel>
                <p>{text[l].no__attivita}</p>
              </IonLabel>
              <br />
              <IonButton
                expand="block"
                fill="solid"
                onClick={openNewAttivitaModal}
              >
                {text[l].btn__create}
                <IonIcon
                  icon={storefrontOutline}
                  className="icon-margin-left"
                />
              </IonButton>
            </>
          ) : (
            attivita.map((att: typeAttivita, index: number) => {
              return <CardAttivita key={index} attivitaData={att} />;
            })
          )}
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
        <IonModal
          isOpen={isModalCreateOpen}
          onDidDismiss={() => setIsModalCreateOpen(false)}
          initialBreakpoint={0.5}
          breakpoints={[0.25, 0.5]}
        >
          <IonContent>
            <IonList inset>
              <IonItem>
                <IonInput
                  required
                  clearInput
                  label={text[l].input__name.label}
                  labelPlacement="stacked"
                  type="email"
                  placeholder={text[l].input__name.ph}
                  value={nameAttivita}
                  onIonInput={(e) => {
                    setNameAttivita(e.detail.value!);
                  }}
                />
              </IonItem>
            </IonList>
            <div className="ion-padding">
              <IonButton
                expand="block"
                fill="solid"
                color={"success"}
                disabled={nameAttivita.length > 0 ? false : true}
                onClick={createAttivita}
              >
                {text[l].btn__confirm}
                <IonIcon icon={checkmark} />
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default AttivitaDashboardPage;
