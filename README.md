# Session planner

## Commandes utiles 

Lancement de l'API back-end 

```bash
docker-compose up
```

Lancement des migrations

```bash
docker exec -it session-planner-api node ace migration:run
```

Lancement des seeds

```bash
docker exec -it session-planner-api node ace db:seed
```
