<?php

require_once './vparrot-server/models/Users.php';
require_once './vparrot-server/Validator/Validator.php';
require_once './vparrot-server/repository/UserRepository.php';
require_once './vparrot-server/util/SecurityUtil.php';
require_once './vparrot-server/util/EmailService.php';
require_once './vparrot-server/models/AuthModel.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class UsersController {

    private $validator;
    private $users;
    private $userRepository;
    private $emailService;
    private $authModel;

    public function __construct(UserRepository $userRepository, Validator $validator, EmailService $emailService, AuthModel $authModel) {
        $this->validator = $validator;
        $this->userRepository = $userRepository;
        $this->emailService = $emailService;
        $this->authModel = $authModel;
    }



    //formatage de la réponse json
    private function sendResponse($data, $statusCode = 200) {

        header("Content-Type: application/json");
        http_response_code($statusCode);
        echo json_encode($data);

    }

    //Obtenir la liste des utilisateurs et leur role
    public function getAllUsersList() {
        try {

            $userData = $this->userRepository->getAllUsersWithRoles();

            if(empty($userData)) {
                $this->sendResponse(['status' => 'error', 'message' => 'Aucuns utilisateurs trouvés']);
                return;
            }

            $formattedUsers = [];

            foreach ($userData['data'] as $user) {
                $formattedUsers[] = [
                    "idUser" => $user['idUser'],
                    "firstName" => $user['firstName'],
                    "lastName" => $user['lastName'],
                    "userEmail" => $user['userEmail'],
                    "roleId" => $user['roleId'],
                    "roleName" => $user['roleName']
                ];
            }
    
            $this->sendResponse(['status' => 'success', 'data' => array_values($formattedUsers)]);
        } catch (Exception $e) {

            $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }

    //Création d'un nouvel utilisateur
    public function addThisUser() {

        // Recupérer les données envoyé par l'utilisateur
        $data = json_decode(file_get_contents('php://input'), true);

        //Valider le format json obtenu
        if (!$this->validator->validateJsonFormat($data)) {

            $this->sendResponse($this->validator->getErrors(), 400);
            return;
        }

            //Vérifier si toute les clés sont présente
        $requireKeys =["first_name", "last_name", "user_email", "user_password", "role_id"];
        foreach ($requireKeys as $key) {
            if (!isset($data[$key])) {

                $this->sendResponse(["status" => "error", "message" => "La clé $key est manquante"], 400);
                return;
            }
        }

        //Assigne les données à des variable
        $firstName = $data["first_name"];
        $lastName = $data["last_name"];
        $userEmail = $data["user_email"];
        $userPassword = $data['user_password'];
        $roleId = $data["role_id"];

        //validation des données
        $validFirstName = $this->validator->validateStringForNames($firstName, "prénom");
        $validLastName = $this->validator->validateStringForNames($lastName, "nom");
        $validUserEmail = $this->validator->validateEmail($userEmail);
        $validUserPassword = $this->validator->validatePassword($userPassword);

        if(!$validLastName || !$validFirstName || !$validUserEmail || !$validUserPassword) {

            $errors = $this->validator->getErrors();
            $this->sendResponse(["status" => "error", "message" => $errors], 400);
            return;
        }

    
        //Contrôle si l'email existe
        if($this->users->doesEmailExists($userEmail)) {

            $this->sendResponse(["status" => "error", "message" => "L'adresse e-mail existe déjà."]);
            return;
         }

        //Hash du mot de passe
        $hashedPassword = password_hash($userPassword, PASSWORD_DEFAULT);

        try {

            if ($this->userRepository->addUser($firstName, $lastName, $userEmail, $userPassword, $roleId)) {
                $this->sendResponse(["status" => "success", "message" => "Utilisateur créé avec succès"], 200);

            } else {
                $this->sendResponse(["status" => "error", "message" => "Échec de l'ajout de l'utilisateur"], 500);
                        
            }

        } catch( Exception $e) {

            $this->sendResponse(["status" => "error", "message" => $e->getMessage()], 500);
        }
        
    }

    //Mise à jour utilisateur
    public function updateThisUser(int $idUser) {

        //Récupération des données du formulaire
        $data = json_decode(file_get_contents('php://input'), true);

        //Validation du format json
        if (!$this->validator->validateJsonFormat($data)) {

            $this->sendResponse($this->validator->getErrors(), 400);
            return;
        }

        $requireKeys =["first_name", "last_name", "user_email", "role_id"];
            foreach ($requireKeys as $key) {
                if (!isset($data[$key])) {

                    $this->sendResponse(["status" => "error", "message" => "La clé $key est manquante"], 400);
                    return;
                }
            }

    
        $firstName = $data["first_name"];
        $lastName = $data["last_name"];
        $userEmail = $data["user_email"];
        $roleId = $data["role_id"];

        //Validation du format des données
        $validFirstName = $this->validator->validateStringForNames($firstName, "prénom");
        $validLastName = $this->validator->validateStringForNames($lastName, "nom");
        $validUserEmail = $this->validator->validateEmail($userEmail);

        if(!$validLastName || !$validFirstName || !$validUserEmail) {

            $errors = $this->validator->getErrors();
            $this->sendResponse(["status" => "error", "message" => $errors], 400);
            return;
          }

        // Vérifie si l'utilisateur existe avant la mise  jour
        if(!$this->users->doesUserExist($idUser)) {
            $this->sendResponse(["status" => "error", "message" => "L'utilisateur n'existe pas."], 404); // 404 Not Found
            return;
        }

        // Vérifie si l email est déja utilisé par un autre utilisateur
        if($this->users->doesEmailExists($userEmail, $idUser)) {

            $this->sendResponse(["status" => "error", "message" => "L'adresse e-mail est déjà utilisée par un autre utilisateur."]);
            return;
        }

        try {

            if ($this->userRepository->updateUser($idUser, $firstName, $lastName, $userEmail, $roleId)) {
                $this->sendResponse(["status" => "success", "message" => "Utilisateur mis à jour avec succès"], 200);

            } else {
                $this->sendResponse(["status" => "error", "message" => "Échec de la mise à jour de l'utilisateur"], 500);
                        
            }

        } catch(Exception $e) {
            $this->sendResponse(["status" => "error", "message" => $e->getMessage()], 500);
        }
    }


     /**
     * Gère la demande de réinitialisation du mot de passe.
     *
     * @param string $email Email de l'utilisateur demandant la réinitialisation.
     */
    public function requestPasswordReset() {

         // Récupération des données envoyées par le client
        $data = json_decode(file_get_contents('php://input'), true);

        // Vérification si l'adresse email est fournie dans les données
        if (!isset($data['email'])) {
            // Si l'adresse email n'est pas fournie, renvoyer une réponse d'erreur
            $this->sendResponse(["status" => "error", "message" => "L'adresse email est manquante"], 400);
            return;
        }

        // Récupération de l'adresse email depuis les données
        $email = $data['email'];
        $captchaToken = $data['captchaToken'];

        //validation des formats
        $validUserEmail = $this->validator->validateEmail($email);
        $validCaptchaToken = $this->validator->verifyGoogleCaptcha($captchaToken);

        if(!$validUserEmail) {

            $errors = $this->validator->getErrors();
            $this->sendResponse(["status" => "error", "message" => $errors], 400);
            return;
        }

        if(!$validCaptchaToken) {
            $errors = $this->validator->getErrors();
            $this->sendResponse(['status' => 'error', 'message' => $errors], 401);
            return;

        }


        //vérification si l'utilisateur existedans la bdd
        $user = $this->userRepository->doesEmailExist($email);

        if(!$user) {

            $this->sendResponse(['message' => 'Si votre email est reconnue, un email de réinitialisation de mot de passe vous sera envoyé. ']);
            return;
        }

        //Générer un token de réinitialisation
        $issuedAt = time();
        $expirationTime = $issuedAt + (20*60);

        $payload = [
            'iat' => $issuedAt,
            'exp' => $expirationTime
        ];

        $jwt = JWT::encode($payload, $_ENV['SECRET_KEY'], "HS256");

        //Création du lien de renouvellement de mot de passe 
        $resetLink = FRONT_BASE_PATH . "reset-password?token=$jwt";

        //Préparation de l'email 
        $to = $email;
        $subject = "Réinitialisation de votre mot de passe";
        $body = "Vous avez demandé la réinitialisation de votre mot de passe, cliquez sur le lien suivant pour accéder à la page de réinitialisation : <a href='{$resetLink}'>Réinitialiser mon mot de passe</a>
                Ce lien n'est valable que pour 20 minutes.";
        $isHTML = true;

        try {
        
            //Utilisation du service email pour envoi du mail de changement de mot de passe
            $this->emailService->sendEmail($to, $subject, $body, $isHTML);
            $this->sendResponse(["message" => "Un email de réinitialisation de mot de passe a étét envoyé. "]);   
        } catch (Exception $e) {

            $this->sendResponse(["status" => "error", "message" => $e->getMessage()], 500);
        }
    }


    public function resetPassword() {

        
        try {

            $data = json_decode(file_get_contents('php://input'), true);
            //Vérifie la présence des données nécéssaires
            if(!isset($data['email']) || !isset($data['newPassword']) || !isset($data['captchaValue']) || !isset($data['token'])) {
                $this->sendResponse(["status" => "error", "message"=> "Donnée incomplète pour le changement du mot de passe"]);
                return;
            }

            $email = $data['email'];
            $newPassword = $data['newPassword'];
            $captchaToken = $data['captchaValue'];
            $token = $data['token'];

            $decoded = JWT::decode($token, new Key($_ENV['SECRET_KEY'], 'HS256'));

        // Vérification de l'expiration du token
        if (time() > $decoded->exp) {
            $this->sendResponse(["status" => "error", "message" => "Le token de réinitialisation a expiré"], 401);
            return;
        }
           
            

            //Vérifier le format de l'email
            if(!$this->validator->validateEmail($email)) {
                $this->sendResponse(["status" => "error", "message"=> "Le format d'email est invalide."], 400);
                return;
            }

            //Vérifier le format du mot de passe
            if(!$this->validator->validatePassword($newPassword)) {
                $this->sendResponse(["status" => "error", "message"=> "Le format du mot de passe est invalide. "], 400);
                return;
            }

            //vérifier le captcha
            if (!$this->validator->verifyGoogleCaptcha($captchaToken)) {
                $this->sendResponse(["status" => "error", "message" => "Échec de la validation du CAPTCHA"], 400);
                return;
            }


            //Vérifier si l'email existe dans la base de donnée 
            if(!$this->userRepository->doesEmailExist($email)) {
                $this->sendResponse(["status" => "error", "message"=> "L'utilisateur n'existe pas."], 404);
                return;
            }

           
            //Hashage du nouveau mot de passe
            $hashednewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $passwordChanged = $this->userRepository->updateUserPassword($email, $hashednewPassword);

            if(!$passwordChanged) {
                $this->sendResponse(["status" => "error", "message"=> "impossible de changer le mot de passe. "], 500);
                return;
            }

            //Préparation de l'email envoyé à l'utilisateur
            $to = $email;
            $subject = "Changement de votre mot de passe.";
            $body = "Votre mot de passe vient d'être changé. Si vous n'avez pas effectué cette modification, veuillez contacter votre administrateur.";
            $isHTML = true;

            //Envoi de l'email à l'utilisateur
            $this->emailService->sendEmail($to, $subject, $body, $isHTML);
            
            $this->sendResponse(["status" => "success", "message" => "Mot de passe changé avec succès"]);
        } catch (Exception $e) {

            $this->sendResponse(["status" => "error", "message" => "Erreur lors du changement de mot de passe: " . $e->getMessage()], 500);
        }
    }
   
}