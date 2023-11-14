<?php

require_once __DIR__ . '/../repository/ServicesRepository.php';

  require_once './vparrot-server/Validator/Validator.php';
  require_once './vparrot-server/config/config.php';

  class ServicesController {

     
    private $servicesRepository;
    private $validator;

    public function __construct(ServicesRepository $servicesRepository, Validator $validator) {

        $this->servicesRepository = $servicesRepository;
        $this->validator = $validator;
    }

    private function sendResponse($data, $statusCode = 200) {

        header("Content-Type: application/json");
        http_response_code($statusCode);
        echo json_encode($data);
        exit();
    }

      //Get all services list order by type
    public function getAllServicesListGroupedByType() {
        try {

            $data = $this->servicesRepository->getAllServicesAndServiceTypes();
            $services = $data['services'];
            $serviceTypes = $data['serviceTypes'];

            $groupedServices = [];
            foreach ($services as $service) {
                $typeId = $service->getIdType();

                if(isset($serviceTypes[$typeId])) {

                    $typeName = $serviceTypes[$typeId]->getTypeName();
                    $groupedServices[$typeName][] = [
                        'idType' => $service->getIdType(),
                        'typeName' => $serviceTypes[$typeId]->getTypeName(),
                        'idService' => $service->getIdService(),
                        'serviceName' => $service->getName(),
                        'description' => $service->getDescription(),
                        'price' => $service->getPrice(),
                        'pathImg' => BASE_PATH . $service->getPathImg()
                    ];
                }
            }

            $this->sendResponse(['status' => 'success', 'data' => $groupedServices]);

        } catch (Exception $e) {

              $this->sendResponse(["status" => "error", "message" => $e->getMessage()], 500);
                             
        }

      }    
  }