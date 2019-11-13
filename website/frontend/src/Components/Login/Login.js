import React, { Component } from "react";
import "./Login.css";
// import isAuthorise from "./Auth";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    if (cookies.get("isAuthorise") === undefined) {
      cookies.set("isAuthorise", false, { path: "/" });
    }
    console.log("Login Cookies : ", cookies.get("isAuthorise"));
    this.state = {
      email: "",
      password: "",
      isAuthorise: cookies.get("isAuthorise") || false,
      language:
        window.location.pathname.split("/")[2] === "en" ? "english" : "french"
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const { cookies } = this.props;
    console.log("handleClick", cookies.get("isAuthorise"));
    if (event.target.type === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.type === "password") {
      this.setState({ password: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // const { cookies } = this.props;
    console.log("AUTHORISATION");
    // cookies.set("isAuthorise", true, { path: "/" });
    // if (isAuthorise(this.state.email, this.state.password)) {
    //   cookies.set("isAuthorise", true, { path: "/" });
    //   // this.setState({ isAuthorise: true });
    this.props.history.push("/home/en");
    //   console.log("ACCESS GRANTED");
    // } else {
    //   console.log("ACCESS DENIED");
    // }
  }
  render() {
    return (
      <div id="login-div">
        <h4>{this.state.language === "english" ? "Login" : "Se connecter"}</h4>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              {this.state.language === "english"
                ? "Email address"
                : "Addresse mail"}
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder={
                this.state.language === "english"
                  ? "Enter email"
                  : "Renseigner votre mail"
              }
              onChange={this.handleClick}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">
              {this.state.language === "english" ? "Password" : "Mot de passe"}
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder={
                this.state.language === "english" ? "Password" : "Mot de passe"
              }
              onChange={this.handleClick}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onSubmit={this.handleSubmit}
          >
            {this.state.language === "english" ? "Submit" : "Soumettre"}
          </button>
        </form>
      </div>
    );
  }
}

export default withCookies(Login);
