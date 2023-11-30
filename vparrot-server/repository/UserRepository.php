<?php

require_once './vparrot-server/models/Users.php';
require_once './vparrot-server/models/Database.php';
require_once './vparrot-server/models/Role.php';

class UserRepository extends Database {

    /**
     * Récupère tous les utilisateurs et leurs rôles associés.
     *
     * Cette méthode interroge la base de données pour extraire les informations de tous les utilisateurs
     * ainsi que leurs rôles respectifs. Elle renvoie un tableau associatif contenant deux tableaux :
     * un pour les utilisateurs et l'autre pour les rôles. Chaque utilisateur est une instance de la classe 'Users',
     * et chaque rôle est une instance de la classe 'Role'.
     *
     * @return array Renvoie un tableau associatif avec deux clés : 'users' et 'roles'.
     *               - 'users' est un tableau d'objets 'Users'.
     *               - 'roles' est un tableau d'objets 'Role', indexé par l'id du rôle.
     * @throws PDOException Si une erreur survient lors de la requête à la base de données.
    */

//Extraire la liste des utilisateurs et leur rôle
    public function getAllUsersWithRoles() :array {

        try {

            $db = $this->getBdd();
            $req = "SELECT u.id_user, u.first_name, u.last_name, u.user_email, r.id_role, r.role_name 
                    FROM users u 
                    JOIN roles r 
                    ON u.role_id = r.id_role";

            $stmt = $db->prepare($req);
            $stmt->execute();
            $usersData = $stmt->fetchAll(PDO::FETCH_ASSOC);
          

            $users = [];
            
            foreach ($usersData as $userData) {
                $user = [
                    'idUser' => $userData['id_user'],
                    'firstName' => $userData['first_name'],
                    'lastName' => $userData['last_name'],
                    'userEmail' => $userData['user_email'],
                    'roleId' => $userData['id_role'],
                    'roleName' => $userData['role_name']
                ];
                $users[] = $user;
            }
            
            return ['status' => 'success', 'data' => $users];
          
        } catch (PDOException $e) {

            $this->handleException($e, "extraction liste des horaires d'ouverture");
        }
    }


    /**
     * Ajoute un nouvel utilisateur dans la base de données.
     *
     * @param string $firstName Prénom de l'utilisateur.
     * @param string $lastName Nom de famille de l'utilisateur.
     * @param string $userEmail Email de l'utilisateur.
     * @param string $hashedPassword Mot de passe haché de l'utilisateur.
     * @param int $roleId Identifiant du rôle de l'utilisateur.
     * @return bool Renvoie vrai si l'ajout a réussi, faux sinon.
     */

    public function addUser(string $firstName, string $lastName, string $userEmail, string $hashedPassword, int $roleId) : bool {

        try {

            $db = $this->getBdd();
            $req = "INSERT INTO users (first_name, last_name, user_email, user_password, role_id) 
                    VALUES (:firstName, :lastName, :userEmail, :userPassword, :roleId)";

            $stmt = $db->prepare($req);

            $stmt->bindValue(":firstName", $firstName, PDO::PARAM_STR);
            $stmt->bindValue(":lastName", $lastName, PDO::PARAM_STR);
            $stmt->bindValue(":userEmail", $userEmail, PDO::PARAM_STR);
            $stmt->bindValue(":userPassword", $hashedPassword, PDO::PARAM_STR);
            $stmt->bindValue(":roleId", $roleId, PDO::PARAM_INT);

            $result = $stmt->execute();
            return $result;

        } catch (PDOException $e) {
            $this->handleException($e, "ajout d'un nouvel utilisateur");
            return false;
        }
    }


     /**
     * Met à jour les informations d'un utilisateur existant dans la base de données.
     *
     * @param int $userId Identifiant de l'utilisateur à mettre à jour.
     * @param string $firstName Nouveau prénom de l'utilisateur.
     * @param string $lastName Nouveau nom de l'utilisateur.
     * @param string $userEmail Nouvel email de l'utilisateur.
     * @param int $roleId Nouvel identifiant de rôle de l'utilisateur.
     * @return bool Renvoie vrai si la mise à jour a réussi, faux sinon.
     */

    public function updateUser(int $userId, string $firstName, string $lastName, string $userEmail, int $roleId) : bool {
        try {
            $db = $this->getBdd();
            $req = "UPDATE users 
                    SET first_name = :firstName, last_name = :lastName, user_email = :userEmail, role_id = :roleId 
                    WHERE id_user = :userId";

            $stmt = $db->prepare($req);

            $stmt->bindValue(":userId", $userId, PDO::PARAM_INT);
            $stmt->bindValue(":firstName", $firstName, PDO::PARAM_STR);
            $stmt->bindValue(":lastName", $lastName, PDO::PARAM_STR);
            $stmt->bindValue(":userEmail", $userEmail, PDO::PARAM_STR);
            $stmt->bindValue(":roleId", $roleId, PDO::PARAM_INT);

            $result = $stmt->execute;
            return $result;

        } catch (PDOException $e) {
            $this->handleException($e, "mise à jour de l'utilisateur");
            return false;
        }
    }


