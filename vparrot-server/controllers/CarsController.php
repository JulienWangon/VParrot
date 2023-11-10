<?php

require_once './vparrot-server/repository/CarsRepository.php';
require_once './vparrot-server/Validator/Validator.php';
require_once './vparrot-server/config/config.php';

class CarsController {

 
    private $carsRepository;

    public function __construct(CarsRepository $carsRepository) {

        $this->carsRepository = $carsRepository;
       
    }

    private function sendResponse($data, $statusCode = 200) {

      header("Content-Type: application/json");
      http_response_code($statusCode);
      echo json_encode($data);
      exit();
    }


    //Gell all car brief details
    public function getCarBriefDetails() {
        
        try{

            $carsDetails = $this->carsRepository->carBriefDetails();
            
            //Format price and image path
            foreach($carsDetails as $key => $car) {
              $carsDetails[$key]['price'] = number_format($car['price'], 0, '', ' ') . ' €';
              $carsDetails[$key]['image'] = BASE_PATH . $car['image'];
          }

          $this->sendResponse(["status" => "success", "data" => $carsDetails]);

        } catch(Exception $e) {

          $this->sendResponse(['error' => $e->getMessage()], 400);

        }
    }

    //Get all distinct brands
    public function getAllDistinctBrands () {

        try {

            $brands = $this->carsRepository->getDistinctBrands();
            $this->sendResponse(["status" => "success", "data" => $brands]);

        } catch(Exception $e) {

            $this->sendResponse(["error" => $e->getMessage()], 400);
        }
    }


    //Get all distinct models
    public function getAllDistinctModels () {

        try {

            $models = $this->carsRepository->getDistinctmModels();
            $this->sendResponse(["status" => "success", "data" => $models]);

        } catch(Exception $e) {

            $this->sendResponse(["error" => $e->getMessage()], 400);
        }
    }

    //Get all distinct fuel types
    public function getAllDistinctFuelTypes () {

        try {

            $fuelTypes = $this->carsRepository->getDistinctFuelTypes();
            $this->sendResponse(["status" => "success", "data" => $fuelTypes]);

        } catch(Exception $e) {

            $this->sendResponse(["error" => $e->getMessage()], 400);
        }
    }

    //Get all distinct transmission types
    public function getAllDistinctTransmissionTypes () {

        try {

            $transmissionTypes = $this->carsRepository->getDistinctTransmissions();
            $this->sendResponse(["status" => "success", "data" => $transmissionTypes]);

        } catch(Exception $e) {

            $this->sendResponse(["error" => $e->getMessage()], 400);
        }
    }
    


}

