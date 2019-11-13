import React, { Component } from "react";
import axios from "axios";
import "./generalstatistics.css";

class GeneralStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averageSudentNumber: [],
      averageAttenduGradeAcad: [],
      averageAttenduGradeFrance: [],
      averageAttenduMention: [],
      averageBrutGrade: [],
      averageMentionBrut: [],
      language:
        window.location.pathname.split("/")[2] === "en" ? "english" : "french"
    };
  }

  // 5 lycées avec la meilleure moyenne
  // 5 academies avec les meilleures résultats
  // 5 lycées accueillant le plus d'étudiants

  componentDidMount() {
    axios
      .get("http://localhost:8080/statistiques")
      .then(res => {
        res = res.data.resultat;
        console.log("RES : ", res);

        let averageSudentNumber = res.totalNumberStudent.map((result, i) => {
          return (
            <tr key={i}>
              <th scope="row">{result._id}</th>
              <td>{Math.round(result.totalNumberStudent)}</td>
            </tr>
          );
        });
        let averageAttenduGradeAcad = res.averageAttenduGradeAcad.map(
          (result, i) => {
            return (
              <tr key={i}>
                <th scope="row">{result._id}</th>
                <td>{Math.round(result.averageAttenduGradeAcad)}</td>
              </tr>
            );
          }
        );
        let averageAttenduGradeFrance = res.averageAttenduGradeFrance.map(
          (result, i) => {
            return (
              <tr key={i}>
                <th scope="row">{result._id}</th>
                <td>{Math.round(result.averageAttenduGradeFrance)}</td>
              </tr>
            );
          }
        );
        let averageAttenduMention = res.averageAttenduMention.map(
          (result, i) => {
            return (
              <tr key={i}>
                <th scope="row">{result._id}</th>
                <td>{Math.round(result.averageAttenduMention)}</td>
              </tr>
            );
          }
        );
        let averageBrutGrade = res.averageBrutGrade.map((result, i) => {
          return (
            <tr key={i}>
              <th scope="row">{result._id}</th>
              <td>{Math.round(result.averageBrutGrade)}</td>
            </tr>
          );
        });
        let averageMentionBrut = res.averageMentionBrut.map((result, i) => {
          return (
            <tr key={i}>
              <th scope="row">{result._id}</th>
              <td>{Math.round(result.averageMentionBrut)}</td>
            </tr>
          );
        });

        this.setState({
          averageSudentNumber,
          averageAttenduGradeAcad,
          averageAttenduGradeFrance,
          averageAttenduMention,
          averageBrutGrade,
          averageMentionBrut
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
      <div className="generalstatisticsdiv">
        <h3 className="title-page">
          {this.state.language === "english"
            ? "General Statistics"
            : "Statistiques générales"}
        </h3>
        <div className="row">
          <div className="col number-students">
            <h5>
              {this.state.language === "english"
                ? this.state.averageSudentNumber.length +
                  " schools with higher student number"
                : this.state.averageSudentNumber.length +
                  " écoles avec le plus d'étudiants"}
            </h5>
            <table className="table table-striped table-responsive">
              <thead>
                <tr>
                  <th scope="col">
                    {this.state.language === "english" ? "School" : "Ecole"}
                  </th>
                  <th scope="col">
                    {this.state.language === "english"
                      ? "Average student number"
                      : "Nombre moyen étudiants"}
                  </th>
                </tr>
              </thead>
              <tbody>{this.state.averageSudentNumber}</tbody>
            </table>
          </div>

          <div className="col grad-acad">
            <h5>
              {this.state.language === "english"
                ? this.state.averageAttenduGradeAcad.length +
                  " schools with higher expected grade"
                : this.state.averageAttenduGradeAcad.length +
                  " écoles avec la plus haute note atendue"}
            </h5>
            <table className="table table-striped table-responsive">
              <thead>
                <tr>
                  <th scope="col">
                    {this.state.language === "english" ? "School" : "Ecole"}
                  </th>
                  <th scope="col">
                    {this.state.language === "english"
                      ? "Average expected grade academy"
                      : "Note moyenne espérée académie"}
                  </th>
                </tr>
              </thead>
              <tbody>{this.state.averageAttenduGradeAcad}</tbody>
            </table>
          </div>

          <div className="col grad-france">
            <h5>
              {this.state.language === "english"
                ? this.state.averageAttenduGradeFrance.length +
                  " schools with higher expected grade"
                : this.state.averageAttenduGradeFrance.length +
                  " écoles avec la plus haute note atendue"}
            </h5>
            <table className="table table-striped table-responsive">
              <thead>
                <tr>
                  <th scope="col">
                    {this.state.language === "english" ? "School" : "Ecole"}
                  </th>
                  <th scope="col">
                    {this.state.language === "english"
                      ? "Average expected grade France"
                      : "Note moyenne espérée France"}
                  </th>
                </tr>
              </thead>
              <tbody>{this.state.averageAttenduGradeFrance}</tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col mention">
            <h5>
              {this.state.language === "english"
                ? this.state.averageAttenduMention.length +
                  " schools with higher expected honours France"
                : this.state.averageAttenduMention.length +
                  " écoles avec le plus de mention attendu France"}
            </h5>
            <table className="table table-striped table-responsive">
              <thead>
                <tr>
                  <th scope="col">
                    {this.state.language === "english" ? "School" : "Ecole"}
                  </th>
                  <th scope="col">
                    {this.state.language === "english"
                      ? "Average expected grade academy"
                      : "Note moyenne espérée académie"}
                  </th>
                </tr>
              </thead>
              <tbody>{this.state.averageAttenduMention}</tbody>
            </table>
          </div>

          <div className="col grad-brut">
            <h5>
              {this.state.language === "english"
                ? this.state.averageBrutGrade.length +
                  " schools with higher raw grade"
                : this.state.averageBrutGrade.length +
                  " écoles avec la plus haute note brute"}
            </h5>
            <table className="table table-striped table-responsive">
              <thead>
                <tr>
                  <th scope="col">
                    {this.state.language === "english" ? "School" : "Ecole"}
                  </th>
                  <th scope="col">
                    {this.state.language === "english"
                      ? "Average raw grade"
                      : "Note brute moyenne"}
                  </th>
                </tr>
              </thead>
              <tbody>{this.state.averageBrutGrade}</tbody>
            </table>
          </div>

          <div className="col mention-brut">
            <h5>
              {this.state.language === "english"
                ? this.state.averageMentionBrut.length +
                  " schools with higher raw honours"
                : this.state.averageMentionBrut.length +
                  " écoles avec la plus haute mention brute"}
            </h5>
            <table className="table table-striped table-responsive">
              <thead>
                <tr>
                  <th scope="col">
                    {this.state.language === "english" ? "School" : "Ecole"}
                  </th>
                  <th scope="col">
                    {this.state.language === "english"
                      ? "Average raw honours"
                      : "Mention moyenne brute"}
                  </th>
                </tr>
              </thead>
              <tbody>{this.state.averageMentionBrut}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default GeneralStatistics;
