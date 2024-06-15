# Session Planner API Backend (Adonis JS)

## Description

L'API Session Planner est une solution sur mesure développée pour l'Union Sportive Vernoise Badminton afin de faciliter l'inscription aux sessions de jeu. Cette API a été développée à l'aide du framework Adonis JS et sert de base pour l'application web.

## Prérequis

- Docker et docker-compose
- node.js et npm

## Installation

1. Clonez le dépôt : `git clone https://github.com/MathieuBesson/session-planner-api`
2. Accédez au répertoire du projet : `cd session-planner-api`
4. Créez un fichier `.env` à partir de `.env.example` et configurez les variables d'environnement, notamment la connexion à la base de données PostgreSQL.
3. Lancez les conteneurs docker du projet : `docker-compose up`
5. Exécutez les migrations : `docker exec -it session-planner-api node ace migration:run`
5. Exécutez les seeders : `docker exec -it session-planner-api node ace db:seed`

## Démarrage

Pour démarrer les conteneur, exécutez la commande suivante :

```shell
docker-compose up
```

L'API sera accessible à l'adresse `http://localhost:8080` et l'outil de visualisation de la base de donnée sur `http://localhost:8081`

## Frontend

Le frontend de Session Planner est une application web à l'aide de Next.js disponible sur ce dépot : [session-planner-pwa](https://github.com/MathieuBesson/session-planner-pwa).

## Licence

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus de détails.