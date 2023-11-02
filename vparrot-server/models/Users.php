<?php

require_once 'Database.php';

class Users extends Database {

    private ?int $idUser = null;
    private ?string $firstName = null;
    private ?string $lastName = null;
    private ?string $userEmail = null;
    private ?string $userPassword = null;
    private ?int $roleId = null;

    public function __construct(?string $firstName = null, ?string $lastName = null, ?string $userEmail = null, ?string $userPassword = null, ?string $roleId = null, ?int $idUser = null) {

        $this->idUser = $idUser;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->userEmail = $userEmail;
        $this->userPassword = $userPassword;
        $this->roleId = $roleId;

    }
    
    //Getters list
    public function getIdUser() : int {
        return $this->idUser;
    }

    public function getFirstName() :string {
        return $this->firstName;
    } 

    public function getLastName() :string {
        return $this->lastName;
    }

    public function getUserEmail() :string {
        return $this->userEmail;
    }

    public function getUserPassword() :string {
        return $this->userPassword;
    }

    public function getRoleId() :int {
        return $this->roleId;
    }

    //Setters list
    public function setFirstName(string $firstName) :void {
        $this->firstName = $firstName;
        
    }

    public function setLastName(string $lastName) :void {
        $this->lastName = $lastName;
    }

    public function setUserEmail(string $userEmail) :void {
        $this->userEmail = $userEmail;
    }

    public function setUserPassword(string $userPassword) :void {
        $this->userPassword = $userPassword;
    }

    public function setRoleId(int $roleId) :void {
        $this->roleId = $roleId;
    }

    //CRUD Method

    //GET all users
    public function getAllUsers() :array {

        try {

            $db = $this->getBdd();
            $req = "SELECT u.id_user, u.first_name, u.last_name, u.user_email, r.id_role, r.role_name 
                    FROM users u 
                    JOIN roles r 
                    ON u.role_id = r.id_role";

            $stmt = $db->prepare($req);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $users;

        } catch(PDOException $e) {

            $this->handleException($e, "extraction des utilisateurs");
        }
    }

    //CREATE new user 
    public function addUser(string $firstName, string $lastName, string $userEmail, string $userPassword, int $roleId ) :bool {
        try {

            $db = $this->getBdd();
            $req = "INSERT INTO users (first_name, last_name, user_email, user_password, role_id) 
                    VALUE (:firstName, :lastName, :userEmail, :userPassword, :roleId)";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":firstName", $firstName, PDO::PARAM_STR);
            $stmt->bindValue(":lastName", $lastName, PDO::PARAM_STR);
            $stmt->bindValue(":userEmail", $userEmail, PDO::PARAM_STR);
            $stmt->bindValue(":userPassword", $userPassword, PDO::PARAM_STR);
            $stmt->bindValue(":roleId", $roleId, PDO::PARAM_INT);
            $result = $stmt->execute();

            return $result;

        } catch(PDOException $e) {

            $this->handleException($e, "création d'un utilisateur");
        }
    }

    //UPDATE USER
    public function updateUser(int $idUser, string $firstName, string $lastName, string $userEmail, int $roleId) {

        try {

            $db = $this->getBdd();
            $req = "UPDATE users 
                    SET first_name = :firstName, last_name = :lastName, user_email = :userEmail, role_id = :roleId 
                    WHERE id_user = :idUser";

            $stmt = $db->prepare($req);
            $stmt->bindValue(":firstName", $firstName, PDO::PARAM_STR);
            $stmt->bindValue(":lastName", $lastName, PDO::PARAM_STR);
            $stmt->bindValue(":userEmail", $userEmail, PDO::PARAM_STR);
            $stmt->bindValue(":roleId", $roleId, PDO::PARAM_INT);
            $stmt->bindValue(":idUser", $idUser, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->rowCount() > 0;

        } catch(PDOException $e) {

            $this->handleException($e, "mise à jour d'un utilisateur");
        }
    }

    //DELETE user
    public function deleteUser($idUser) :bool {

        try {

            $db = $this->getBdd();
            $req = "DELETE FROM users WHERE idUser = :idUser";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":idUser", $idUser, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->rowCount() > 0;

        } catch(PDOException $e) {

            $this->handleException($e, "suppression d'un utilisateur");
        }
    }


    //Check if user exists
    public function doesUserExist(int $idUser) :bool {

        try {

            $db = $this->getBdd();
            $req = "SELECT 1 FROM users WHERE id_user = :userId";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":userId", $idUser, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetchColumn() !== false;

        } catch(PDOException $e) {

            $this->handleException($e, "vérification de l'existance d'un utilisateur");
        }
    }
   
    //Check if email existe
    public function doesEmailExists(string $email, int $excludeUserId = null) :bool {

        try {

            $db = $this->getBdd();
            $req = "SELECT 1 FROM users WHERE user_email = :userEmail";

            if ($excludeUserId !== null) {
                $req .= " AND id_user != :excludeUserId";
            }

            $stmt = $db->prepare($req);
            $stmt->bindValue(":userEmail", $email, PDO::PARAM_STR);

            if ($excludeUserId !== null) {
                $stmt->bindValue(":excludeUserId", $excludeUserId, PDO::PARAM_INT);
            }

            $stmt->execute();

            return $stmt->fetchColumn() !== false;

        } catch(PDOException $e) {

            $this->handleException($e, "vérification d'existance d'un e-mail");

        }

    }


}