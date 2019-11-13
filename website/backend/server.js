var http = require("http");
var express = require("express");
var passwordHash = require("password-hash");
var app = express();

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

var dbCollection = "profils";

var client = new MongoClient(url, { useUnifiedTopology: true });

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/login/:email/:hashPassword", function(req, res) {
  // requete qui renvoit les infos de la personne
  var email = decodeURI(req.params.email);
  // verifier qu'il correspond bien au hash du password
  var hashPassword = decodeURI(req.params.hashPassword);
  list_credential = {
    "a@min": "password",
    "nom.prenom@domaine.fr": "mdp"
  };
  res.send(
    Object.keys(list_credential).includes(email) &&
      passwordHash.verify(list_credential[email], hashPassword)
  );
});

client.connect(function(err, db) {
  if (err) throw err;
  else {
    app.get("/allProfil", function(req, res) {
      // requete qui renvoit tout les profils
      var dbo = db.db("mydb");
      var mysort = { "fields.etablissement": 1 };
      dbo
        .collection(dbCollection)
        .aggregate([
          {
            $group: {
              _id: {
                $concat: [
                  "$fields.etablissement",
                  " - ",
                  "$fields.academie",
                  " - ",
                  "$fields.ville"
                ]
              },
              num_doc: { $sum: 1 }
            }
          }
        ])
        .toArray(function(error, result) {
          if (error) throw error;
          else {
            console.log("QUERY RESULT : ", result);
            res.send(result);
          }
        });
    });

    app.get("/profil/:etablissement/:academie/:ville", function(req, res) {
      // requete qui renvoit les infos de la personne
      console.log("NAME : ", req.params.etablissement);
      console.log("ACADEMIE : ", req.params.academie);
      console.log("VILLE : ", req.params.ville);
      var etablissement = decodeURI(
        req.params.etablissement.replace(/_/gi, " ")
      );
      var academie = decodeURI(req.params.academie);
      var ville = decodeURI(req.params.ville);

      var dbo = db.db("mydb");
      var query = {
        "fields.etablissement": etablissement,
        "fields.academie": academie,
        "fields.ville": ville
      };
      var mysort = { "fields.etablissement": 1, "fields.annee": 1 };
      dbo
        .collection(dbCollection)
        .find(query)
        .sort(mysort)
        .toArray(function(error, result) {
          if (error) throw error;
          else {
            console.log("QUERY RESULT : ", result);
            res.send(result);
          }
        });
    });

    app.get("/statistiques", function(req, res) {
      /* 
        Requete qui renvoit les statistiques:
          - 5 lycées avec la meilleure moyenne
          - 5 academies avec les meilleures résultats
          - 5 lycées accueillant le plus d'étudiants  
      */
      var dbo = db.db("mydb");
      let resultat = {};

      let promise1 = new Promise(function(resolve, reject) {
        dbo
          .collection(dbCollection)
          .aggregate([
            {
              $group: {
                _id: {
                  $concat: ["$fields.etablissement", " - ", "$fields.academie"]
                },
                totalNumberStudent: {
                  $avg: {
                    $sum: [
                      "$fields.effectif_presents_serie_l",
                      "$fields.effectif_presents_serie_es",
                      "$fields.effectif_presents_serie_s",
                      "$fields.effectif_presents_serie_stg",
                      "$fields.effectif_presents_serie_sti2d",
                      "$fields.effectif_presents_serie_std2a",
                      "$fields.effectif_presents_serie_stmg",
                      "$fields.effectif_presents_serie_sti",
                      "$fields.effectif_presents_serie_stl",
                      "$fields.effectif_presents_serie_st2s",
                      "$fields.effectif_presents_serie_musique_danse",
                      "$fields.effectif_presents_serie_hotellerie"
                    ]
                  }
                },
                count: { $sum: 1 }
              }
            },
            {
              $sort: { totalNumberStudent: -1 }
            }
          ])
          .limit(10)
          .toArray(function(error, res) {
            if (error) throw error;
            else {
              console.log(res);
              resolve((resultat["totalNumberStudent"] = res));
            }
          });
      });

      let promise2 = new Promise(function(resolve, reject) {
        dbo
          .collection(dbCollection)
          .aggregate([
            {
              $group: {
                _id: {
                  $concat: [
                    "$fields.etablissement",
                    " - ",
                    "$fields.academie",
                    " - ",
                    "$fields.ville"
                  ]
                },
                averageBrutGrade: {
                  $avg: {
                    $sum: [
                      { $toInt: "$fields.taux_brut_de_reussite_serie_l" },
                      { $toInt: "$fields.taux_brut_de_reussite_serie_es" },
                      { $toInt: "$fields.taux_brut_de_reussite_serie_s" },
                      { $toInt: "$fields.taux_brut_de_reussite_serie_stg" },
                      {
                        $toInt: "$fields.taux_brut_de_reussite_serie_sti2d"
                      },
                      {
                        $toInt: "$fields.taux_brut_de_reussite_serie_std2a"
                      },
                      {
                        $toInt: "$fields.taux_brut_de_reussite_serie_stmg"
                      },
                      { $toInt: "$fields.taux_brut_de_reussite_serie_sti" },
                      { $toInt: "$fields.taux_brut_de_reussite_serie_stl" },
                      {
                        $toInt: "$fields.taux_brut_de_reussite_serie_st2s"
                      },
                      {
                        $toInt:
                          "$fields.taux_brut_de_reussite_serie_musique_danse"
                      },
                      {
                        $toInt: "$fields.taux_brut_de_reussite_serie_hotellerie"
                      }
                    ]
                  }
                },
                count: { $sum: 1 }
              }
            },
            {
              $sort: { averageBrutGrade: -1 }
            }
          ])
          .limit(10)
          .toArray(function(error, res) {
            if (error) throw error;
            else {
              resolve((resultat["averageBrutGrade"] = res));
            }
          });
      });

      let promise3 = new Promise(function(resolve, reject) {
        dbo
          .collection(dbCollection)
          .aggregate([
            {
              $group: {
                _id: {
                  $concat: ["$fields.etablissement", " - ", "$fields.academie",
                  " - ",
                  "$fields.ville"]
                },
                averageAttenduGradeAcad: {
                  $avg: {
                    $sum: [
                      { $toInt: "$fields.taux_reussite_attendu_acad_serie_l" },
                      { $toInt: "$fields.taux_reussite_attendu_acad_serie_es" },
                      { $toInt: "$fields.taux_reussite_attendu_acad_serie_s" },
                      {
                        $toInt: "$fields.taux_reussite_attendu_acad_serie_stg"
                      },
                      {
                        $toInt: "$fields.taux_reussite_attendu_acad_serie_sti2d"
                      },
                      {
                        $toInt: "$fields.taux_reussite_attendu_acad_serie_std2a"
                      },
                      {
                        $toInt: "$fields.taux_reussite_attendu_acad_serie_stmg"
                      },
                      {
                        $toInt: "$fields.taux_reussite_attendu_acad_serie_sti"
                      },
                      {
                        $toInt: "$fields.taux_reussite_attendu_acad_serie_stl"
                      },
                      {
                        $toInt: "$fields.taux_reussite_attendu_acad_serie_st2s"
                      },
                      {
                        $toInt:
                          "$fields.taux_reussite_attendu_acad_serie_musique_danse"
                      },
                      {
                        $toInt:
                          "$fields.taux_reussite_attendu_acad_serie_hotellerie"
                      }
                    ]
                  }
                },
                count: { $sum: 1 }
              }
            },
            {
              $sort: { averageAttenduGradeAcad: -1 }
            }
          ])
          .sort({ averageAttenduGradeAcad: -1 })
          .limit(10)
          .toArray(function(error, res) {
            if (error) throw error;
            else {
              resolve((resultat["averageAttenduGradeAcad"] = res));
            }
          });
      });

      let promise4 = new Promise(function(resolve, reject) {
        dbo
          .collection(dbCollection)
          .aggregate([
            {
              $group: {
                _id: {
                  $concat: ["$fields.etablissement", " - ", "$fields.academie" ,
                  " - ",
                  "$fields.ville"]
                },
                averageAttenduGradeFrance: {
                  $avg: {
                    $sum: [
                      { $toInt : "$fields.taux_reussite_attendu_france_serie_l" },
{ $toInt : "$fields.taux_reussite_attendu_france_serie_es" },
{ $toInt : "$fields.taux_reussite_attendu_france_serie_s" },
{ $toInt : "$fields.taux_reussite_attendu_france_serie_stg" },
{ $toInt : "$fields.taux_reussite_attendu_france_serie_sti2d" },
{ $toInt : "$fields.taux_reussite_attendu_france_serie_std2a" },
{ $toInt : "$fields.taux_reussite_attendu_france_serie_stmg" },
{ $toInt : "$fields.taux_reussite_attendu_france_serie_sti" },
{ $toInt : "$fields.taux_reussite_attendu_france_serie_stl" },
{ $toInt : "$fields.taux_reussite_attendu_france_serie_st2s" },
{ $toInt : "$fields.taux_reussite_attendu_france_serie_musique_danse" },
{ $toInt : "$fields.taux_reussite_attendu_france_serie_hotellerie" }
                    ]
                  }
                },
                count: { $sum: 1 }
              }
            },
            {
              $sort: { averageAttenduGradeFrance: -1 }
            }
          ])
          .limit(10)
          .toArray(function(error, res) {
            if (error) throw error;
            else {
              resolve((resultat["averageAttenduGradeFrance"] = res));
            }
          });
      });

      let promise5 = new Promise(function(resolve, reject) {
        dbo
          .collection(dbCollection)
          .aggregate([
            {
              $group: {
                _id: {
                  $concat: ["$fields.etablissement", " - ", "$fields.academie",
                  " - ",
                  "$fields.ville"]
                },
                averageMentionBrut: {
                  $avg: {
                    $sum: [
                      { $toInt: "$fields.taux_mention_brut_serie_l" },
                      { $toInt: "$fields.taux_mention_brut_serie_es" },
                      { $toInt: "$fields.taux_mention_brut_serie_s" },
                      { $toInt: "$fields.taux_mention_brut_serie_stg" },
                      { $toInt: "$fields.taux_mention_brut_serie_sti2d" },
                      { $toInt: "$fields.taux_mention_brut_serie_std2a" },
                      { $toInt: "$fields.taux_mention_brut_serie_stmg" },
                      { $toInt: "$fields.taux_mention_brut_serie_sti" },
                      { $toInt: "$fields.taux_mention_brut_serie_stl" },
                      { $toInt: "$fields.taux_mention_brut_serie_st2s" },
                      { $toInt: "$fields.taux_mention_brut_serie_musique_danse" },
                      { $toInt: "$fields.taux_mention_brut_serie_hotellerie"}
                    ]
                  }
                },
                count: { $sum: 1 }
              }
            },
            {
              $sort: { averageMentionBrut: -1 }
            }
          ])
          .limit(10)
          .toArray(function(error, res) {
            if (error) throw error;
            else {
              resolve((resultat["averageMentionBrut"] = res));
            }
          });
      });

      let promise6 = new Promise(function(resolve, reject) {
        dbo
          .collection(dbCollection)
          .aggregate([
            {
              $group: {
                _id: {
                  $concat: ["$fields.etablissement", " - ", "$fields.academie" ,
                  " - ",
                  "$fields.ville"]
                },
                averageAttenduMention: {
                  $avg: {
                    $sum: [
                      { $toInt : "$fields.taux_mention_attendu_serie_l" },
                      { $toInt : "$fields.taux_mention_attendu_serie_es" },
                      { $toInt : "$fields.taux_mention_attendu_serie_s" },
                      { $toInt : "$fields.taux_mention_attendu_serie_stg" },
                      { $toInt : "$fields.taux_mention_attendu_serie_sti2d" },
                      { $toInt : "$fields.taux_mention_attendu_serie_std2a" },
                      { $toInt : "$fields.taux_mention_attendu_serie_stmg" },
                      { $toInt : "$fields.taux_mention_attendu_serie_sti" },
                      { $toInt : "$fields.taux_mention_attendu_serie_stl" },
                      { $toInt : "$fields.taux_mention_attendu_serie_st2s" },
                      { $toInt : "$fields.taux_mention_attendu_serie_musique_danse" },
                      { $toInt : "$fields.taux_mention_attendu_serie_hotellerie"}
                    ]
                  }
                },
                count: { $sum: 1 }
              }
            },
            {
              $sort: { averageAttenduMention: -1 }
            }
          ])
          .limit(10)
          .toArray(function(error, res) {
            if (error) throw error;
            else {
              resolve((resultat["averageAttenduMention"] = res));
            }
          });
      });

      Promise.all([
        promise1,
        promise2,
        promise3,
        promise4,
        promise5,
        promise6
      ]).then(function() {
        res.send({ resultat: resultat });
      });
    });
  }
});

app.listen(8080);
