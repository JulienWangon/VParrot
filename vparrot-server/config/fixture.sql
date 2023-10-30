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
