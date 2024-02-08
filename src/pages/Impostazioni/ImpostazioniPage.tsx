import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonModal,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { text } from "./text";
import { text as textFooter } from "../../components/Footer/text";

import styles from "./ImpostazioniPage.module.css";
import { useContext, useEffect, useState } from "react";
import {
  createOutline,
  eye,
  eyeOff,
  happyOutline,
  informationCircleOutline,
  lockClosedOutline,
  logOutOutline,
  mailOutline,
  skullOutline,
  trashOutline,
  warning,
} from "ionicons/icons";
import {
  deleteUser,
  signOut,
  updatePassword,
  User,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { AuthContext } from "../../context/contextAuth";
import { textButtons } from "../../text/textButtons";
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from "@capacitor/push-notifications";
import {
  LINK_LAST_RELEASE,
  LINK_SUPPORT,
  LINK_TERMNS_POLICY,
} from "../../utils/links";
import { Device, DeviceInfo } from "@capacitor/device";
import { ContextLanguage } from "../../context/contextLanguage";
import { typeAvailableLanguages } from "../../types/typeAvailableLanguage";
import { ContextToast } from "../../context/contextToast";

interface PageProps {}

const ImpostazioniPage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l, updateLanguage } = useContext(ContextLanguage);
  const { authenticateUser, auth } = useContext(AuthContext);
  const { toast } = useContext(ContextToast);
  //CONDITIONS -----------------------
  // ---- user
  const [user, setUser] = useState<User>();
  // ---- new mail
  const [newEmail, setNewEmail] = useState<string>("");
  // ---- new password
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  // --- modals
  const [isModalNewEmail, setIsModalNewEmail] = useState<boolean>(false);
  const [isModalLogout, setIsModalLogout] = useState<boolean>(false);
  const [isModalPassword, setIsModalPassword] = useState<boolean>(false);
  const [isModalDeleteAccount, setIsModalDeleteAccount] =
    useState<boolean>(false);
  // --- alerts
  const [isAlertLinguaOpen, setIsAlertLinguaOpen] = useState<boolean>(false);
  // --- preferenze
  const [lingua, setLingua] = useState<typeAvailableLanguages>(l);
  // --- notifications
  const [notificationToken, setNotificationToken] = useState<string>("");
  const [enabledNotifications, setEnabledNotifications] = useState<any>();
  // --- device
  const [device, setDevice] = useState<DeviceInfo>();

  //FUNCTIONS ------------------------
  useEffect(() => {
    // inizializzazione
    if (authenticateUser !== null || authenticateUser !== undefined) {
      // utente
      setUser(authenticateUser);
      // notifiche
      setEnabledNotifications({
        vantaggi: false,
        promozioni: false,
        inventario: true,
        recensioni: true,
        report: false,
      });
      // device
      getDevice();
      // preferenze
      // abbonamento
    }
  }, [authenticateUser]);

  // --- Notification Token
  useEffect(() => {
    if (false) {
      // console.log('Initializing HomePage');

      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermissions().then((result) => {
        console.log("******** RICHIESTA PERMESSO");
        if (result.receive === "granted") {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
          console.log("******** RICHIESTA REGISTRATA");
        } else {
          // Show some error
          console.log("******** RICHIESTA ERRATA");
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener("registration", (token: Token) => {
        console.log("********Push registration success, token: " + token.value);
        setNotificationToken(token.value);
        //Todo: registrazione del token
      });

      // Some issue with our setup and push will not work
      PushNotifications.addListener("registrationError", (error: any) => {
        console.log(
          "********Push Error on registration: " + JSON.stringify(error)
        );
      });

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification: PushNotificationSchema) => {
          console.log(
            " ********Push Push received: " + JSON.stringify(notification)
          );
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification: ActionPerformed) => {
          console.log(
            " ********Push Push action performed: " + notification.notification
          );
          const data = notification.notification.data;
          if (data.datailsId) {
            console.log("ROUTE TO : ", data.datailsId);
          }
        }
      );
    }
  }, []);

  // --- handle
  const handleEmail = () => {
    setIsModalNewEmail(true);
  };
  const handlePassword = () => {
    setIsModalPassword(true);
  };
  const handleLogout = () => {
    setIsModalLogout(true);
  };

  const openDeleteModal = () => {
    setIsModalDeleteAccount(true);
  };

  const handlePremium = () => {}; // TODO !!!
  const handleDettagliAbbonamento = () => {}; // TODO !!!
  const handleStoricoAbbonamento = () => {}; // TODO !!!

  // --- notifiche
  const handleEnableVantaggi = async () => {
    try {
      // AWAIT - Set on db
      // THEN - Set on local
      setEnabledNotifications({
        ...enabledNotifications,
        vantaggi: !enabledNotifications.vantaggi,
      });
    } catch (error) {
      toast("danger", text[l].error_generic);
    }
  };
  const handleEnablePromozioni = async () => {
    try {
      // AWAIT - Set on db
      // THEN - Set on local
      setEnabledNotifications({
        ...enabledNotifications,
        promozioni: !enabledNotifications.promozioni,
      });
    } catch (error) {
      toast("danger", text[l].error_generic);
    }
  };
  const handleEnableInventario = async () => {
    try {
      // AWAIT - Set on db
      // THEN - Set on local
      setEnabledNotifications({
        ...enabledNotifications,
        inventario: !enabledNotifications.inventario,
      });
    } catch (error) {
      toast("danger", text[l].error_generic);
    }
  };
  const handleEnableRecensioni = async () => {
    try {
      // AWAIT - Set on db
      // THEN - Set on local
      setEnabledNotifications({
        ...enabledNotifications,
        recensioni: !enabledNotifications.recensioni,
      });
    } catch (error) {
      toast("danger", text[l].error_generic);
    }
  };
  const handleEnableReportMensile = async () => {
    try {
      // AWAIT - Set on db
      // THEN - Set on local
      setEnabledNotifications({
        ...enabledNotifications,
        report: !enabledNotifications.report,
      });
    } catch (error) {
      toast("danger", text[l].error_generic);
    }
  };

  // --- preferenze:  Lingua
  const openScegliLingua = () => {
    setIsAlertLinguaOpen(true);
  };
  const handleScegliLingua = (selected: typeAvailableLanguages) => {
    updateLanguage(selected);
  };

  // --- submits
  const submitNewEmail = async () => {
    if (newEmail !== undefined) {
      try {
        await verifyBeforeUpdateEmail(authenticateUser!, newEmail);
        // SUCCESSO EMAIL CAMBIATA -------
        toast(
          "success",
          text[l].success_changeEmail + " " + authenticateUser?.email
        );
        console.log("Email cambiata con successo:", authenticateUser?.email);
      } catch (error: any) {
        // ERROR - qualcosa è andato storto
        console.error("Errore durante il cambio email.", error);
        toast("danger", text[l].error_changeEmail);
      }
    } else {
      // ERROR - la nuova mail è vuota
      toast("warning", text[l].warn_emailEmpty, 1000);
    }
  };
  const submitLogout = () => {
    signOut(auth);
  };
  const submitNewPassword = async () => {
    // 1. Controllo le dimensioni della password
    if (newPassword.length < 6) {
      // FALSE
      toast("warning", text[l].warning__passLegth);
    } else {
      // TRUE
      try {
        await updatePassword(auth.currentUser!, newPassword).then(() => {
          submitLogout();
        });
        toast("success", text[l].success__passwordCambiata, 2000);
      } catch (error) {
        toast("danger", text[l].danger__passwordCambiata);
      }
    }
  };
  const submitDelete = async () => {
    if (user) {
      deleteUser(auth.currentUser!)
        .then(() => {
          toast("success", text[l].success_deleted);
          submitLogout();
        })
        .catch((error: any) => {
          console.error(error);
          toast("danger", text[l].error_delete);
        });
    }
  };

  // --- device
  const getDevice = async () => {
    const info = await Device.getInfo();
    setDevice(info);
  };
  // EXTRA UI ------------------------

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
          <IonCard>
            {/* -------- ACCOUNT ------- */}
            <IonList inset>
              <IonListHeader>{text[l].account_section}</IonListHeader>
              {/* ----- Email ------ */}
              <IonItem button onClick={handleEmail} detail={false}>
                <IonLabel>
                  <p>{text[l].email_title}</p>
                  <h2>{authenticateUser?.email}</h2>
                </IonLabel>
                <IonButtons slot="end">
                  <IonButton onClick={handleEmail}>
                    <IonIcon icon={createOutline} />
                  </IonButton>
                </IonButtons>
              </IonItem>
              {/* ----- Password ------ */}
              <IonItem button onClick={handlePassword} detail={false}>
                <IonLabel>
                  <p>{text[l].password_title}</p>
                  <h2>*************</h2>
                </IonLabel>
                <IonButtons slot="end">
                  <IonButton onClick={handlePassword}>
                    <IonIcon icon={createOutline} />
                  </IonButton>
                </IonButtons>
              </IonItem>
            </IonList>
            {/* -------- PREFERENZE ------- */}
            <IonList inset>
              <IonListHeader>{text[l].preferenze_sezione}</IonListHeader>
              {/* ----- Lingua ------ */}
              <IonItem button onClick={openScegliLingua}>
                <IonLabel>
                  <h3>{text[l].preferenze_lingua}</h3>
                </IonLabel>
                <IonNote slot="end">{lingua}</IonNote>
              </IonItem>
            </IonList>
            {/* -------- ABBONAMENTO ------ */}
            <IonList inset>
              <IonListHeader>{text[l].abbonamento_section}</IonListHeader>
              {/* ----- Premium ------ */}
              <IonItem button onClick={handlePremium}>
                <IonLabel>
                  <h3>{text[l].cta_abbonamento}</h3>
                  <p>{text[l].note_premium}</p>
                </IonLabel>
              </IonItem>
              {/* ----- Abbonamento ------ */}
              <IonItem button onClick={handleDettagliAbbonamento}>
                <IonLabel className="ion-text-wrap">
                  <h3>{text[l].abbonamento_title}</h3>
                  <p>{text[l].note_abbonamento}</p>
                </IonLabel>
                <IonChip color={"primary"}>FREE</IonChip>
              </IonItem>
              {/* ----- Storico Abbonamento ------ */}
              <IonItem button onClick={handleStoricoAbbonamento}>
                <IonLabel className="ion-text-wrap">
                  <h3>{text[l].abbonamento_storico}</h3>
                  <p>{text[l].note_storico}</p>
                </IonLabel>
              </IonItem>
            </IonList>
            {/* -------- NOTIFICHE ------ */}
            <IonList inset>
              <IonListHeader>{text[l].interazione_section}</IonListHeader>
              {/* ------ Notifiche vantaggi ------ */}
              <IonItem disabled={device?.platform == "web"}>
                <IonToggle
                  onIonChange={handleEnableVantaggi}
                  checked={enabledNotifications?.vantaggi}
                  enableOnOffLabels={true}
                >
                  <IonLabel>
                    <h3>{text[l].notifiche_vantaggi}</h3>
                    <p className="ion-text-wrap">
                      {text[l].notifiche_vantaggi_note}
                    </p>
                  </IonLabel>
                </IonToggle>
              </IonItem>
              {/* ------ Notifiche promozioni ------ */}
              <IonItem disabled={device?.platform == "web"}>
                <IonToggle
                  onIonChange={handleEnablePromozioni}
                  checked={enabledNotifications?.promozioni}
                  enableOnOffLabels={true}
                >
                  <IonLabel>
                    <h3>{text[l].notifiche_promozioni}</h3>
                    <p className="ion-text-wrap">
                      {text[l].notifiche_promozioni_note}
                    </p>
                  </IonLabel>
                </IonToggle>
              </IonItem>
              {/* ------ Notifiche inventario ------ */}
              <IonItem disabled={device?.platform == "web"}>
                <IonToggle
                  onIonChange={handleEnableInventario}
                  checked={enabledNotifications?.inventario}
                  enableOnOffLabels={true}
                >
                  <IonLabel>
                    <h3>{text[l].notifiche_inventario}</h3>
                    <p className="ion-text-wrap">
                      {text[l].notifiche_inventario_note}
                    </p>
                  </IonLabel>
                </IonToggle>
              </IonItem>
              {/* ------ Notifiche recensioni ------ */}
              <IonItem disabled={device?.platform == "web"}>
                <IonToggle
                  onIonChange={handleEnableRecensioni}
                  checked={enabledNotifications?.recensioni}
                  enableOnOffLabels={true}
                >
                  <IonLabel>
                    <h3>{text[l].notifiche_recensioni}</h3>
                    <p className="ion-text-wrap">
                      {text[l].notifiche_recensioni_note}
                    </p>
                  </IonLabel>
                </IonToggle>
              </IonItem>
              {/* ------ Notifiche report mensile ------ */}
              <IonItem disabled={device?.platform == "web"}>
                <IonToggle
                  onIonChange={handleEnableReportMensile}
                  checked={enabledNotifications?.report}
                  enableOnOffLabels={true}
                >
                  <IonLabel>
                    <h3>{text[l].notifiche_report}</h3>
                    <p className="ion-text-wrap">
                      {text[l].notifiche_report_note}
                    </p>
                  </IonLabel>
                </IonToggle>
              </IonItem>
            </IonList>
            {/* -------- SUPPORTO ------ */}
            <IonList inset>
              {/* --- Release ---- */}
              <IonItem
                button
                onClick={() => {
                  window.open(LINK_LAST_RELEASE, "_blank");
                }}
              >
                <IonLabel>{textFooter[l].last__realease}</IonLabel>
              </IonItem>
              {/* --- Termini ---- */}
              <IonItem
                button
                onClick={() => {
                  window.open(LINK_TERMNS_POLICY, "_blank");
                }}
              >
                <IonLabel>{textFooter[l].btn__user_policy}</IonLabel>
              </IonItem>
              {/* --- Contatto ---- */}
              <IonItem
                button
                onClick={() => {
                  window.open(LINK_SUPPORT, "_blank");
                }}
              >
                <IonLabel>
                  <IonText color={"primary"}>
                    {textFooter[l].btn_support}
                  </IonText>
                </IonLabel>
              </IonItem>
            </IonList>

            {/* -------- LOGOUT ------ */}
            <IonList inset>
              <IonItem button onClick={handleLogout} detail={false}>
                <IonLabel>
                  <IonText color={"danger"}>{text[l].btn__logout}</IonText>
                </IonLabel>
                <IonButton fill="clear" color={"danger"} slot="end">
                  <IonIcon icon={logOutOutline} />
                </IonButton>
              </IonItem>
            </IonList>

            {/* -------- DELETE ACCOUNT ------ */}
            <IonList inset>
              <IonItem button onClick={openDeleteModal} detail={false}>
                <IonLabel>
                  <IonText color={"danger"}>{text[l].btn__delete}</IonText>
                </IonLabel>
                <IonButton fill="clear" color={"danger"} slot="end">
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </IonItem>
            </IonList>
          </IonCard>
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
        {/* ---- Request change Email ----  */}
        <IonModal
          isOpen={isModalNewEmail}
          onDidDismiss={() => setIsModalNewEmail(false)}
          initialBreakpoint={0.5}
          breakpoints={[0.5, 0.7]}
        >
          <IonContent>
            <IonLabel>
              <h2 className={"forgotTitle"}>{text[l].changeEmail}</h2>
            </IonLabel>
            <IonList inset>
              <IonItem>
                <IonInput
                  id="input_forgot_password"
                  name="input_forgot_password"
                  required
                  clearInput
                  label={text[l].input__email.label}
                  labelPlacement="stacked"
                  type="email"
                  placeholder={text[l].input__email.ph}
                  value={newEmail}
                  onIonInput={(e) => setNewEmail(e.detail.value!)}
                />
              </IonItem>
            </IonList>

            <IonLabel>
              <p className="ion-padding-horizontal">{text[l].changeTutorial}</p>
            </IonLabel>
            <div className="ion-padding">
              <IonButton
                fill="solid"
                type="submit"
                color={"primary"}
                expand="block"
                onClick={submitNewEmail}
                disabled={newEmail == "" ? true : false}
              >
                {text[l].btn__change}
                <IonIcon icon={mailOutline} className="icon-margin-left" />
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
        {/* ---- Change password ----  */}
        <IonModal
          isOpen={isModalPassword}
          onDidDismiss={() => setIsModalPassword(false)}
          initialBreakpoint={0.75}
          breakpoints={[0.5, 0.75]}
        >
          <IonContent>
            <IonLabel>
              <h2 className={"forgotTitle"}>{text[l].changePasswordTitle}</h2>
            </IonLabel>
            <IonList inset>
              <IonItem>
                <IonInput
                  name="input_forgot_password"
                  clearInput
                  label={text[l].input__password.label}
                  labelPlacement="stacked"
                  type={isPasswordVisible ? "email" : "password"}
                  placeholder={text[l].input__password.ph}
                  value={newPassword}
                  onIonInput={(e) => setNewPassword(e.detail.value!)}
                />
                <IonButton
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  slot="end"
                  fill="clear"
                >
                  <IonIcon icon={isPasswordVisible ? eyeOff : eye} />
                </IonButton>
              </IonItem>
              <IonItem>
                <IonInput
                  name="input_forgot_password"
                  clearInput
                  label={text[l].input__password__confirm.label}
                  labelPlacement="stacked"
                  type={isPasswordVisible ? "email" : "password"}
                  placeholder={text[l].input__password__confirm.ph}
                  value={newPasswordConfirm}
                  onIonInput={(e) => setNewPasswordConfirm(e.detail.value!)}
                />
                <IonButton
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  slot="end"
                  fill="clear"
                >
                  <IonIcon icon={isPasswordVisible ? eyeOff : eye} />
                </IonButton>
              </IonItem>
            </IonList>
            <p className="ion-padding-horizontal">
              <IonIcon
                icon={informationCircleOutline}
                color="warning"
                className="icon-margin-right"
              />
              <span className={"info-text"}>{text[l].info__password}</span>
            </p>

            <IonLabel>
              <p className="ion-padding-horizontal">
                {text[l].changePasswordTutorial}
              </p>
            </IonLabel>
            <div className="ion-padding">
              <IonButton
                fill="solid"
                type="submit"
                color={"primary"}
                expand="block"
                onClick={submitNewPassword}
                disabled={
                  newPassword !== newPasswordConfirm || newPassword == ""
                    ? true
                    : false
                }
              >
                {text[l].btn__change__password}
                <IonIcon
                  icon={lockClosedOutline}
                  className="icon-margin-left"
                />
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
        {/*----  Logout ----  */}
        <IonModal
          isOpen={isModalLogout}
          onDidDismiss={() => setIsModalLogout(false)}
          initialBreakpoint={0.25}
          breakpoints={[0.25, 0.5]}
        >
          <IonContent>
            <IonLabel>
              <h2 className={"forgotTitle"}>{text[l].modalTitleLogout}</h2>
            </IonLabel>
            <IonLabel>
              <p className="ion-padding-horizontal">
                {text[l].paragraphLogout}
              </p>
            </IonLabel>
            <div className="ion-padding">
              <IonButton
                fill="solid"
                color={"danger"}
                expand="block"
                onClick={submitLogout}
              >
                {text[l].btn__logout}
                <IonIcon icon={logOutOutline} className="icon-margin-left" />
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
        {/*----  Delete ----  */}
        <IonModal
          isOpen={isModalDeleteAccount}
          onDidDismiss={() => setIsModalDeleteAccount(false)}
          initialBreakpoint={0.35}
          breakpoints={[0.35, 0.5]}
        >
          <IonContent>
            <IonLabel>
              <h2 className={"forgotTitle"}>{text[l].modalDeleteTitle}</h2>
            </IonLabel>
            <IonLabel>
              <p className="ion-padding-horizontal">
                {text[l].modalDeleteParagraph}
              </p>
            </IonLabel>
            <div className="ion-padding">
              <IonButton
                fill="solid"
                color={"danger"}
                expand="block"
                onClick={submitDelete}
              >
                {text[l].btn__delete}
                <IonIcon icon={trashOutline} className="icon-margin-left" />
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
        {/*----- Lingua ----- */}
        <IonAlert
          isOpen={isAlertLinguaOpen}
          onDidDismiss={() => setIsAlertLinguaOpen(false)}
          header={text[l].preferenze_lingua_title}
          buttons={[
            {
              text: "Ok",
              handler: () => {
                handleScegliLingua(lingua);
              },
            },
          ]}
          inputs={[
            {
              name: "lIta",
              label: "Italiano",
              type: "radio",
              value: "ita",
              checked: lingua === "it_IT" ? true : false,
              handler: () => {
                setLingua("it_IT");
              },
            },
            {
              name: "lEng",
              label: "English",
              type: "radio",
              value: "eng",
              checked: lingua === "en_GB" ? true : false,
              handler: () => {
                setLingua("en_GB");
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ImpostazioniPage;
