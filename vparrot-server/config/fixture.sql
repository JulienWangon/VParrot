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

/*INSERT SCHEDULES DATA*/
INSERT INTO schedules (day_of_week, morning_opening, morning_closing, afternoon_opening, afternoon_closing) VALUES
("Lundi", "08:00", "12:00", "13:30", "18:00"),
("Mardi", "08:00", "12:00", "13:30", "18:00"),
("Mercredi", "08:00", "12:00", "13:30", "18:00"),
("Jeudi", "08:00", "12:00", "13:30", "18:00"),
("Vendredi", "08:00", "12:00", "13:30", "18:00"),
("Samedi", "10:00", "12:00", "14:00", "17:00"),

/*INSERT SERVICES TYPES DATA*/
INSERT INTO services_type (type_name) VALUES
("entretien"),
("carrosserie"),
("réparation")

/*INSERT SERVICE DATA*/
INSERT INTO services (type_id, service_name, description, price, path_img) VALUES
(1, "Forfait vidange", "Ce forfait inclut une vidange complète de l'huile moteur, le remplacement du filtre à huile, ainsi que le contrôle et le complément des autres fluides essentiels de votre véhicule.", "69.90€", "public/images/services/entretien/vidange.webp"),
(1, "Forfait freinage", "Notre forfait comprend une vérification détaillée de vos freins, le remplacement des plaquettes et des disques de frein si nécessaire, ainsi qu'un contrôle rigoureux du niveau de votre liquide de frein.", "149.90€", "public/images/services/entretien/freinage.webp"),
(1, "Forfait pneumatique", "Ce forfait comprend le montage, le gonflage à la bonne pression, et l'équilibrage de vos pneus. (Prix unitaire par pneu a remplacer hors coût des nouveaux pneus).", "19.90€", "public/images/services/entretien/pneumatique.webp"),
(1, "Forfait direction", "Ce forfait comprend une inspection détaillée de tous les éléments clés du système de direction, y compris la crémaillère de direction, la colonne de direction, les joints universels et les biellettes.", "89.90€", "public-images/services/entretien/direction.webp"),
(1, "Forfait climatisation", "Ce forfait comprend un contrôle complet de votre système de climatisation. Nos techniciens qualifiés vérifieront l'état du compresseur, de l'évaporateur, du condenseur, ainsi que des autres éléments du système.", "74.90€", "public/images/services/entretien/climatisation.webp"),
(2, "Débosselage", "Qu'il s'agisse de petits impacts ou de bosses plus importantes, notre équipe, utilise des techniques de pointe, y compris le débosselage sans peinture lorsque c'est possible, pour minimiser les coûts et le temps d'immobilisation de votre véhicule.", "Sur Devis", "public/images/services/carrosserie/debosselage.webp"),
(2, "Suppression rayures", "Nous savons combien une rayure peut altérer l'apparence de votre véhicule. C'est pourquoi nous offrons un service de réparation des rayures de carrosserie rapide et efficace. Qu'il s'agisse d'une éraflure mineure ou de marques plus profondes.  Nos techniciens qualifiés utilisent des produits de haute qualité pour restaurer l'intégrité de la peinture de votre voiture.", "Sur Devis", "public/images/services/carrosserie/rayure.webp"),
(2, "Anti corrosion", "Non traitée, la rouille peut se propager et causer des dommages structurels importants.  Nos techniciens interviennent pour stopper la progression de la corrosion, éliminer les zones rouillées et réparer les dommages. Ils s'assurent ensuite de protéger les zones réparées avec des produits anticorrosion de haute qualité pour prévenir toute réapparition.", "Sur Devis", "public/images/services/carrosserie/corrosion.webp"),
(2, "Peinture", "Qu'il s'agisse d'une simple retouche ou d'une refonte complète de la couleur, nous utilisons des produits de peinture de haute qualité pour assurer une finition durable et éclatante. Nos experts en peinture maîtrisent parfaitement l'art de la correspondance des couleurs pour garantir une finition homogène qui correspond exactement à l'original ou à vos spécifications personnalisées.",  "Sur Devis", "public/images/services/carrosserie/peinture.webp"),
(2, "Covering", "Le covering offre une manière de personnaliser l'apparence de votre véhicule. Nous intervenons sans altérer la peinture d'origine. Que vous souhaitiez un changement de couleur complet ou un design spécifique , nos techniciens garantissent une application précise et sans bulles. Le covering est réversible, vous offrant la liberté de revenir à l'original quand vous le souhaitez", "Sur Devis", "public/images/services/carrosserie/covering.webp"),
(3, "Moteur", "Le moteur est le cœur de votre véhicule. Sa santé et son bon fonctionnement sont essentiels pour une conduite sûre et performante. Qu'il s'agisse d'un problème mineur ou d'une réparation majeure, nous sommes en mesure de traiter tous les aspects de la réparation du moteur.", "Sur Devis", "public/images/services/reparation/moteur.webp"),
(3, "Diagnostic électrique", "Que vous ayez des problèmes avec votre batterie, votre alternateur, vos phares, ou encore votre système de démarrage, nos techniciens expérimentés sont équipés pour identifier rapidement et résoudre efficacement le problème. Grâce à nos outils de diagnostic et à notre équipe dévouée, nous assurons un service de qualité pour toutes les réparations électriques dont votre véhicule pourrait avoir besoin.", "Sur Devis", "public/images/services/reparation/electrique.webp"),
(3, "Suspension et direction", "Qu'il s'agisse de la réparation d'amortisseurs usés, du remplacement de barres stabilisatrices ou de la résolution de problèmes de direction, nos techniciens qualifiés sont équipés pour le travail. Grâce à notre expertise, nous nous assurons que votre voiture offre une conduite douce, une bonne tenue de route et une direction précise.", "Sur Devis", "public/images/services/reparation/suspension.webp"),
(3, "Transmission", "La transmission joue un rôle essentiel dans le fonctionnement de votre véhicule, assurant une conduite en douceur et efficace. Nos techniciens sont experts dans le diagnostic des problèmes de transmission, manuelle ou automatique. Qu'il s'agisse d'un simple changement de liquide ou d'une réparation plus complexe, nous avons l'expertise pour vous offrir une solution efficace.", "Sur Devis", "public/images/services/reparation/transmission.webp"),
(3, "Refroidissement", "Le système de refroidissement joue un rôle crucial dans la régulation de la température du moteur, garantissant ainsi des performances optimales et la longévité de votre voiture. Nos techniciens experts sont formés pour diagnostiquer et réparer tous les composants du système de refroidissement, y compris le radiateur, le thermostat, les pompes à eau, et les ventilateurs.Nous assurons un service rapide et fiable, vous permettant de reprendre la route en toute sécurité.", "Sur Devis", "public/images/services/reparation/refroidissement.webp");


