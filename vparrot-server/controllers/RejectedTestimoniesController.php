<?php


require_once './vparrot-server/repository/RejectedTestimoniesRepository.php';

class RejectedTestimoniesController {

    private $rejectedTestimoniesRepository;
   

    public function __construct(RejectedTestimoniesRepository $rejectedTestimoniesRepository) {

        $this->rejectedTestimoniesRepository = $rejectedTestimoniesRepository;
       
    }

    private function sendResponse($data, $statusCode = 200) {

      header("Content-Type: application/json");
      http_response_code($statusCode);
      echo json_encode($data);
  }


  //Obtenir la liste des avis rejetés
    public function getRejectedTestimonies() {

        try {

            $rejectedtestimonies = $this->rejectedTestimoniesRepository->getRejectedTestimonies();
            $rejectedtestimoniesArray = array_map(function ($rejectedTestimony) {
                return [
                    'idRejectedTestimony' => $rejectedTestimony->getIdRejectedTestimony(),
                    'idTestimony' => $rejectedTestimony->getIdTestimony(),
                    'firstName' => $rejectedTestimony->getFirstName(),
                    'lastName' => $rejectedTestimony->getLastName(),
                    'content' => $rejectedTestimony->getContent(),
                    'rating' => $rejectedTestimony->getRating()      
                ];

            }, $rejectedtestimonies);

                $this->sendResponse(['status' => 'success', 'data' => $rejectedtestimoniesArray]);

        } catch (Exception $e) {

            $this->sendResponse(['error' => $e->getMessage()], 400);
        }
    
    } 
}