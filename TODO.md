# TODO 

## Splash screen

- Authenification google

## Session List

[http://127.0.0.0:8080/users?start_date=2024-05-17&end_date=2024-06-17]
- GET sessions des deux mois à venir
    - Filtres : date début, date fin, non annulé


- POST : inscription de l'utilisateur à la session
    - Vérif : 
        - Nombre de places OK
        - Session ouverte

## Session

- GET session
- GET liste inscrits
- POST : inscription de l'utilisateur à la session
    - Vérif : 
        - Nombre de places OK
        - Session ouverte

### [ADMIN] (en +)

Vérif : ROLE ADMIN

- GET utilisateurs : 
    - Filtres : utilisateur nom, limite 5
- DELETE utilisateur session (true delete)
- POST utilisateur session
    - Vérif : 
        - Nombre de places OK
        - Session ouverte

## Utilisateur [ADMIN] 

- GET utilisateurs
- PATCH : rôle utilisateur

## Session modification [ADMIN]

- GET session
- PATCH session
    - Vérif : 
        - Nombre d'inscrit est pas supérieur à limite max salle
        - Sur cette horaire (ou journée) dans cette salle : nombre places restantes => 0
        - Championnat : max_capacity <= hall.max_capacity - sessions.max_capacity + session.session_type.jeu_libre
- DELETE session (soft delete)

## Session création [ADMIN]

- POST session
    - Vérif : 
        - Nombre d'inscrit est pas supérieur à limite max salle
        - Sur cette horaire (ou journée) dans cette salle : nombre places restantes => 0
        - Championnat : max_capacity <= hall.max_capacity - sessions.max_capacity + session.session_type.jeu_libre



## Idées +

- Pagination
- Envoi du lien par token
- Possibilité modification profile : Nom prénom
- Groupes d'utilisateurs (pas droit inscription sur tout les créneaux)
- Rôles secondaire : capitaine, entraineur avec des droits de CRUD dédiées
- Mise en place de notifs push pour participer à une session
- Ajout création session multiple : récurrence hebdo
- Pagination au niveau de l'API, pour éviter les surcharges

+ voir fonctionnalités V2 Propoal commercial
