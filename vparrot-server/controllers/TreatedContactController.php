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

}