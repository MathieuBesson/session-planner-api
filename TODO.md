# TODO 

## Splash screen

- Authentification google

## Session List

[http://127.0.0.0:8080/users?start_date=2024-05-17&end_date=2024-06-17]
- GET sessions des deux mois à venir
    - Filtres : date début, date fin, non annulé
[http://127.0.0.1:8080/sessions/1/users/1]
- POST : inscription de l'utilisateur à la session
    - Vérif : 
        - Nombre de places OK
        - Session ouverte

## Session

[http://127.0.0.1:8080/sessions/1]
- GET session
[http://127.0.0.1:8080/sessions/1/users]
- GET liste inscrits
[http://127.0.0.1:8080/sessions/1/users/1]
- POST : inscription de l'utilisateur à la session
    - Vérif : 
        - Nombre de places OK
        - Session ouverte

### [ADMIN] (en +)

Vérif : ROLE ADMIN

[http://localhost:8080/users?username=la]
- GET utilisateurs :
    - Filtres : utilisateur nom, limite 5
[http://127.0.0.1:8080/sessions/1/users/1]
- DELETE utilisateur session (true delete)
[http://127.0.0.1:8080/sessions/1/users/1]
- POST utilisateur session
    - Vérif :
        - Nombre de places OK
        - Session ouverte

## Utilisateur [ADMIN] 

[http://localhost:8080/users]
- GET utilisateurs
[http://127.0.0.1:8080/users/1]
- PATCH : rôle utilisateur

## Session modification [ADMIN]

[http://127.0.0.1:8080/sessions/1]
- GET session
[http://localhost:8080/halls]
- GET hall
[http://localhost:8080/session-types]
- GET session_type
- PATCH session
    - Vérif : 
        - Nombre d'inscrit est pas supérieur à limite max salle
        - Sur cette horaire (ou journée) dans cette salle : nombre places restantes => 0
        - Championnat : max_capacity <= hall.max_capacity - sessions.max_capacity + session.session_type.jeu_libre
[http://127.0.0.1:8080/sessions/1]
- DELETE session (soft delete)

## Session création [ADMIN]

[http://localhost:8080/halls]
- GET hall
[http://localhost:8080/session-types]
- GET session_type
- POST session
    - Vérif : 
        - Nombre d'inscrit est pas supérieur à limite max salle
        - Sur cette horaire (ou journée) dans cette salle : nombre places restantes => 0
        - Championnat : max_capacity <= hall.max_capacity - sessions.max_capacity + session.session_type.jeu_libre

- Incription / connexion avec google, créer ou modifier un utilisateur depuis les données google
- Ne plus pouvoir accèder à la page de connexion si on a un token valid (vérifier ce token sur la page de connexion sinon redirect sur la home)
- Faire un boutton déconnexion sur la home
- Vérifier comment interdire l'accès à une page du front gràce au token : requête au back surement sur une route spécial, vérifier aussi le rôle /connect-check/role
- Créer un requeteur custom pour faire les requêtes à l'API
- Faire les pages distincts 


















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
