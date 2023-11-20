<?php

require_once './vparrot-server/models/AuthModel.php';
require_once './vparrot-server/Validator/Validator.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

class AuthController {

    private $validator;
    private $authModel;
    private $usersModel;

    public function __construct($validator, $authModel, $usersModel) {
        $this->validator = $validator;
        $this->authModel = $authModel;
        $this->usersModel = $usersModel;
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
            $captchaToken = $data['captchaToken'];

            //Data validation
            $validUserEmail = $this->validator->validateEmail($userEmail);
            $validUserPassword = $this->validator->validatePassword($userPassword);
            $validCaptchaToken = $this->validator->verifyGoogleCaptcha($captchaToken);

            if(!$validUserEmail || !$validUserPassword) {

                $errors = $this->validator->getErrors();
                $this->sendResponse(["status" => "error", "message" => $errors], 400);
                return;
            }

            if(!$validCaptchaToken) {
                $errors = $this->validator->getErrors();
                $this->sendResponse(['status' => 'error', 'message' => $errors], 401);

            }

            //Retrieve User
            $user = $this->usersModel->getUserByEmail($userEmail);

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
            $csrfToken = $jwtData['csrf_token'];

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
                ],
                "csrf_token" => $csrfToken  
            ]);

        } catch(Exception $e) {
            $this->sendResponse(["status" => "error", "message" => $e->getMessage()], 500);

        }
    }

    //Logout Method
    public function logout() {
        try {
            if (isset($_COOKIE["token"])) {

                unset($_COOKIE["token"]);
                setcookie("token", '', [
                    "expires" => time() - 3600, // Heure dans le passé pour effacer le cookie
                    "path" => '/',
                    "domain" => "", // Ajustez si nécessaire
                    "secure" => true,
                    "httponly" => true,
                    "samesite" => 'None', // Important si vous utilisez samesite
                ]);
                $this->sendResponse(["status" => "success", "message" => "Déconnexion réussie."]);
            } else {

                $this->sendResponse(["status" => "error", "message" => "Aucun utilisateur n'est connecté."], 401);
            }
        } catch (Exception $e) {
            
            $this->sendResponse(["status" => "error", "message" => $e->getMessage()], 500);
        }
    }

    //Check Session Method
    public function checkSession() {
        try {

            if (isset($_COOKIE["token"])) {
                // Vérifier le token du cookie
                $token = $_COOKIE["token"];
                // Décoder le JWT 
                $secretKey = $_ENV['SECRET_KEY'];
                $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
                
                // Vérifiez que le token n'est pas expiré et que les données de l'utilisateur sont toujours valides
                $userId = $decoded->id_user;
                $user = $this->usersModel->getUserById($userId);
                if ($user) {

                    //Récuperer le csrf du token JWT
                    $csrfToken = $decoded->csrf_token;

                    // Renvoyer le role l'Id et le token csrf
                    $responseUser = [
                        "id" => $user["id_user"],
                        "role" => $user["role_name"],
                        "csrfToken" => $csrfToken
                    ];
                    $this->sendResponse(['status' => 'success', 'user' => $responseUser]);
                } else {
                    // Répondre avec une erreur si l'utilisateur n'existe plus dans la base de données
                    $this->sendResponse(['status' => 'error', 'message' => 'Session non valide ou utilisateur inexistant.'], 401);
                }
            } else {
                // Répondre avec une erreur si aucun token n'est trouvé
                $this->sendResponse(['status' => 'error', 'message' => 'Aucun token trouvé.'], 401);
            }
        } catch (ExpiredException $e) {
            // Gérer l'exception si le token est expiré
            $this->sendResponse(['status' => 'error', 'message' => 'Session expirée.'], 500);
        } catch (Exception $e) {
            // Gérer toute autre exception
            $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }


}


