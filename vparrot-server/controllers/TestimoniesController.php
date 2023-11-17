<?php

require_once './vparrot-server/models/Testimonies.php';
require_once './vparrot-server/Validator/Validator.php';
require_once './vparrot-server/repository/TestimoniesRepository.php';


class TestimoniesController {

    private $validator;
    private $testimoniesRepository;

    public function __construct(TestimoniesRepository $testimoniesRepository, Validator $validator ) {
        $this->validator = $validator;
        $this->testimoniesRepository = $testimoniesRepository;
    }

    private function sendResponse($data, $statusCode = 200) {

        header("Content-Type: application/json");
        http_response_code($statusCode);
        echo json_encode($data);
    }

    //GET all testimonies list
    public function getAllTestimoniesList() {
        $data = $this->testimoniesRepository->getAllTestimonies();
        $this->sendResponse($data);
    }

    //GET testimonies by status
    public function getTestimoniesByStatus($isModerated) {
        try {
            $testimonies = $this->testimoniesRepository->getModerationTestimonies($isModerated);

            $testimoniesArray = array_map(function ($testimony) {
                return [
                    'idTestimony' => $testimony->getIdTestimony(),
                    'firstName' => $testimony->getFirstName(),
                    'lastName' => $testimony->getLastName(),
                    'content' => $testimony->getContent(),
                    'rating' => $testimony->getRating(),
                    'isModerated' => $testimony->getIsModerated()
                ];
            }, $testimonies);

            $this->sendResponse(['status' => 'success', 'data' => $testimoniesArray]);
            
        } catch (Exception $e) {
            
            $this->sendResponse(['error' => $e->getMessage()], 400);        
        }
    }

    //Get all moderated testimonies
    public function getUnmoderatedTestimoniesList() {
        $this->getTestimoniesByStatus(0);
    }

    //Get al unmoderated testimonies
    public function getModeratedTestimoniesList() {
        $this->getTestimoniesByStatus(1);
    }



    //CREATE new testimony    
    public function createTestimony() {

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

        //Vérifie si toute les clés sont présente
        $requireKeys =["firstName", "lastName", "content", "rating"];
            foreach ($requireKeys as $key) {
                if (!isset($data[$key])) {
                    $this->sendResponse(["status" => "error", "message" => "La clé $key est manquante"], 400);
                    return;
                }
            }

        //Assign Data to Variables
        $lastName = $data['lastName'];
        $firstName = $data['firstName'];
        $content = $data['content'];
        $rating =intval($data['rating']);

        //Data validation
        $this->validator = new Validator();

        $validLastName = $this->validator->validateStringForNames($lastName, 'lastName');
        $validFirstName = $this->validator->validateStringForNames($firstName, 'firstName');
        $validRating = $this->validator->validateRating($rating, 'rating');
        $validContent = $this->validator->validateMediumContent($content, 'content');

        if(!$validLastName || !$validFirstName || !$validRating || !$validContent) {
            $errors = $this->validator->getErrors();
            $this->sendResponse(["status" => "error", "message" => $errors], 400);
            return;
        }

        //Instance du model pour la création de l'avis client 
        $testimony = new Testimonies();

        $testimony->setFirstName($firstName);
        $testimony->setLastName($lastName);
        $testimony->setContent($content);
        $testimony->setRating($rating);

        try {
                   
            if ($this->testimoniesRepository->addTestimony($testimony)) {

                $this->sendResponse(["status" => "succes", "message" => "Avis client crée avec succès, il sera soumis à la modération avant affichage"], 200);
                        
            } else {

                $this->sendResponse(["status" => "error", "message" => "Echec de la création d'un avis client"], 500);
            }
        } catch (Exception $e) {

            $this->sendResponse(["status" => "error", "message" => $e->getMessage(), 500]);
        }
    }

//Approve Testimony
    public function approveThisTestimony(int $testimonyId) {

        //Check if testimony exists
        if(!$this->testimoniesRepository->testimonyExists($testimonyId)) {
            $this->sendResponse(["status" => "error", "message" => "Témoignage non trouvé"], 400);
            return;
        }

        //If testimony exists continue with approval
        if($this->testimoniesRepository->approveTestimony($testimonyId)) {
            $this->sendResponse(["status" => "success", "message" => "Témoignage approuvé avec succès"]);

        } else {
            $this->sendResponse(["status" => "error", "message" => "Erreur lors de l 'approbation du témoignage"], 500);
        }
    }

//Reject Testimony
    public function rejectThisTestimony(int $testimonyId) {

        //Check if testimony exists
        if(!$this->testimoniesRepository->testimonyExists($testimonyId)) {
            $this->sendResponse(["status" => "error", "message" => "Témoignage non trouvé"], 400);
            return;
        }

        //If testimony exists continue with reject method
        if($this->testimoniesRepository->rejectTestimony($testimonyId)) {
            $this->sendResponse(["status" => "success", "message" => "Témoignage rejeté avec succès"]);

        } else {
            $this->sendResponse(["status" => "error", "message" => "Erreur lors du rejet du témoignage"], 500);
        }
    }

//Delete Testimony
    public function deleteThisTestimony(int $testimonyId) {
       
        //Check if testimony exists
        if($this->testimoniesRepository->testimonyExists($testimonyId)) {
            $this->sendResponse(["status" => "error", "message" => "Témoignage non trouvé"], 400);
            return;
        }

        //If testimony exists continue with delete method
        if($this->testimoniesRepository->deleteTestimony($testimonyId)) {
            $this->sendResponse(["status" => "success", "message" => "Témoignage supprimé avec succès"]);

        } else {
            $this->sendResponse(["status" => "error", "message" => "Erreur lors due la suppression du témoignage"], 500);
        }
    }

    

}