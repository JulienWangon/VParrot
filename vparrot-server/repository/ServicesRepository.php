<?php

require_once './vparrot-server/models/Database.php';

class ServicesRepository extends Database {

    public function getAllServicesGroupedByType() : array {

        try {

            $db = $this->getBdd();

            $req = "SELECT st.id_type, st.type_name, s.id_service, s.service_name, s.description, s.price, s.path_img
                    FROM services_type st
                    JOIN services s ON st.id_type = s.type_id
                    ORDER BY st.id_type
                    ";
              
            $stmt = $db->prepare($req);
            $stmt->execute();
            $types = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $types;
              
        } catch(PDOException $e) {

            $this->handleException($e, "extraction des services");
        }
    }
}