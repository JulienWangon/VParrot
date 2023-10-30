SET NAME 'utf8';
USE vparrot_garage;

/*INSERT ROLES DATA*/
INSERT INTO roles (role_name) VALUES
("admin"),
('employé');


/*INSERT USERS DATA*/
INSERT INTO users (first_name, last_name, user_email, user_password, role_id) VALUES
("Victor", "PARROT", "v.parrot@vparrot.com", "testmdp", 1),
("Benoit", "PAIRE", "b.paire@vparrot.com", "benoit57000", 2),
("Lucien", "BOULARD", "l.boulard@vparrot.com", "lucien57000", 2);

/*INSERT TESTIMONES DATA*/
INSERT INTO testimonies (first_name, last_name, content, rating, is_moderated) VALUES
("Jean", "NEYMAR", "Prestation au top, je recommande le garage", 5, 0),
("Marc", "MAROULE", "Service médiocre je ne reviendrai pas", 1, 0),
("Julien", "TROUBI", "Personnel très pro, véhicule bien pris en charge", 5, 0),
("Luc", "PARIS", "Le patron est sympa, facturation transparente", 5, 1),
("François", "TRITON", "Un peut d'attente mais content de l'intervention", 4, 1),
("Jeanne", "POULINOIS", "Equipe très pro, plutôt rassurant pour moi qui n'y connais rien en voiture", 5, 1),
("Miguel", "BANDOZA", "Mon véhiucle est entre de bonnes mains même si la prise de rendez_vous était difficile", 4, 1);