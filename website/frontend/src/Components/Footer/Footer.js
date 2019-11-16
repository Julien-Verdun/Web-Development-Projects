import React, { Component } from "react";
// import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer-row">
        <div className="row">
          <div className="col footer-col">24/10/2019</div>
          <div className="col footer-col">Web site</div>
          <div className="col footer-col">Julien Verdun</div>
        </div>
      </div>
    );
  }
}

export default Footer;
