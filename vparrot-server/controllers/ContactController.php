<?php

require_once './vparrot-server/models/Contact.php';
require_once './vparrot-server/Validator/Validator.php';
require_once './vparrot-server/repository/ContactRepository.php';
require_once './vparrot-server/util/EmailService.php';

class ContactController {

    private $validator;
    private $contactRepository;

    public function __construct(contactRepository $contactRepository, Validator $validator) {

        $this->validator = $validator;
        $this->contactRepository = $contactRepository;

    }

    private function sendResponse($data, $statusCode = 200) {

      header("Content-Type: application/json");
      http_response_code($statusCode);
      echo json_encode($data);
    }


    //Obtenir la liste de tout les contacts à traiter
    public function getContactList() {

        try {

            $contacts = $this->contactRepository->getAllContact();

            $contactsArray = array_map(function ($contact) {
                return [
                    'idContact' => $contact->getId(),
                    'firstName' => $contact->getFirstName(),
                    'lastName' => $contact->getLastName(),
                    'phone' => $contact->getPhone(),
                    'email' => $contact->getEmail(),
                    'contactSubject' => $contact->getSubject(),
                    'content' => $contact->getContent(),
                    'isTreated' => $contact->getIsTreated()
                ];
            }, $contacts);

            $this->sendResponse(['status' => 'success', 'data' => $contactsArray]);


        } catch (Exception $e) {

          $this->sendResponse(['error' => $e->getMessage()], 400);
        }
    }


    public function createContact() {

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->sendResponse(["status" => "error", "message" => "Méthode non autorisée"], 405);
            return;
        }

        // Récupère les données envoyées
        $data = json_decode(file_get_contents('php://input'), true);

        //Vérifie si le format json est valide
        if (!$this->validator->validateJsonFormat($data)) {

            $this->sendResponse($this->validator->getErrors(), 400);
                return;
        }


        //Vérifie si toute les clés sont présentes
        $requireKeys =["firstName", "lastName", "phone", "email", "subject", "content", "recaptchaResponse"];
            foreach ($requireKeys as $key) {
                if (!isset($data[$key])) {
                    $this->sendResponse(["status" => "error", "message" => "La clé $key est manquante"], 400);
                    return;
                }
            }

        //Assigne les données aux variables
        $lastName = $data['lastName'];
        $firstName = $data['firstName'];
        $phone = $data['phone'];
        $email = $data['email'];
        $subject = $data['subject'];
        $content = $data['content'];
        $captchaToken = $data['recaptchaResponse'];

        // Vérifier la réponse du CAPTCHA
        if (!$this->validator->verifyGoogleCaptcha($captchaToken)) {
            $this->sendResponse(["status" => "error", "message" => $this->validator->getErrors()], 400);
            return;
        }

        //Validation des données
        $validLastName = $this->validator->validateStringForNames($lastName, 'nom');
        $validFirstName = $this->validator->validateStringForNames($firstName, 'prénom');
        $validPhone = $this->validator->validatePhoneNumber($phone, 'numéro de téléphone');
        $validEmail = $this->validator->validateEmail($email, 'email');
        $validSubject = $this->validator->validateMediumContent($subject, 'sujet du mail', 10, 100);
        $validContent = $this->validator->validateMediumContent($content, 'message', 20, 400);

        if(!$validLastName || !$validFirstName || !$validPhone || !$validEmail || !$validSubject || !$validContent) {
            $errors = $this->validator->getErrors();
            $this->sendResponse(["status" => "error", "message" => $errors], 400);
            return;
        }

        //Instance de contact pour l'ajout d'un nouveau contact 
        $contact = new Contact();
        $contact->setLastName($lastName);
        $contact->setFirstName($firstName);
        $contact->setPhone($phone);
        $contact->setEmail($email);
        $contact->setSubject($subject);
        $contact->setContent($content);

        try {

            if ($this->contactRepository->addContact($contact)) {
                $emailService = new EmailService();
        
                // Envoi d'un email de confirmation au client
                if (!empty($email)) {
                    $clientSubject = "Confirmation de réception de votre demande";
                    $clientBody = "Bonjour $firstName, <br/>Nous avons bien reçu votre demande et nous vous contacterons prochainement.<br/>Merci.";
                    $emailService->sendEmail($email, $clientSubject, $clientBody);
                }
        
                // Envoi d'un email à la boîte mail générique du garage
                $garageEmail = "contact@garage-vparrot.j-webflow.com";
                $garageSubject = "Nouveau contact à traiter";
                $garageBody = "Un nouveau contact a été reçu de la part de $firstName $lastName. Sujet : $subject. Connectez vous à votre espace pour en prendre connaissance.";
                $emailService->sendEmail($garageEmail, $garageSubject, $garageBody);
        
                $this->sendResponse(["status" => "success", "message" => "Votre demande est enregistré, nous vous contacterons très prochainement."]);
            } else {
                
                $this->sendResponse(["status" => "error", "message" => "Echec de l'envoi du message, veuillez reéssayer plustard"], 500);
            }
        } catch (Exception $e) {

            $this->sendResponse(["status" => "error", "message" => $e->getMessage(), 500]);
        }
    }
}