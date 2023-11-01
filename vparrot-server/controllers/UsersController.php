<?php

require_once './vparrot-server/models/Users.php';
require_once './vparrot-server/Validator/Validator.php';

class UsersController {

    private $validator;
    private $users;

    public function __construct($validator, $users) {
        $this->validator = $validator;
        $this->users = $users;
    }



    //Setting Response
    private function sendResponse($data, $statusCode = 200) {

      header("Content-Type: application/json");
      http_response_code($statusCode);
      echo json_encode($data);

    }

    //Get all users list
    public function getAllUsersList() {
        $data = $this->users->getAllUsers();
        $this->sendResponse($data);
    }

    //Create new user 
    public function addThisUser() {

            // Retrieve data sent by the client
            $data = json_decode(file_get_contents('php://input'), true);

            //Validate json data format
            if (!$this->validator->validateJsonFormat($data)) {

              $this->sendResponse($this->validator->getErrors(), 400);
              return;
            }

            //Check if all the necessary keys are present
            $requireKeys =["first_name", "last_name", "user_email", "user_password", "role_id"];
            foreach ($requireKeys as $key) {
                if (!isset($data[$key])) {

                    $this->sendResponse(["status" => "error", "message" => "La clé $key est manquante"], 400);
                    return;
                }
            }

            //Assign Data to Variables
            $firstName = $data["first_name"];
            $lastName = $data["last_name"];
            $userEmail = $data["user_email"];
            $userPassword = $data['user_password'];
            $roleId = $data["role_id"];

            //Data validation
            $validFirstName = $this->validator->validateStringForNames($firstName, "prénom");
            $validLastName = $this->validator->validateStringForNames($lastName, "nom");
            $validUserEmail = $this->validator->validateEmail($userEmail);
            $validUserPassword = $this->validator->validatePassword($userPassword);

            if(!$validLastName || !$validFirstName || !$validUserEmail || !$validUserPassword) {

              $errors = $this->validator->getErrors();
              $this->sendResponse(["status" => "error", "message" => $errors], 400);
              return;
            }

    
                //Check if e-mail exists
            if($this->users->doesEmailExists($userEmail)) {

                $this->sendResponse(["status" => "error", "message" => "L'adresse e-mail existe déjà."]);
                return;
            }

            //Hash password
            $hashedPassword = password_hash($userPassword, PASSWORD_DEFAULT);

            try {

                $this->users->setFirstName($firstName);
                $this->users->setLastName($lastName);
                $this->users->setUserEmail($userEmail);
                $this->users->setUserPassword($hashedPassword);
                $this->users->setRoleId($roleId);

                if ($this->users->addUser()) {
                    $this->sendResponse(["status" => "success", "message" => "Utilisateur créé avec succès"], 200);

                } else {
                    $this->sendResponse(["status" => "error", "message" => "Échec de l'ajout de l'utilisateur"], 500);
                        
                }

            } catch( Exception $e) {

                $this->sendResponse(["status" => "error", "message" => $e->getMessage()], 500);
            }
        
    }


}