/*INSERT CONTACT DATA*/
INSERT INTO contact (first_name, last_name, phone, email, contact_subject, content, is_treated, treatment_date, treatment_methode) VALUES
("Marcel", "PADBOLE", "0425874689", "m.padbole@email.com", "devis carrosserie", "bonjour, je viens de percuter un poteau j'aurai besoin de connaitre le coute des reparations, merci de me recontacter pour un rdv, cordialement", 0, "", "" ),
("Julie", "PASFACILE", "0758468932", "j.pasfacile@email.com", "devis reparation", "Bonjour, depuis ce mati mon véhicule fume noire, pouvez vous me téléphoner pour prévoir les répérations", 1, "17/08/2023 15:30", "téléphone"),
("Jean", "FONCE", "0625461008", "j.fonce@email.com", "rendez_vous entretien", "Bonjour, j'ai besoin d'un rendez-vous pour la révision des 75000 km de ma Fiat Panda", 0, "", "");

/*INSERT CARS DATA*/
INSERT INTO cars (brand, model, trade_name, price) VALUES
("AUDI", "A3 BERLINE", "ADVANCED 3.0 TFSI S Tronic SPORT XENON", 38000),
("MERCEDES", "CLA II", "2.0 250 224 AMG LINE", 45000),
("BMW", "M3 G80", "COMPETITION G80 3.0 510", 110000),
("VOLKSWAGEN", "GOLF 8 GTI", "2.0 TSI 300 GTI CLUBSPORT", 52000),
("TESLA", "MODEL 3", "50kWh 306 STANDARD PLUS", 25990),
("TESLA", "MODEL S PHASE 2", "100kWh 796 PERFOMANCE LUDICROUS", 75000),
("BMW", "I8 ROADSTER", "1.5 374 A", 124900),
("VOLVO", "V40", "2.0 D2 ADBLUE 120 BUSINESS", 17500),
("LEXUS", "ES PHASE 2", "2.5 300H 178 BUSINESS", 53000),
("LEXUS", "RC", "2.5 300H 300F SPORT EXECUTIVE", 34000);

