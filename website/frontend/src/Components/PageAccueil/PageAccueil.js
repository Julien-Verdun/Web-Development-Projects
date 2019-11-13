import React, { Component } from "react";
import "./PageAccueil.css";
import GeneralStatistics from "../GeneralStatistics/GeneralStatistics";

class PageAccueil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language:
        window.location.pathname.split("/")[2] === "en" ? "english" : "french"
    };
  }

  render() {
    return this.state.language === "english" ? (
      <div id="accueil-div" className="project-description">
        <h2 id="accueil-title">Web development project</h2>
        This project is a web development project using open source data. Its
        goal is only to gain experience and to train with web technlogies.
        <h5>Required technologies : </h5>
        <ul>
          <li>MongoDB</li>
          <li>React</li>
          <li>Node.JS</li>
        </ul>
        <br />
        <h5>Data</h5>
        The used data-base is delivered by French gouvernment on the website :{" "}
        <a href="https://www.data.gouv.fr/fr/datasets/indicateurs-de-resultat-des-lycees-denseignement-general-et-technologique-1/">
          data.gouv.fr
        </a>
        . The data-base is called :
        <p className="bold-text">
          Indicateurs de résultat des lycées d'enseignement général et
          technologique
        </p>
        (indicators of French technologic and general high school results). It
        deals with some indicators (numbers and rates) regarding the success of
        each school beetwen years 2012 to 2018. The data are stored in a{" "}
        <p className="bold-text">MongoDB</p> database. To access the required
        data for this web application, you must follow the indications below :
        <ul>
          <li>
            Download data on the{" "}
            <a href="https://www.data.gouv.fr/fr/datasets/indicateurs-de-resultat-des-lycees-denseignement-general-et-technologique-1/">
              data.gouv.fr
            </a>{" "}
            website. Choose JSON format.{" "}
          </li>
          <li>
            Open the file <p className="bold-text">db_builder.js</p> included in
            the folder <p className="bold-text">Backend</p>{" "}
          </li>
          <li>
            On this file, change the path of the database, for example{" "}
            <p className="italic-text">
              ../database/indicateur_lycee_genereale_et_technologique.json
            </p>{" "}
          </li>
          <li>
            Run <p className="bold-text">db_builder.js</p> with Node.js command{" "}
            <p className="italic-text"> node db_builder.js</p>
          </li>
        </ul>
        The database is created, you can now use it by running{" "}
        <p className="italic-text">mongod.exe</p> on a command line.
        <h5>Backend</h5>
        The backend of the web application is coded with{" "}
        <p className="bold-text">Node.JS</p>. The code is included in{" "}
        <p className="italic-text">server.js</p> file. Two main queries are
        implemented on the backend :
        <ul>
          <li>
            the <p className="italic-text">allProfils</p> query that aggregates
            the document of the database among the establishement name and the
            academy name, in order to get a unique value per establishement
          </li>
          <li>
            the <p className="italic-text">profil</p> query that returns, for a
            given establishement name and academy, all documents related to the
            establishement.
          </li>
        </ul>
        <h5>Frontend</h5>
        The frontend is coded with the framework{" "}
        <p className="bold-text">React</p>.
        <GeneralStatistics />
      </div>
    ) : (
      <div id="accueil-div" className="project-description">
        <h2 id="accueil-title">Projet de développement web</h2>
        Ce projet est un projet de développement web qui exploite une base de
        données libre de droit. Son objectif n'est autre que l'apprentissage et
        la montée en compétence sur des technologies du web.
        <h5>Technologies requises : </h5>
        <ul>
          <li>MongoDB</li>
          <li>React</li>
          <li>Node.JS</li>
        </ul>
        <br />
        <h5>Données</h5>
        The used data-base is delivered by French gouvernment on the website :{" "}
        <a href="https://www.data.gouv.fr/fr/datasets/indicateurs-de-resultat-des-lycees-denseignement-general-et-technologique-1/">
          data.gouv.fr
        </a>
        . La base de données est appelée :
        <p className="bold-text">
          Indicateurs de résultat des lycées d'enseignement général et
          technologique.
        </p>
        Le projet présente des indicateurs (nombres et taux) en lien avec les
        différents lycées générales et technologiques entre les années 2012 et
        2018. Les données sont stockés dans une base de données
        <p className="bold-text">MongoDB</p>. Pour obtenir les données
        nécessaires au bon fonctionnement de cette application web, vous devez
        suivre les indications ci-dessous :
        <ul>
          <li>
            Télécharger les données sur le site
            <a href="https://www.data.gouv.fr/fr/datasets/indicateurs-de-resultat-des-lycees-denseignement-general-et-technologique-1/">
              data.gouv.fr
            </a>{" "}
            Choississez le format JSON.
          </li>
          <li>
            Ouvez le fichier <p className="bold-text">db_builder.js</p> contenu
            dans le dossier
            <p className="bold-text">Backend</p>{" "}
          </li>
          <li>
            Dans ce fichier, changer la direction désignant les données brutes,
            par exemple
            <p className="italic-text">
              ../database/indicateur_lycee_genereale_et_technologique.json
            </p>{" "}
          </li>
          <li>
            Lancer <p className="bold-text">db_builder.js</p> avec la commande
            Node.js
            <p className="italic-text"> node db_builder.js</p>
          </li>
        </ul>
        La base de données est crée, vous pouvez maintenant l'utiliser en
        lançant
        <p className="italic-text">mongod.exe</p> en ligne de commande.
        <h5>Backend</h5>
        Le backend de l'application web est codé avec{" "}
        <p className="bold-text">Node.JS</p>. Le code se trouve dans le fichier
        <p className="italic-text">server.js</p>. Les principales requêtes
        implémentées sont :
        <ul>
          <li>
            la requête <p className="italic-text">allProfils</p> qui aggrège les
            documents de la base de données autour des noms d'établissement et
            des académies, dans le but d'avoir une unique valeur par
            établissement
          </li>
          <li>
            la requête <p className="italic-text">profil</p> qui renvoie, pour
            un établissement et une académie donnés, l'ensemble des documents
            relatifs à l'établissement..
          </li>
        </ul>
        <h5>Frontend</h5>
        Le frontend est codé avec le framework
        <p className="bold-text">React</p>.
      </div>
    );
  }
}

export default PageAccueil;
