import React, { Component } from "react";
import axios from "axios";
import ProfilLine from "../ProfilLine/ProfilLine";
import "./AllProfil.css";
class AllProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProfil: [],
      listProfilFiltered: [],
      establishementFiltered: "",
      language:
        window.location.pathname.split("/")[2] === "en" ? "english" : "french"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    if (event.target.id === "establishementFiltering") {
      this.setState({ establishementFiltered: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let listProfilFiltered = [];
    let establishementFiltered = this.state.establishementFiltered;
    this.state.listProfil.forEach(profil => {
      if (
        establishementFiltered === "" ||
        profil.fields.etablissement.search(
          new RegExp(establishementFiltered, "gi")
        ) !== -1
      ) {
        listProfilFiltered.push(profil);
      }
    });
    this.setState({ listProfilFiltered });
    console.log("Modifications done !");
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/allProfil")
      .then(res => {
        let listProfil = res.data.map(profil => (
          <ProfilLine
            key={res.data.indexOf(profil)}
            id={res.data.indexOf(profil)}
            etablissement={profil._id}
            num_doc={profil.num_doc}
          />
        ));
        this.setState({ listProfil, listProfilFiltered: listProfil });
      })
      .catch(function(error) {
        // handle error
        console.log("ERROR : ", error);
      })
      .finally(function() {
        // always executed
      });
  }

  componentDidUpdate(prevProps, prevState) {
    let establishementFiltered = this.state.establishementFiltered;
    if (establishementFiltered !== prevState.establishementFiltered) {
      let listProfilFiltered = this.state.listProfil.filter(
        profil =>
          establishementFiltered === "" ||
          profil.props.etablissement.search(
            new RegExp(establishementFiltered, "giu")
          ) !== -1
      );
      if (listProfilFiltered.length < 0) {
        listProfilFiltered = [
          <div class="alert alert-danger" role="alert">
            {this.state.language === "english"
              ? "No result found"
              : "Aucun résultat trouvé"}
          </div>
        ];
      }
      this.setState({ listProfilFiltered });
      console.log("Modifications done !");
    }
  }

  render() {
    return (
      <div>
        <h3>Filtering results :</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="establishementFiltering"
              value={this.state.establishementFiltered}
              placeholder={
                this.state.language === "english"
                  ? "Filter an establishment"
                  : "Filtrer un établissement"
              }
              onChange={this.handleChange}
            />
          </div>
        </form>

        <h3>
          Profils list ({this.state.listProfilFiltered.length} résultats) :
        </h3>
        <div className="table-responsive" id="profilTable">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">
                  {this.state.language === "english"
                    ? "Establishment"
                    : "Etablissement"}
                </th>
                <th scope="col">
                  {this.state.language === "english"
                    ? "Number of documents"
                    : "Nombre de documents"}
                </th>
              </tr>
            </thead>
            <tbody>{this.state.listProfilFiltered}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AllProfil;