/*INSERT CARS IMAGES DATA*/
INSERT INTO car_images (file_path, is_main, car_id) VALUES
("public/images/cars/car1/img1.webp", 1, 1),
("public/images/cars/car1/img2.webp", 0, 1),
("public/images/cars/car1/img3.webp", 0, 1),
("public/images/cars/car1/img4.webp", 0, 1),
("public/images/cars/car1/img5.webp", 0, 1),
("public/images/cars/car2/img1.webp", 1, 2),
("public/images/cars/car2/img2.webp", 0, 2),
("public/images/cars/car2/img3.webp", 0, 2),
("public/images/cars/car2/img4.webp", 0, 2),
("public/images/cars/car2/img5.webp", 0, 2),
("public/images/cars/car3/img1.webp", 1, 3),
("public/images/cars/car3/img2.webp", 0, 3),
("public/images/cars/car3/img3.webp", 0, 3),
("public/images/cars/car3/img4.webp", 0, 3),
("public/images/cars/car3/img5.webp", 0, 3),
("public/images/cars/car4/img1.webp", 1, 4),
("public/images/cars/car4/img2.webp", 0, 4),
("public/images/cars/car4/img3.webp", 0, 4),
("public/images/cars/car4/img4.webp", 0, 4),
("public/images/cars/car4/img5.webp", 0, 4),
("public/images/cars/car5/img1.webp", 1, 5),
("public/images/cars/car5/img2.webp", 0, 5),
("public/images/cars/car5/img3.webp", 0, 5),
("public/images/cars/car5/img4.webp", 0, 5),
("public/images/cars/car5/img5.webp", 0, 5),
("public/images/cars/car6/img1.webp", 1, 6),
("public/images/cars/car6/img2.webp", 0, 6),
("public/images/cars/car6/img3.webp", 0, 6),
("public/images/cars/car6/img4.webp", 0, 6),
("public/images/cars/car6/img5.webp", 0, 6),
("public/images/cars/car7/img1.webp", 1, 7),
("public/images/cars/car7/img2.webp", 0, 7),
("public/images/cars/car7/img3.webp", 0, 7),
("public/images/cars/car7/img4.webp", 0, 7),
("public/images/cars/car7/img5.webp", 0, 7),
("public/images/cars/car8/img1.webp", 1, 8),
("public/images/cars/car8/img2.webp", 0, 8),
("public/images/cars/car8/img3.webp", 0, 8),
("public/images/cars/car8/img4.webp", 0, 8),
("public/images/cars/car8/img5.webp", 0, 8),
("public/images/cars/car9/img1.webp", 1, 9),
("public/images/cars/car9/img2.webp", 0, 9),
("public/images/cars/car9/img3.webp", 0, 9),
("public/images/cars/car9/img4.webp", 0, 9),
("public/images/cars/car9/img5.webp", 1, 9),
("public/images/cars/car10/img1.webp", 1, 10),
("public/images/cars/car10/img2.webp", 0, 10),
("public/images/cars/car10/img3.webp", 0, 10),
("public/images/cars/car10/img4.webp", 0, 10),
("public/images/cars/car10/img5.webp", 0, 10);

/*INSERT CARS FEATURES*/
INSERT INTO car_features (car_id, years, fuel, power, kilometer, transmission, body) VALUES
(1, 2021, "Essence", 150, 7503, "Manuelle", "Berline"),
(2, 2019, "Essence", 224, 28785, "Automatique", "Berline"),
(3, 2021, "Essence", 510, 15000, "Automartique", "Sportive"),
(4, 2023, "Essence", 300, 50, "Automatique", "Sportive"),
(5, 2019, "Electrique", 306, 149000, "Automatique", "Citadine"),
(6, 2020, "Electrique", 672, 60500, "Automatique", "Berline"),
(7, 2018, "Hybride", 374, 39500, "Automatique","Sportive"),
(8, 2019, "Diesel", 120, 69450, "Manuelle", "Citadine"),
(9, 2023, "Diesel", 178, 9600, "Manuelle", "Berline"),
(10, 2017, "Hybride", 223, 60000, "Manuelle", "Sportive");











