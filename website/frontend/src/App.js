import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import AllProfil from "./Components/AllProfil/AllProfil";
import Profil from "./Components/Profil/Profil";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import PageAccueil from "./Components/PageAccueil/PageAccueil";
import Error from "./Components/Error/Error";
import Login from "./Components/Login/Login";
// import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import GeneralStatistics from "./Components/GeneralStatistics/GeneralStatistics";

class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/login/:language" component={Login} />
            <Route exact path="/home/:language" component={PageAccueil} />
            <Route
              path="/profil/:language/:etablissement/:academie/:ville"
              component={Profil}
            />
            <Route exact path="/profilList/:language" component={AllProfil} />
            <Route
              exact
              path="/generalStatistics/:language"
              component={GeneralStatistics}
            />
            <Route path="/*" component={Error} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </CookiesProvider>
    );
  }
}

export default App;
