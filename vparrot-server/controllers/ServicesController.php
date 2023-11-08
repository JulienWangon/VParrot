<?php

require_once __DIR__ . '/../repository/ServicesRepository.php';

  require_once './vparrot-server/Validator/Validator.php';
  require_once './vparrot-server/config/config.php';

  class ServicesController {

     
      private $servicesRepository;

      public function __construct(ServicesRepository $servicesRepository, Validator $validator) {

          $this->servicesRepository = $servicesRepository;
      }

      private function sendResponse($data, $statusCode = 200) {

          header("Content-Type: application/json");
          http_response_code($statusCode);
          echo json_encode($data);
          exit();
      }

      //Get all services list order by type
      public function getAllServicesList() {
          try {

              $services = $this->servicesRepository->getAllServicesGroupedByType();

              $groupedServices = [];
              foreach ($services as &$service) {
                // Ajouter le chemin de base aux images
                if (isset($service['path_img']) && $service['path_img']) {
                    $service['path_img'] = BASE_PATH . $service['path_img'];
                }
    
                $groupedServices[$service["type_name"]][] = $service;
            }
    
            $this->sendResponse(["status" => "success", "data" => $groupedServices]);
              
          } catch (Exception $e) {

              $this->sendResponse([
                  "status" => "error",
                  "message" => $e->getMessage()
              ], 500);
          }

      }    
  }