     /**
     * Supprime un utilisateur de la base de données.
     *
     * @param int $idUser L'ID de l'utilisateur à supprimer.
     * @return bool Renvoie vrai si la suppression a réussi, faux sinon.
     */

    public function deleteUser($idUser) :bool {
        try {

            $db = $this->getBdd();
            $req = "DELETE FROM users WHERE id_user = :idUser";

            $stmt = $db->prepare($req);

            $stmt->bindValue(":idUser", $idUser, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->rowCount() > 0;

        } catch(PDOException $e) {
            $this->handleException($e, "suppression d'un utilisateur");
            return false;
        }
    }


    /**
     * Met à jour le mot de passe d'un utilisateur.
     *
     * @param int $idUser L'ID de l'utilisateur dont le mot de passe doit être mis à jour.
     * @param string $hashedPassword Le nouveau mot de passe haché.
     * @return bool Renvoie vrai si la mise à jour a réussi, faux sinon.
     */

    public function updateUserPassword(string $userEmail, string $hashedPassword) : bool {
        try {

            $db = $this->getBdd();
            $req = "UPDATE users SET user_password = :userPassword WHERE user_email = :userEmail";

            $stmt = $db->prepare($req);

            $stmt->bindValue(":userPassword", $hashedPassword, PDO::PARAM_STR);
            $stmt->bindValue(":userEmail", $userEmail, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->rowCount() > 0;

        } catch (PDOException $e) {
            $this->handleException($e, "mise à jour du mot de passe de l'utilisateur");
            return false;
        }
    }


     /**
     * Vérifie si un email existe déjà dans la base de données.
     *
     * @param string $email L'email à vérifier.
     * @return bool Renvoie vrai si l'email existe, faux sinon.
     */

    public function doesEmailExist(string $email) : bool {
        try {

            $db = $this->getBdd();
            $req = "SELECT COUNT(1) FROM users WHERE user_email = :email";

            $stmt = $db->prepare($req);

            $stmt->bindValue(":email", $email, PDO::PARAM_STR);
            $stmt->execute();
            
            return $stmt->fetchColumn() > 0;
            
        } catch (PDOException $e) {
            $this->handleException($e, "vérification de l'existence de l'email");
            return false;
        }
    }


    /**
     * Récupère les informations d'un utilisateur par son identifiant.
     *
     * Cette méthode interroge la base de données pour extraire les informations d'un utilisateur spécifique
     * identifié par son ID. Elle récupère également les informations sur le rôle associé à cet utilisateur.
     * Les données sont renvoyées sous forme d'un tableau associatif contenant l'ID de l'utilisateur, son email,
     * l'ID de son rôle, et le nom du rôle.
     *
     * @param int $userId L'identifiant de l'utilisateur à rechercher.
     * @return array|null Renvoie un tableau associatif contenant les données de l'utilisateur et de son rôle
     *                    si l'utilisateur est trouvé, ou null si aucun utilisateur n'est trouvé.
     * @throws PDOException Si une erreur survient lors de la requête à la base de données.
    */

      //Get user by ID
      public function getUserByID($userId) {
        
        try {

            $db = $this->getBdd();
            $req = "SELECT u.id_user, u.user_email, r.id_role, r.role_name 
                    FROM users u 
                    JOIN roles r 
                    ON u.role_id = r.id_role
                    WHERE u.id_user = :userId";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":userId", $userId, PDO::PARAM_INT);
            $stmt->execute();
    
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
            return $user;

        } catch (PDOException $e) {

            $this->handleException($e, "recherche de l'utilisateur.");
        }
       
    }

    /**
     * Récupère les informations d'un utilisateur par son adresse email.
     *
     * Cette méthode interroge la base de données pour trouver un utilisateur spécifique par son adresse email.
     * Elle renvoie les informations de cet utilisateur, y compris son identifiant, son mot de passe (généralement haché),
     * et le nom de son rôle. La méthode utilise une jointure LEFT JOIN pour récupérer les informations du rôle associé à l'utilisateur.
     *
     * @param string $userEmail L'adresse email de l'utilisateur à rechercher.
     * @return array|null Renvoie un tableau associatif contenant les informations de l'utilisateur, 
     *                    y compris son mot de passe, identifiant et rôle, si l'utilisateur est trouvé.
     *                    Renvoie null si aucun utilisateur correspondant n'est trouvé.
     * @throws PDOException Si une erreur survient lors de la requête à la base de données.
    */

    //Get user by Email 
    public function getUserByEmail($userEmail) {

        try {
            
            $db = $this->getBdd();
            $req = "SELECT users.id_user, users.user_password, roles.role_name
                    FROM users
                    LEFT JOIN roles
                    ON users.role_id = roles.id_role
                    WHERE user_email = :email";
            $stmt = $db->prepare($req);
            $stmt->bindValue(':email', $userEmail, PDO::PARAM_STR);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if(!$user) {
                return null;
            }

            return [
                  "user_password" => $user["user_password"],
                  "id_user" => $user["id_user"],
                  "role_name" => $user["role_name"]
            ];

        } catch(PDOException $e) {

            $this->handleException($e, "recherche de l'utilisateur");
        }

    }





}