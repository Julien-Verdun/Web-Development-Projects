import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Route, Redirect } from "react-router-dom";
// import { useCookies } from "react-cookie";

class ProtectedRoute extends Component {
  // static propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // };

  constructor(props) {
    super(props);
    // const { cookies } = props;
    // const [cookies, setCookie] = useCookies("isAuthorise");
    // console.log("ProtectedRoute Cookies : ", cookies);
    this.state = {
      // isAuthorise: cookies.get("isAuthorise") || false
    };
  }

  render() {
    const { cookies } = this.props;
    console.log("IS AUTHORISE ? : ", cookies.get("isAuthorise"));
    return (
      <Route
        render={props =>
          // console.log("Redirection ? : ", cookies.get("isAuthorise"));
          // this.state.isAuthorise === true ? (
          cookies.get("isAuthorise") === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/home/en" />
          )
        }
      />
    );
  }
}

export default withCookies(ProtectedRoute);
