<?php

require_once './vparrot-server/models/Contact.php';
require_once './vparrot-server/Validator/Validator.php';
require_once './vparrot-server/repository/ContactRepository.php';


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

}