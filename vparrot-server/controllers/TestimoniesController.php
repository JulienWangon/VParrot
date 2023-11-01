<?php

require_once './vparrot-server/models/Testimonies.php';
require_once './vparrot-server/Validator/Validator.php';


class TestimoniesController {

    private $validator;

    private function sendResponse($data, $statusCode = 200) {

        header("Content-Type: application/json");
        http_response_code($statusCode);
        echo json_encode($data);
    }

//GET all testimonies list
    public function getAllTestimoniesList () {
        $testimonies = new Testimonies();
        $data = $testimonies->getAllTestimonies();
        $this->sendResponse($data);
    }

//CREATE new testimony    
    public function createTestimony () {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            // Retrieve data sent by the client
            $data = json_decode(file_get_contents('php://input'), true);

            //Check if JSON data is formatted correctly
            if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
                $this->sendResponse(["status" => "error", "message" => "Format JSON invalide"], 400);
                return;
            }

            //Check if all the necessary keys are present
            $requireKeys =["firstName", "lastName", "content", "rating"];
            foreach ($requireKeys as $key) {
                if (!isset($data[$key])) {
                    $this->sendResponse(["status" => "error", "message" => "La clé $key est manquante"], 400);
                    return;
                }
            }

            //Assign Data to Variables
            $lastName = $data['last_name'];
            $firstName = $data['first_name'];
            $content = $data['content'];
            $rating =intval($data['rating']);

            //Data validation
            $this->validator = new Validator();

            $validLastName = $this->validator->validateStringForName($lastName, 'lastName');
            $validFirstName = $this->validator->validateStringForName($firstName, 'firstName');
            $validRating = $this->validator->validateRating($rating, 'rating');
            $validContent = $this->validator->validateContent($content, 'content');

            if(!$validLastName || !$validFirstName || !$validRating || $validContent) {
                $errors = $this->validator->getErrors();
                $this->sendResponse(["status" => "error", "message" => $errors], 400);
            }

            if($validLastName && $validFirstName && $validRating && $validContent) {
                try {
                    $testimony = new Testimonies();
                    $testimony->setLastName($lastName);
                    $testimony->setFirstName($firstName);
                    $testimony->setContent($content);
                    $testimony->setRating($rating);

                    if ($testimony->addTestimony()) {
                        $this->sendResponse(["status" => "succes", "message" => "Avis client crée avec succès, il sera soumis à la modération avant affichage"], 200);
                        
                    } else {
                        $this->sendResponse(["status" => "error", "message" => "Echec de la création d'un avis client"], 500);
                    }
                } catch (Exception $e) {
                    $this->sendResponse(["status" => "error", "message" => $e->getMessage(), 500]);
                }
            }

        }

    }




}