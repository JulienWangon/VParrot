<?php

require_once './vparrot-server/repository/CarsRepository.php';
require_once './vparrot-server/Validator/Validator.php';
require_once './vparrot-server/config/config.php';
require_once './vparrot-server/DTOs/CarDetailsDTO.php';

class CarsController {

 
    private $carsRepository;
    private $validator;

    public function __construct(CarsRepository $carsRepository, Validator $validator) {

        $this->carsRepository = $carsRepository;
        $this->validator = $validator;
       
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


    public function getFullCarDetails($carId) {
        try {

            if(!$this->carsRepository->checkCarExists($carId)) {
                $this->sendResponse(["status" => "error", "message" => "Voiture non trouvée"], 404);
                return;
            }

            $carData = $this->carsRepository->getCarDetailsById($carId);
            $fullCarDetails = new CarDetailsDTO($carData);

            $this->sendResponse(["status" => "success", "data" => $fullCarDetails]);

        } catch(Exception $e) {

            $this->sendResponse(["status" => "error", "message" => $e->getMessage()], 500);
        }
    }






    public function getFilteredCarsList() {

        $filters = $_GET;

        if(isset($filters['brand'])) {
            $this->validator->validateStringForNames($filters['brand'], 'marque');
        }

        if(isset($filters['model'])) {
            $this->validator->validateStringForNamesAndNumbers($filters['model'], 'modèle');
        }

        if(isset($filters['transmission'])) {
            $this->validator->validateStringForNames($filters['transmission'], 'transmission');
        }

        if(isset($filters['fuel'])) {
            $this->validator->validateStringForNames(($filters['fuel']), 'carburant');
        }

        if(isset($filters['yearMin'])) {
            $this->validator->validateNumber($filters['yearMin'], 'yearMin', 1990);
        }

        if (isset($filters['kmMax'])) {
            $this->validator->validateNumber($filters['kmMax'], 'kmMax', 0);
        } 
        
        if(!empty($this->validator->getErrors())) {
            $this->sendResponse(["error" => $this->validator->getErrors()], 400);
            return;
        }

        try {

            $cars = $this->carsRepository->getFilteredCars($filters);

            foreach ($cars as $key => $car) {
                $cars[$key]['price'] = number_format($car['price'], 0, '', ' ') . ' €';
                if (!empty($car['image'])) {
                    $cars[$key]['image'] = BASE_PATH . $car['image'];
                }
            }
        
            $this->sendResponse(["status" => "success", "data" => $cars]);

        } catch (Exception $e) {
            $this->sendResponse(["status" =>"error", "message" => $e->getMessage()]);
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

