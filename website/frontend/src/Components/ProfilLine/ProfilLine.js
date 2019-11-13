import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfilLine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.id}</th>
        <td>
          <Link
            to={`/profil/fr/${encodeURI(
              this.props.etablissement.split(" - ")[0].replace(/\s/gi, "_")
            )}/${this.props.etablissement.split(" - ")[1]}/${
              this.props.etablissement.split(" - ")[2]
            }`}
          >
            {this.props.etablissement}
          </Link>
        </td>
        <td>{this.props.num_doc}</td>
      </tr>
    );
  }
}

export default ProfilLine;
