<?php

require_once './vparrot-server/models/TreatedContact.php';
require_once './vparrot-server/Validator/Validator.php';
require_once './vparrot-server/repository/TreatedContactRepository.php';
require_once './vparrot-server/models/AuthModel.php';


class TreatedContactController {

    private $validator;
    private $authModel;
    private $treatedContactRepository;

    public function __construct(TreatedContactRepository $treatedContactRepository, Validator $validator, AuthModel $authModel) {

        $this->validator = $validator;
        $this->authModel = $authModel;
        $this->treatedContactRepository = $treatedContactRepository;

    }


    private function sendResponse($data, $statusCode = 200) {

      header("Content-Type: application/json");
      http_response_code($statusCode);
      echo json_encode($data);
    }


    //Obtenir la list des contact traité par status
    public function getAllTreatedContactList() {

        try {

            $treatedContacts = $this->treatedContactRepository->getAllTreatedContact();

            if(empty($treatedContacts)) {

              $this->sendResponse(['status' => 'error', 'message' => 'Aucuns contacts traités trouvés. ']);
              return;
            }


            $sortedTreatedContact = [
                'en cours' => [],
                'traité' => []
            ];

            foreach($treatedContacts as $treatedContact) {

                $status = $treatedContact->getStatus();
                $sortedTreatedContact[$status][] = [
                    'idTreatedContact' => $treatedContact->getIdTreatedContact(),
                    'firstName' => $treatedContact->getFirstName(),
                    'lastName' => $treatedContact->getLastName(),
                    'phone' => $treatedContact->getPhone(),
                    'email' => $treatedContact->getEmail(),
                    'contactSubject' => $treatedContact->getContactSubject(),
                    'content' => $treatedContact->getContent(),
                    'assignedUserId' => $treatedContact->getAssignedUserId(),
                    'treatmentData' => $treatedContact->getTreatmentDate(),
                    'userComment' => $treatedContact->getUserComment(),
                    'status' => $treatedContact->getStatus()
                ];
            }

            $this->sendResponse(['status' => 'success', 'data' => $sortedTreatedContact]);
        } catch (Exception $e) {

          $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }

    //Traitement d'un contact
    public function treatThisContact () {

        //Vérifie si la bonne méthode HTTP est utilisée (POST)
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
          $this->sendResponse(["status" => "error", "message" => "Méthode non autorisée"], 405);
          return;
        }

         // Récupère les informations de l'utilisateur depuis le JWT
        try {

            $userData = $this->authModel->decodeJwtFromCookie();
        } catch (Exception $e) {

            $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 401);
            return;
        }

        // Vérifie si l'utilisateur a le rôle 'admin' ou 'employé'
        if ($userData['role'] !== 'admin' && $userData['role'] !== 'employé') {

            $this->sendResponse(['status' => 'error', 'message' => 'Accès non autorisé'], 403);
            return;
        }

        // Récupère les données envoyées
        $data = json_decode(file_get_contents('php://input'), true);

        //Vérifie si le format json est valide
        if (!$this->validator->validateJsonFormat($data)) {
  
            $this->sendResponse($this->validator->getErrors(), 400);
            return;
        }
 
         //Vérifie la présence des donnée id et token csrf
        if (empty($data['contactId']) || empty($data['csrfToken'])) {
             
            $this->sendResponse(['status' => 'error', 'message'=> 'identitfiant témoignage ou token csrf manquant'], 400);
            return;
         }
 
        //Validation du token csrf 
        $decodedTokenData = $this->authModel->decodeJwtFromCookie();
 
        if ($data['csrfToken'] !== $decodedTokenData['csrfToken']) {
             
            $this->sendResponse(['status' => 'error', 'message' => 'Token CSRF invalide'], 400);
            return;
        }


        //Assigne les data à des variables
        $contactId = $data['contactId'];
        $assignedUserId = $data['assignedUserId'];
        $userComment = $data['userComment'];
        $treatmentDate = $data['treatmentDate'];
        $status = $data['status'];

        //Validation des données
        $validUserComment = $this->validator->validateMediumContent($userComment, 'commentaire', 50, 400);
        $validStatus = $this->validator->validateStringForNames($status, 'status', 20);
        $validAssignedUserId = $this->validator->validateNumber($assignedUserId, 'id');
        $validTreatmentDate = $this->validator->validateStringForNames($treatmentDate, "date");
        $validContactId = $this->validator->validateNumber($contactId, 'id');

        if(!$validUserComment || !$validStatus || !$validAssignedUserId || !$validTreatmentDate || !$validContactId) {

          $errors = $this->validator->getErrors();
          $this->sendResponse(["status" => "error", "message" => $errors], 400);
          return;
        }

        try {

            if($this->treatedContactRepository->contactTreatment($contactId, $assignedUserId, $userComment, $treatmentDate, $status)) {

                $this->sendResponse(['status' => 'success', 'message' => 'Contact traité avec success']);
            } else {

                $this->sendResponse(['status' => 'error', 'message' => 'Aucun contact traité']);
            }
        } catch (Exception $e) {

            $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

}