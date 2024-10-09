# Présentation d'une liste de films et de séries

C'est une application pour présenter une liste de films et de séries, qui contient également un champ de texte dynamique qui lance une recherche sur un titre de film ou de série.

## Table des Matières

- Installation
- Utilisation
- Fonctionnalités


## Installation
1. Cloner le dépot :
```
git clone git@github.com:dev-amine-web/tvshowmovies.git
```
2. Ouvrir le répertoire tvshowmovies
```
cd tvshowmovies
```
3. Installez les dépendances
```
npm install
```
4. Ajouter le fichier de configuration ".env" dans la racine du projet
```
REACT_APP_API_URL=https://api.themoviedb.org 
REACT_APP_CDN_IMAGES=https://image.tmdb.org/t/p/w500
REACT_APP_API_KEY=92b418e837b833be308bbfb1fb2aca1e
```

## Utilisation
1. Pour lancer le serveur en local
```
npm start
```
L’application sera accessible à l’adresse http://localhost:3000.

2. Pour lancer les tests unitaire
```
npm run test
```
![image](https://github.com/user-attachments/assets/fb041209-03bd-45be-b8d2-432394b770d3)

## Fonctionnalités
### Listez les films et les séries

J'ai ajouté une liste de type (movie, tvShow) pour pouvoir choisir soit une liste de films ou une liste de séries
Pour la pagination j'ai ajouté le (lazy loading) en utilisant les hooks UseInview et aussi **useInfiniteQuery**

#### API

##### Discover

/3/discover/movie/ => pour lister les films<br>
/3/discover/tv/ => pour lister les series<br>
Pour paginer il faut utiliser le paramètre **page** avec le numéro de la page

##### search

/3/search/movie/ =>  pour lister les films<br>
/3/search/tv/ => pour lister les séries<br>
Pour filtrer il faut utiliser le paramètre **query** avec le nom du film<br>
Pour paginer il faut utiliser le paramètre **page** avec le numéro de la page<br>




#### Parmi les avantages d'utiliser useInfiniteQuery
1. Mise en cache: Ajout du cache client qui permet d'éviter les surcharges serveur (en évitant des calls inutiles) tout en spécifiant la durée du cache à garder dans la mémoire du navigateur. Dans notre cas j'ai mis 10 minutes

![image](https://github.com/user-attachments/assets/08107fe2-6c41-4249-98eb-7142fe4a1f77)


2. Lazy loading: ça permet de charger la liste des films ou de séries par pages au fur et à mesure que l'utilisateur fait défiler la page. Cela améliore l'expérience utilisateur et surtout éviter de charger toutes les données d'un seul coup.
3. Pagination plus facile: la pagination est gérée automatiquement en appelant la fonction fetchNextPage
```
    useEffect(() => {
        if (inView && isFetched) {
            startTransition(() => {
                fetchNextPage();
            })
        }
    }, [fetchNextPage, inView, isFetched]);
```
4. Plusieurs paramètres utiles comme isFetching, hasNextPage, error, status, fetchNextPage ...




#### Synchroniser le champ de recherche, choix du type et l’URL
![image](https://github.com/user-attachments/assets/db7f27f5-14f1-4d09-a321-c3256b07dd63)





L'url de l'application se met à jour par rapport aux choix du type (Movie ou TvShow) et aussi par rapport au texte saisie dans le champ de recherche. Pour cela j'utilise la fonction navigate du hook navigate
##### Responsive design
###### Web<br>
![image](https://github.com/user-attachments/assets/137e5391-cdd6-4720-80b7-fbe8bf470dbc)



###### Mobile <br>

![image](https://github.com/user-attachments/assets/7b8fe028-7c47-4162-989c-98c9e57e9344)




###### Tablette<br>

![image](https://github.com/user-attachments/assets/681b430e-25c6-4fff-8473-901557589cbb)



### Consulter les détails (résumé, casting, pays, année, illustration, …) d’un film ou d’une série

J'ai ajouter une popup pour pouvoir visualiser les détails d'un film ou d'une série. J'ai mis en place un cache client pour cela j'utilise **useQuery**

#### API

/3/movie/id => pour récupérer la fiche detail d'un film <br>
/3/tv/id => pour récupérer la fiche detail d'une serie <br>

#### Parmis les avantages d'utiliser useQuery

1. Plusieurs paramètres d'état de chargement et d'erreur comme isFetching, error, status ...
2. Mise en cache des données. J'ai mis un cache de 10 minutes pour éviter de faire des appels inutiles
![image](https://github.com/user-attachments/assets/869c1556-6466-48c0-af15-d04595d5e8eb)

#### Affichage des données

##### Fiche movie
J'affiche le titre, l'image, bouton consulter (pour visiter la homepage du film), résumé, date, genres et pays
###### Responsive design
Web<br>
![image](https://github.com/user-attachments/assets/2ab83da2-e680-4e2f-b952-4a1193595f0b)



Tablette<br>

![image](https://github.com/user-attachments/assets/f92c12c6-1b67-4b84-a3b4-20aeb5b0b28a)



Mobile<br>

![image](https://github.com/user-attachments/assets/aa7d8ad8-8ea0-4f81-a941-f65352afefdf)



##### Fiche série
J'affiche le titre, l'image, bouton consulter (pour visiter la homepage de la série), résumé, date, créé par, genres, pays et la liste des saisons sans un swiper **Les saisons ne sont pas Cliquable **<br>
Web<br>
![image](https://github.com/user-attachments/assets/87b0854f-4557-4ed7-9da7-7258d2009db4)


Mobile<br>
![image](https://github.com/user-attachments/assets/767dd561-c8bd-4f54-a3e2-a8f7f0b1ef55)


Tablette<br>

![image](https://github.com/user-attachments/assets/59b12c0c-aef9-47a3-8fab-7867eae852d0)


