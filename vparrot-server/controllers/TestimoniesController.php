<?php

require_once './vparrot-server/models/Testimonies.php';
require_once './vparrot-server/Validator/Validator.php';
require_once './vparrot-server/repository/TestimoniesRepository.php';
require_once './vparrot-server/models/AuthModel.php';


class TestimoniesController {

    private $validator;
    private $testimoniesRepository;
    private $authModel;

    public function __construct(TestimoniesRepository $testimoniesRepository, Validator $validator, AuthModel $authModel ) {
        $this->validator = $validator;
        $this->testimoniesRepository = $testimoniesRepository;
        $this->authModel = $authModel;

    }

    private function sendResponse($data, $statusCode = 200) {

        header("Content-Type: application/json");
        http_response_code($statusCode);
        echo json_encode($data);
    }

    //GET all testimonies list
    public function getAllTestimoniesList() {
        try {

            $testimonies = $this->testimoniesRepository->getAllTestimonies();

            if(empty($testimonies)) {
                $this->sendResponse(['status' => 'error', 'message' => 'Aucuns témoignages trouvés']);
                return;
            }

            $sortedTestimonies = [
                'en attente' => [],
                'approuvé' => [],
                'rejeté' => []
            ];

            foreach ($testimonies as $testimony) {
                $status = $testimony->getStatus();
                $sortedTestimonies[$status][] = [
                    'idTestimony' => $testimony->getIdTestimony(),
                    'firstName'   => $testimony->getFirstName(),
                    'lastName'    => $testimony->getLastName(),
                    'content'     => $testimony->getContent(),
                    'rating'      => $testimony->getRating(),
                    'status'      => $status
                ];
            }

            $this->sendResponse(['status' => 'success', 'data' => $sortedTestimonies]);
        } catch (Exception $e) {

            $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }


    /**
     * Crée un nouveau témoignage à partir des données reçues via une requête POST.
     *
     * Cette méthode traite les données JSON envoyées par le client, 
     * effectue des validations et crée un nouveau témoignage dans la base de données.
     * Elle renvoie une réponse HTTP en fonction du résultat de l'opération.
     *
     * @return void Renvoie une réponse HTTP au client.
     */

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

        //Vérifie si toute les clés sont présentes
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
        $validLastName = $this->validator->validateStringForNames($lastName, 'lastName');
        $validFirstName = $this->validator->validateStringForNames($firstName, 'firstName');
        $validRating = $this->validator->validateRating($rating, 'rating');
        $validContent = $this->validator->validateMediumContent($content, 'content', 20, 250);

        if(!$validLastName || !$validFirstName || !$validRating || !$validContent) {
            $errors = $this->validator->getErrors();
            $this->sendResponse(["status" => "error", "message" => $errors], 400);
            return;
        }

        $captchaToken = $data['recaptchaResponse'];

        // Vérifier la réponse du CAPTCHA
        if (!$this->validator->verifyGoogleCaptcha($captchaToken)) {
            $this->sendResponse(["status" => "error", "message" => $this->validator->getErrors()], 400);
            return;
        }

        //Instance du model pour la création de l'avis client 
        $testimony = new Testimonies();

        $testimony->setFirstName($firstName);
        $testimony->setLastName($lastName);
        $testimony->setContent($content);
        $testimony->setRating($rating);

        try {
                   
            $insertedId = $this->testimoniesRepository->addTestimony($testimony);

            if ($insertedId) {
                $testimonyData = [
                    'idTestimony' => $insertedId, 
                    'firstName' => $testimony->getFirstName(),
                    'lastName' => $testimony->getLastName(),
                    'content' => $testimony->getContent(),
                    'rating' => $testimony->getRating(),
                ];
    

                $this->sendResponse(["status" => "success", "message" => "Avis client crée avec succès, il sera soumis à la modération avant affichage", "data" => $testimonyData], 200);
                        
            } else {

                $this->sendResponse(["status" => "error", "message" => "Echec de la création d'un avis client"], 500);
            }
        } catch (Exception $e) {

            $this->sendResponse(["status" => "error", "message" => $e->getMessage(), 500]);
        }
    }


    /**
     * Approuve un témoignage.
     * 
     * Cette méthode met à jour le statut de modération d'un témoignage spécifié par son ID.
     * Elle effectue plusieurs vérifications, y compris la méthode HTTP, la présence et la validité 
     * du token CSRF, et l'existence du témoignage dans la base de données.
    */

    //Approve Testimony
    public function approveThisTestimony () {

        //Vérifie si la bonne méthode HTTP est utilisée (PUT)
        if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
            $this->sendResponse(["status" => "error", "message" => "Méthode non autorisée"], 405);
            return;
        }

        // Récupère les informations de l'utilisateur depuis le JWT
        try {
            $userData = $this->authModel->decodeJwtFromCookie();
        } catch (Exception $e) {
            $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 401); // ou tout autre code approprié
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
        if (empty($data['idTestimony']) || empty($data['csrfToken'])) {
            
            $this->sendResponse(['status' => 'error', 'message'=> 'identitfiant témoignage ou token csrf manquant'], 400);
            return;
        }

        //Validation du token csrf 
        $decodedTokenData = $this->authModel->decodeJwtFromCookie();

