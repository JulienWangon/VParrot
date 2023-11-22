"# Projet Garage V.Parrot" 

Procédure d'installation du projet pour une utilisation sur une machine windows


 1. Installation de l'outil pour lancer un server en local WAMP64

 2. une fois installé se rendre dans le dossier www 

3. ouvrire une fenetre de terminal et naviquez jusqu au dossier front end executez la commande npm install 
Cette commande va créer le dossier node_modules et y installer toutes les dépendances listées dans package.json

4. naviguer vers le dossier vparrot-server et executez la commande composer install pur reinstaller les paquest définis dans le fichier composer.json


5. dans le dossier vparrot-server créé un fichier .env et copier le code suivant et collez le à l'interieur , il s'agit de varible d'environnement pour configurer mon service d'email PHP Mailer et la clé secrète pour encoder les token JWT

SECRET_KEY = "k1#em1zeb-=w@%_ym5+5l6h27y1!tu(2ph@u-+=21igg=8%228"

SMTP_HOST  ="muscadier.o2switch.net"
SMTP_USER = "noreply@garage-vparrot.j-webflow.com"
SMTP_PASSWORD = "@Julien57320"
SMTP_SECURE = "ssl"
SMTP_PORT = "465"
MAIL_FROM_ADDRESS = "noreply@garage-vparrot.j-webflow.com"
MAIL_FROM_NAME = "Garage V.Parrot"

6. mise en place de la base de donnée et injection des fixtures

télécharger le dossier archive au lien ci joint : https://drive.google.com/file/d/1SmDigLDOc5I_9AgCym6cWm6KtAeZUT5b/view?usp=sharing
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

email administrateur : vincent.parrot@garage-vparrot.j-webflow.com
mot de passe: @Julien57320

email employé : benoit.paire@garage-vparrot.j-webflow.com
mot de passe: @Julien57320











 
