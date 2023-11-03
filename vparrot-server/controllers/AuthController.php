<?php

require_once './vparrot-server/models/AuthModel.php';
require_once './vparrot-server/Validator/Validator.php';

use Firebase\JWT\JWT;

class AuthController {

    private $validator;
    private $authModel;

    public function __construct($validator, $authModel) {
        $this->validator = $validator;
        $this->authModel = $authModel;
    }

    //Setting Response
    private function sendResponse($data, $statusCode = 200) {

        header("Content-Type: application/json");
        http_response_code($statusCode);
        echo json_encode($data);
  }

  //Login method
    public function login() {

        try {

            // Retrieve data sent by the client
            $data = json_decode(file_get_contents('php://input'), true);
            error_log(print_r($data, true));

            //Validate json data format
            if (!$this->validator->validateJsonFormat($data)) {

                $this->sendResponse($this->validator->getErrors(), 400);
                return;
            }

            //Check if all the necessary keys are present
            $requireKeys =["user_email", "user_password"];
                foreach ($requireKeys as $key) {
                    if (!isset($data[$key])) {

                        $this->sendResponse(["status" => "error", "message" => "La clé $key est manquante"], 400);
                        return;
                    }
                }

            //Assign Data to Variables
            $userEmail = $data["user_email"];
            $userPassword = $data["user_password"];

            //Data validation
            $validUserEmail = $this->validator->validateEmail($userEmail);
            $validUserPassword = $this->validator->validatePassword($userPassword);

            if(!$validUserEmail || !$validUserPassword) {

                $errors = $this->validator->getErrors();
                $this->sendResponse(["status" => "error", "message" => $errors], 400);
                return;
            }

            //Retrieve User
            $user = $this->authModel->getUserByEmail($userEmail);

            //Verify user and password
            if(!$user || !password_verify($userPassword, $user["user_password"])) {

                $this->sendResponse(['status' => 'error', 'message' => "L'utilisateur n'existe pas."], 401);
                return;
            }

            //Assign user id and user role variable
            $userId = $user["id_user"];
            $roleName = $user["role_name"];

            //Get JWT Token for user
            $jwtData = $this->authModel->createJWTForUser($user);

            $jwt = $jwtData["jwt"];
            $expiryTime = $jwtData["exp"];

            //Create cookie
            setcookie("token", $jwt, [
                "expires" => $expiryTime,
                "path" => '/',
                "domain" => "",
                "secure" => true,
                "httponly" => true,
                "samesite" => 'None',
            ]);

            $this->sendResponse([
                "status" => "success", 
                "message" => "Connexion réussie.",
                "user" => [
                    "id" => $userId,
                    "role" => $roleName
                ]  
            ]);

        } catch(Exception $e) {
            $this->sendResponse(["status" => "error", "message" => $e->getMessage()]);

        }
    }

    //Logout Method
    public function logout() {
        try {
            if (isset($_COOKIE["token"])) {

                unset($_COOKIE["token"]);
                setcookie("token", null, -1, "", true, true);
                $this->sendResponse(["status" => "success", "message" => "Déconnexion réussie."]);
            } else {

                $this->sendResponse(["status" => "error", "message" => "Aucun utilisateur n'est connecté."], 401);
            }
        } catch (Exception $e) {
            
            $this->sendResponse(["status" => "error", "message" => $e->getMessage()]);
        }
    }


}


