# Projet de développement web

Ce projet est un projet de développement web qui exploite une base de données libre de droit. Son objectif n'est autre que l'apprentissage et la montée en compétence sur des technologies du web.
Technologies requises : - MongoDB - React - Node.JS.

## Données

Les données nécessaires sont délivrées par le Gouvernement français sur le site [data.gouv.fr](https://www.data.gouv.fr/fr/datasets/indicateurs-de-resultat-des-lycees-denseignement-general-et-technologique-1/). La base de données est appelée :

**Indicateurs de résultat des lycées d'enseignement général et technologique**.

Le projet présente des indicateurs (nombres et taux) en lien avec les différents lycées générales et technologiques entre les années 2012 et 2018. Les données sont stockés dans une base de données **MongoDB**. Pour obtenir les données nécessaires au bon fonctionnement de cette application web, vous devez suivre les indications ci-dessous :

- Télécharger les données sur le site [data.gouv.fr](https://www.data.gouv.fr/fr/datasets/indicateurs-de-resultat-des-lycees-denseignement-general-et-technologique-1/)
- Choississez le format JSON.
- Ouvez le fichier **db_builder.js** contenu dans le dossier **Backend** Dans ce fichier, changer la direction désignant les données brutes, par exemple ../database/indicateur_lycee_genereale_et_technologique.json
- Lancer **db_builder.js** avec la commande Node.js :

```
node db_builder.js
```

La base de données est créée, vous pouvez maintenant l'utiliser en lançant mongod.exe en ligne de commande.

## Backend

Le backend de l'application web est codé avec **Node.JS**. Le code se trouve dans le fichier server.js. Les principales requêtes implémentées sont :

- la requête **allProfils** qui aggrège les documents de la base de données autour des noms d'établissement et des académies, dans le but d'avoir une unique valeur par établissement
- la requête **profil** qui renvoie, pour
  un établissement et une académie donnés, l'ensemble des documents relatifs à l'établissement
- la requête **statistiques** qui renvoie les 10 meilleurs écoles pour 5 principaux indicateurs (noms moyens d'étudiants, taux brut de réussite, etc).

## Frontend

Le frontend est codé avec le framework **React** et utilise des éléments de style **Bootstrap**.
