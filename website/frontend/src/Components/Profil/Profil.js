import React, { Component } from "react";
import axios from "axios";
import fieldsTranslation from "./fieldsTranslation";

class Profil extends Component {
  constructor(props) {
    super(props);
    this.translator = new fieldsTranslation();
    this.state = {
      fields: {},
      listInfo: [],
      etablissement: "",
      ville: "",
      listYear: [],
      language:
        window.location.pathname.split("/")[2] === "en" ? "english" : "french"
    };
  }

  componentDidMount() {
    let etablissement = this.props.match.params.etablissement;
    let academie = this.props.match.params.academie;
    let ville = this.props.match.params.ville;
    axios
      .get(
        "http://localhost:8080/profil/" +
          encodeURI(etablissement) +
          "/" +
          encodeURI(academie) +
          "/" +
          encodeURI(ville)
      )
      .then(res => {
        // handle success
        res = res.data;

        let fieldsList = [];
        res.forEach(obj => {
          Object.keys(obj.fields).forEach(field => {
            if (!fieldsList.includes(field)) {
              fieldsList.push(field);
            }
          });
        });

        let generalFields = [
          "departement",
          "annee",
          "ville",
          "code_etablissement",
          "commune",
          "libelle_region_2016",
          "etablissement",
          "academie",
          "code_region_2016",
          "code_departement",
          "libelle_departement",
          "secteur_public_pu_prive_pr",
          "sructure_pedagogique_en_5_groupes",
          "sructure_pedagogique_en_7_groupes"
        ];

        fieldsList = fieldsList.filter(field => !generalFields.includes(field));

        let listInfo = fieldsList.map((field, i) => {
          let listValue = [];
          let sum_value = 0;
          let nb_value = res.length;
          let max = Number(res[0].fields[field]);
          let min = Number(res[0].fields[field]);
          res.forEach((yearData, i) => {
            if (yearData.fields[field] === undefined) {
              listValue.push(<td key={i}> - </td>);
              nb_value -= 1;
            } else {
              listValue.push(<td key={i}>{yearData.fields[field]}</td>);
              let value = Number(yearData.fields[field]);
              if (!isNaN(value)) {
                sum_value += value;
                if (value > max) {
                  max = value;
                }
                if (value < min) {
                  min = value;
                }
              }
            }
          });
          let avg_value = sum_value / nb_value;

          listValue = [
            <th scope="row">{Math.floor(100 * avg_value) / 100}</th>,
            <th scope="row">{Math.floor(100 * max) / 100}</th>,
            <th scope="row">{Math.floor(100 * min) / 100}</th>
          ].concat(listValue);

          return (
            <tr>
              <th scope="row">
                {this.translator.translate(field, this.state.language)}
              </th>
              {listValue}
            </tr>
          );
        });

        let listYear = [];
        listYear.push(
          <th scope="col">
            {this.state.language === "english" ? "Average" : "Moyenne"}
          </th>
        );
        listYear.push(<th scope="col">Max</th>);
        listYear.push(<th scope="col">Min</th>);
        res.forEach(yearData => {
          listYear.push(<th scope="col">{yearData.fields.annee}</th>);
        });

        this.setState({
          fields: fieldsList,
          listInfo,
          etablissement,
          academie,
          ville,
          listYear
        });
      })

      .catch(function(error) {
        // handle error
        console.log("ERROR : ", error);
      })
      .finally(function() {
        // always executed
      });
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.etablissement.replace(/_/gi, " ") +
            " (" +
            this.state.academie +
            ", " +
            this.state.ville +
            ")"}
        </h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">
                {this.state.language === "english" ? "Year" : "Année"}
              </th>
              {this.state.listYear}
            </tr>
          </thead>
          <tbody>{this.state.listInfo}</tbody>
        </table>
      </div>
    );
  }
}

export default Profil;
