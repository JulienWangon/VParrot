<?php

require_once './vparrot-server/models/Database.php';
require_once './vparrot-server/models/Service.php';
require_once './vparrot-server/models/ServiceTypes.php';

class ServicesRepository extends Database {
    

    public function getAllServicesAndServiceTypes() : array {

        try {

            $db = $this->getBdd();

            $req = "SELECT st.id_type, st.type_name, s.id_service, s.service_name, s.description, s.price, s.path_img
                    FROM services_type st
                    JOIN services s ON st.id_type = s.type_id
                    ORDER BY st.id_type
                    ";
              
            $stmt = $db->prepare($req);
            $stmt->execute();
            $servicesData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $serviceTypes = [];
            $services = [];
            foreach ($servicesData as $serviceData) {

                if (!isset($serviceTypes[$serviceData['id_type']])) {
                    $serviceTypes[$serviceData['id_type']] = new ServiceTypes(     
                        $serviceData['type_name'],
                        $serviceData['id_type']
                    );      
                }

                $service = new Service(
                    $serviceData['id_type'],
                    $serviceData['service_name'],
                    $serviceData['description'],
                    $serviceData['price'],
                    $serviceData['path_img'],
                    $serviceData['id_service']
                );

                $services[] = $service;

            }

            return ['services' => $services, 'serviceTypes' => $serviceTypes];
              
        } catch(PDOException $e) {

            $this->handleException($e, "extraction des services");
        }
    }
}