        if ($data['csrfToken'] !== $decodedTokenData['csrfToken']) {
            
            $this->sendResponse(['status' => 'error', 'message' => 'Token CSRF invalide'], 400);
            return;
        }

        // Récupère le témoignage et met à jour son statut de modération. 
        $testimony = $this->testimoniesRepository->findTestimonyById($data['idTestimony']);

        // Vérifiez si $testimony est une instance de Testimonies
        if ($testimony === null) {
            $this->sendResponse(['status' => 'error', 'message' => 'Témoignage non trouvé'], 404);
            return;
        }
        
        try {
             // Tente d'approuver le témoignage et renvoie une réponse appropriée.
            if ($this->testimoniesRepository->approveTestimony($testimony)) {
                $this->sendResponse(['status' => 'success', 'message' => 'Témoignage approuvé avec succès']);
            } else {
                $this->sendResponse(['status' => 'error', 'message' => 'Aucune modification effectuée'], 400);
            }
        } catch (Exception $e) {
            $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
   }



    //Reject Testimony
    public function rejectThisTestimony() {
     
        //Vérifie si la bonne méthode HTTP est utilisée (PUT)
        if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
            $this->sendResponse(["status" => "error", "message" => "Méthode non autorisée"], 405);
            return;
        }

        // Récupère les informations de l'utilisateur depuis le JWT
        try {
            $userData = $this->authModel->decodeJwtFromCookie();
        } catch (Exception $e) {
            $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 401); // ou tout autre code approprié
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
        if (empty($data['idTestimony']) || empty($data['csrfToken'])) {
            
            $this->sendResponse(['status' => 'error', 'message'=> 'identitfiant témoignage ou token csrf manquant'], 400);
            return;
        }

        //Validation du token csrf 
        $decodedTokenData = $this->authModel->decodeJwtFromCookie();

        if ($data['csrfToken'] !== $decodedTokenData['csrfToken']) {
            
            $this->sendResponse(['status' => 'error', 'message' => 'Token CSRF invalide'], 400);
            return;
        }

        //Vérification de l'existance du témoignage dans la base de donnée
        if(!$this->testimoniesRepository->testimonyExists($data['idTestimony'])) {

            $this->sendResponse(['status'=> 'error', 'message' => 'Témoignage non trouvé '], 404);
            return;
        }

        // Récupère le témoignage et met à jour son statut de modération.
        $testimony = $this->testimoniesRepository->findTestimonyById($data['idTestimony']);
        if (!$testimony) {
            $this->sendResponse(['status' => 'error', 'message' => 'Témoignage non trouvé'], 404);
            return;
        }
       

        try {
            
            // Tente de rejet le témoignage et renvoie une réponse appropriée.
           if($this->testimoniesRepository->rejectTestimony($testimony)) {

               $this->sendResponse(['status' => 'success', 'message' => 'Témoignage rejeté avec success']);
           } else  {

               $this->sendResponse(['status' => 'error', 'message' => 'Aucune modification effectuée'], 400);
           }
        } catch (Exception $e) {

           $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 500);
        }

    }

    
    //Delete Testimony
    public function deleteThisTestimony() {

        //Vérifie si la bonne méthode HTTP est utilisée (DELETE)
        if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
            $this->sendResponse(["status" => "error", "message" => "Méthode non autorisée"], 405);
            return;
        }

        // Récupère les informations de l'utilisateur depuis le JWT
        try {
            $userData = $this->authModel->decodeJwtFromCookie();
        } catch (Exception $e) {
            $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 401); // ou tout autre code approprié
            return;
        }

        // Vérifie si l'utilisateur a le rôle 'admin' ou 'employé'
        if ($userData['role'] !== 'admin' && $userData['role'] !== 'employé') {
            $this->sendResponse(['status' => 'error', 'message' => 'Accès non autorisé'], 403);
            return;
        }

        
        $idTestimony= $_GET['idTestimony'] ?? null;
        $csrfToken = $_GET['csrfToken'] ?? null;



        //Vérifie la présence des donnée id et token csrf
        if (empty($idTestimony) || empty($csrfToken)) {
            
            $this->sendResponse(['status' => 'error', 'message'=> 'identitfiant témoignage ou token csrf manquant'], 400);
            return;
        }

        //Validation du token csrf 
        $decodedTokenData = $this->authModel->decodeJwtFromCookie();

        if ($csrfToken !== $decodedTokenData['csrfToken']) {
            
            $this->sendResponse(['status' => 'error', 'message' => 'Token CSRF invalide'], 400);
            return;
        }

        //Vérification de l'existance du témoignage dans la base de donnée
        if(!$this->testimoniesRepository->testimonyExists($idTestimony)) {

            $this->sendResponse(['status'=> 'error', 'message' => 'Témoignage non trouvé '], 404);
            return;
        }

        // Récupère le témoignage et met à jour son statut de modération.
        $testimony = $this->testimoniesRepository->findTestimonyById($idTestimony);

        try {

            // Tente de rejeter le témoignage et renvoie une réponse appropriée.
           if($this->testimoniesRepository->deleteTestimony($testimony)) {

               $this->sendResponse(['status' => 'success', 'message' => 'Témoignage supprimé avec success']);
           } else  {

               $this->sendResponse(['status' => 'error', 'message' => 'Aucune suppression effectuée'], 400);
           }
        } catch (Exception $e) {

           $this->sendResponse(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

}