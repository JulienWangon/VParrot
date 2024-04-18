"# Projet Garage V.Parrot" 

Procédure d'installation du projet pour une utilisation sur une machine windows


 1. Installation de l'outil pour lancer un server en local WAMP64

 2. une fois installé se rendre dans le dossier www 

 3. executez la commande git clone https://github.com/JulienWangon/vparrot.git pour cloner le projet dans le dossier

3. ouvrire une fenetre de terminal et naviquez jusqu au dossier vparrot-front executez la commande npm install 
Cette commande va créer le dossier node_modules et y installer toutes les dépendances listées dans package.json

4. naviguer vers le dossier vparrot-server et executez la commande composer install pur reinstaller les paquest définis dans le fichier composer.json


5. dans le dossier vparrot-server créé un fichier .env et copier le code suivant et collez le à l'interieur , il s'agit de varible d'environnement pour configurer mon service d'email PHP Mailer et la clé secrète pour encoder les token JWT



6. mise en place de la base de donnée et injection des fixtures

télécharger le dossier archive au lien ci joint : 
le dossier contient les fichiers pour la création de la base de donnée et des tables ainsi que le fichier d'injection des fixtures dans la base 

ouvrez un terminal et déplacer vers le dossier  C:\wamp64\bin\mysql\mysqlx.y.z\bin>
dans un premier temps il faut créer la base de donnée grace à la commande suivante : 
C:\wamp64\bin\mysql\mysqlx.y.z\bin>mysql -u nom_utilisateur -p < C:\le\chemin\verd\votre\fichier\Database.sql 

le terminal vous demande de saisie votre mot de passe, validez votre mot de passe pour lancer la création de la base de donnée 
vous pouvez aller controller directement dans phpMyAdmin que la base de données et les tables sont maintenant présentes.

De lamême manière il faut procéder à l'installation des fixtures : 
utilisez la commande C:\wamp64\bin\mysql\mysqlx.y.z\bin>mysql -u nom_utilisateur -p nom_base_de_deonnées < c:\chemin\vers\votre\fichier\fixture.sql puis exécutez la commande
Le terminal vous demande à nouveau de saisie votre mot de passe pui appuyez sur entré
Tout c'est bien passé vous pouvez vérifier directement avec phpMyAdmin la base de donnée à été alimentée avec les données du fichier fixture.sql

tout est normalement pret pour que le projet soit fonctionnel. 
utiliser le terminal pour vous rendre dans le dossier vparrot-front et executez la commande : npm start 
le server de développement se lance vous pouvez maintenant utiliser le projet 

l'accès à la page de connexion se fait via l url : /access-panel













 
