<?php

require_once './vparrot-server/models/Database.php';
require_once './vparrot-server/models/Service.php';
require_once './vparrot-server/models/ServiceTypes.php';

class ServicesRepository extends Database {
    

    /**
     * Récupère tous les services et leurs types associés depuis la base de données.
     *
     * Cette méthode interroge la base de données pour extraire les informations de tous les services
     * et de leurs types respectifs. Les services sont joints à leurs types via une jointure SQL.
     * Elle renvoie un tableau associatif contenant deux listes : une liste de services et une liste de types de services.
     * Chaque service est représenté par un objet 'Service', et chaque type de service par un objet 'ServiceTypes'.
     *
     * @return array Renvoie un tableau associatif avec deux clés :
     *               - 'services' : un tableau d'objets 'Service', chacun représentant un service.
     *               - 'serviceTypes' : un tableau d'objets 'ServiceTypes', chacun représentant un type de service.
     *               Renvoie des tableaux vides si aucun service ou type de service n'est trouvé.
     * @throws PDOException Si une erreur survient lors de la requête à la base de données.
    */

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