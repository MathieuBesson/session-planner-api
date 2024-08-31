
# Session Planner API Backend (Adonis JS)

![AdonisJS](https://img.shields.io/badge/adonisjs-v5-blue?logo=adonisjs&logoColor=white&labelColor=5F4BFF&color=white)
![node.js](https://img.shields.io/badge/node.js-v20-339933?logo=nodedotjs&logoColor=white&labelColor=339933&color=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?logo=mit&logoColor=white&labelColor=yellow&color=white)

## Description

**Session Planner** est une solution sur mesure développée pour l'Union Sportive Vernoise Badminton afin de faciliter l'inscription aux sessions de jeu. Ce dépôt contient l'API de la solution, elle a été développée avec le framework **Adonis JS** et sert de source de donnée pour l'application web.

## Prérequis

![docker](https://img.shields.io/badge/docker-2496ED?logo=docker&logoColor=white&labelColor=2496ED)
![docker-compose](https://img.shields.io/badge/docker--compose-2496ED?logo=docker&logoColor=white&labelColor=2496ED)
![node.js](https://img.shields.io/badge/node.js-339933?logo=nodedotjs&logoColor=white&labelColor=339933)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white&labelColor=CB3837)


## Installation

1. **Clonez le dépôt** : 
   ```bash
   git clone https://github.com/MathieuBesson/session-planner-api
   ```
2. **Accédez au répertoire du projet** :
   ```bash
   cd session-planner-api
   ```
3. **Configurez les variables d'environnement** :
   - Créez un fichier `.env` à partir de `.env.example`
   - Configurez les variables d'environnement, notamment la connexion à la base de données PostgreSQL.
4. **Lancez les conteneurs Docker du projet** :
   ```bash
   docker-compose up -d
   ```
5. **Exécutez les migrations** :
   ```bash
   docker exec -it session-planner-api node ace migration:run
   ```
6. **Exécutez les seeders** :
   ```bash
   docker exec -it session-planner-api node ace db:seed
   ```

## Démarrage

Pour démarrer les conteneurs, exécutez la commande suivante :

```bash
docker-compose up
```

- L'API sera accessible à l'adresse : `http://localhost:8080`
- L'outil de visualisation de la base de données : `http://localhost:8081`

## Frontend

Le frontend de **Session Planner** est une application web construite avec **Next.js**. Vous pouvez la retrouver ici : [session-planner-pwa](https://github.com/MathieuBesson/session-planner-pwa).

## TODO

- Validation des types de données reçus par l'API avec des schémas ([zod](https://zod.dev/), [vine.js](https://vinejs.dev))
- Ajouter de la JS doc sur les fonctions
- Ajouter des tests unitaires
- Ajouter une documentation Swagger de l'API
- Corriger les différents TODO 

## Licence

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus de détails.
