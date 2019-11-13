import React, { Component } from "react";
import "./Error.css";

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language:
        window.location.pathname.split("/")[2] === "en" ? "english" : "french"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.history.push("/home/fr");
  }

  render() {
    return (
      <div id="error_div">
        <h1>
          {this.state.language === "english" ? "ERROR 404" : "ERREUR 404"}
        </h1>
        <h4>
          {this.state.language === "english"
            ? "Sorry, the page you are looking for was not found"
            : "Désolé, la page que vous recherchez n'a pas été trouvé"}
        </h4>
        <button id="error-button" onClick={this.handleClick}>
          {this.state.language === "english" ? "Home" : "Accueil"}
        </button>
      </div>
    );
  }
}

export default Error;
