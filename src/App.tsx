import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/global.css";
import "./theme/authpages.css";
import { loginRoutes } from "./routes/routes";
import {
  route_AttivitaDashboardPage,
  route_HomePage,
  route_ImpostazioniPage,
  route_IngredientiAggiungiModificaPage,
  route_IngredientiDashboardPage,
  route_LoginPage,
  route_RegistrazionePage,
} from "./routes/singleRoute";
import LoginPage from "./pages/Auth/Login_Page/LoginPage";
import RegistrazionePage from "./pages/Auth/Registrazione_Page/RegistrazionePage";
import { AuthContextProvider } from "./context/contextAuth";
import HomePage from "./pages/Home/HomePage";
import IngredientiDashboardPage from "./pages/Ingredients/Dashboard/IngredientiDashboardPage";
import ImpostazioniPage from "./pages/Impostazioni/ImpostazioniPage";
import IngredientiAggiungiModificaPage from "./pages/Ingredients/Add__And__Modify/IngredientiAggiungiModificaPage";
import AttivitaDashboardPage from "./pages/Attivita/Dashboard/AttivitaDashboardPage";
import { ProviderContextLanguage } from "./context/contextLanguage";
import { ProviderContextToast } from "./context/contextToast";

setupIonicReact({
  rippleEffect: false,
  mode: "ios",
});

const App: React.FC = () => {
  //VARIABLES ------------------------
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonApp>
      <IonReactRouter>
        <ProviderContextLanguage>
          <ProviderContextToast>
            <AuthContextProvider />
          </ProviderContextToast>
        </ProviderContextLanguage>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

export const authenticatedRoutesOutlet = () => {
  //VARIABLES ------------------------
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonSplitPane contentId="main">
      <Menu />
      <IonRouterOutlet id="main">
        {/* --------- REDIRECT --------- */}
        <Route exact path="/">
          <Redirect to={route_HomePage.path} />
        </Route>

        {/* ---- Attività Dashobaord ---- */}
        <Route exact path={route_AttivitaDashboardPage.path}>
          <AttivitaDashboardPage />
        </Route>
        {/* ---- Ingredienti - Aggiungi & Modifica ---- */}
        <Route exact path={route_IngredientiAggiungiModificaPage.path + "/:id"}>
          <IngredientiAggiungiModificaPage />
        </Route>
        {/* ---- Home ---- */}
        <Route exact path={route_HomePage.path}>
          <HomePage />
        </Route>
        {/* ---- Impostazioni ---- */}
        <Route exact path={route_ImpostazioniPage.path}>
          <ImpostazioniPage />
        </Route>
        {/* ---- Ingredienti ---- */}
        <Route exact path={route_IngredientiDashboardPage.path}>
          <IngredientiDashboardPage />
        </Route>
        {/* ---- Pagina ---- */}
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export const loginRoutesOutlet = () => {
  //VARIABLES ------------------------
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonRouterOutlet>
      {/* --------- REDIRECT --------- */}
      <Route exact path="/">
        <Redirect to={loginRoutes.route_LoginPage.path} />
      </Route>

      {/* --------- ROUTES ----------- */}
      {/* ---- Login ---- */}
      <Route exact path={route_LoginPage.path}>
        <LoginPage />
      </Route>
      {/* ---- Registrazione ---- */}
      <Route exact path={route_RegistrazionePage.path}>
        <RegistrazionePage />
      </Route>
    </IonRouterOutlet>
  );
};
