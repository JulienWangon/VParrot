<?php

require_once './vparrot-server/models/Database.php';


Class EquipmentTypeRepository extends Database {

    public function getAllTypes() {

        try {

            $db = $this->getBdd();
            $req = "SELECT * FROM equipment_types";

            $stmt = $db->prepare($req);
            $stmt->execute();

            $equipmentTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $equipmentTypes;

        } catch (PDOException $e) {
          $this->handleException($e, "récupération des types d'équipement");
          return [];
        }
    }






    //Vérifier si un type existe
    public function checkEquipmentTypeExists($typeId) {

        try {

            $db = $this->getBdd();
            $req = "SELECT COUNT(*) FROM equipment_types WHERE id_type = :typeId";

            $stmt = $db->prepare($req);
            $stmt->bindValue(":typeId", $typeId, PDO::PARAM_INT);
            $stmt->execute();

            $count = $stmt->fetchColumn();
            return $count > 0;

        } catch (PDOException $e) {

            $this->handleException($e, "vérification de l'existence d'un type d'équipement");
        }
    }
}