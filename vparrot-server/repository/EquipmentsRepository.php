<?php

require_once './vparrot-server/models/Database.php';
require_once './vparrot-server/models/Equipment.php';

class EquipmentRepository extends Database {


  //Obtenir la liste des équipements
    public function getAllEquipments() {
        try {
            $db = $this->getBdd();
            $req = "
                SELECT e.id_equipment, e.denomination, e.type_id, t.type_name
                FROM equipments e
                JOIN equipment_types t ON e.type_id = t.id_type
                ORDER BY t.type_name, e.denomination;
            ";

            $stmt = $db->prepare($req);
            $stmt->execute();
            $equipmentData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $equipments = [];
            foreach ($equipmentData as $data) {
                $equipment = new Equipment(
                    $data['denomination'],
                    $data['type_id'],
                    $data['id_equipment']
                );
                $equipments[] = $equipment;
            }

            return $equipments;

        } catch (PDOException $e) {
            $this->handleException($e, "extraction liste des équipements");
            return [];
        }
    }


    //Ajouter un equipement
    public function addEquipment(Equipment $equipment) {
        try {
            $db = $this->getBdd();
            $req = "INSERT INTO equipments (denomination, type_id) VALUES (:denomination, :typeId)";

            $stmt = $db->prepare($req);
            // Utilisation des getters pour obtenir les valeurs des propriétés de l'objet Equipment
            $stmt->bindValue(':denomination', $equipment->getDenomination(), PDO::PARAM_STR);
            $stmt->bindValue(':typeId', $equipment->getTypeId(), PDO::PARAM_INT);
            $stmt->execute();

            return $db->lastInsertId();
            
        } catch (PDOException $e) {
            $this->handleException($e, "ajout d'un nouvel équipement");
        }
    }

    //Vérifie si un équipement existe par son nom
    public function EquipmentExists($name) {
        try {
            $db = $this->getBdd();
            $req = "SELECT COUNT(*) FROM equipments WHERE denomination = :denomination";

            $stmt = $db->prepare($req);
            $stmt->bindValue(":denomination", $name, PDO::PARAM_STR);
            $stmt->execute();

            $count = $stmt->fetchColumn();
            
            return $count > 0;

        } catch (PDOException $e) {
            $this->handleException($e, "vérification si l'équipement existe");
        }
    }





}