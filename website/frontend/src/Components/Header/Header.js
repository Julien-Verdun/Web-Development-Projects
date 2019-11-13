import React, { Component } from "react";
import "./Header.css";
import logoFrance from "./icon_france.png";
import logoEngland from "./icon_england.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language:
        window.location.pathname.split("/")[2] === "en" ? "english" : "french"
    };
    this.reload = this.reload.bind(this);
  }

  reload(language, event) {
    event.preventDefault();
    this.setState({ language });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.language !== prevState.language) {
      let splitedURL = window.location.pathname.split("/");
      window.location.pathname =
        this.state.language === "french"
          ? splitedURL.slice(0, 2).join("/") +
            "/fr" +
            (splitedURL.length > 3
              ? "/" + splitedURL.slice(3, splitedURL.length)
              : "")
          : splitedURL.slice(0, 2).join("/") +
            "/en" +
            (splitedURL.length > 3
              ? "/" + splitedURL.slice(3, splitedURL.length)
              : "");
    }
  }

  render() {
    return (
      <div className="container page-header">
        <div className="row">
          <div className="col">
            <a className="header-col" href="/home/fr">
              {this.state.language === "english" ? "Home" : "Accueil"}
            </a>
          </div>
          <div className="col">
            <a className="header-col" href="/profilList/fr">
              {this.state.language === "english"
                ? "Establishments"
                : "Etablissements"}
            </a>
          </div>
          <div className="col">
            <a className="header-col" href="/generalStatistics/fr">
              {this.state.language === "english"
                ? "Statistics"
                : "Statistiques"}
            </a>
          </div>
          <div className="col">
            <a className="header-col" href="/login/fr">
              {this.state.language === "english" ? "Log in" : "Connection"}
            </a>
          </div>

          <div className="col">
            <a
              className="header-col"
              onClick={this.reload.bind(this, "french")}
            >
              <img
                className="flag-language"
                src={logoFrance}
                alt="icon france"
              />
            </a>
            <a
              className="header-col"
              onClick={this.reload.bind(this, "english")}
            >
              <img
                className="flag-language"
                src={logoEngland}
                alt="icon england"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
