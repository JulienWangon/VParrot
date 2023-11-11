<?php

require_once './vparrot-server/models/Database.php';

class CarsRepository extends Database {

    public function carBriefDetails() :array {

        try {

          $db = $this->getBdd();

          $req= "SELECT c.id_car, c.brand, c.model, c.trade_name, c.price, cf.years, cf.fuel, cf.power, cf.kilometer, cf.transmission, cf.body, ci.file_path AS image
                 FROM cars c
                 JOIN car_features cf ON c.id_car = cf.car_id
                 LEFT JOIN cars_images ci ON c.id_car = ci.car_id AND ci.is_main = 1";

          $stmt = $db->prepare($req);
          $stmt->execute();
          $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

          return $cars;

        } catch(PDOException $e) {

            $this->handleException($e, "extraction des informations de base des véhicules");
        }
    }


    public function getFilteredCars($filters) {

        try {

            $db = $this->getBdd();

            $req = "SELECT cars.*, car_features.*, cars_images.file_path AS image
                    FROM cars
                    LEFT JOIN car_features ON cars.id_car = car_features.car_id
                    LEFT JOIN cars_images ON cars.id_car = cars_images.car_id AND cars_images.is_main = 1
                    WHERE 1=1";

            if(!empty($filters['brand'])) {
                $req .= " AND cars.brand = :brand";
            }

            if(!empty($filters['model'])) {
                $req .= " AND cars.model = :model";
            }

            if(!empty($filters['fuel'])) {
                $req .= " AND car_features.fuel = :fuel";
            }

            if(!empty($filters['transmission'])) {
                $req .= " AND car_features.transmission = :transmission";
            }

            if(!empty($filters['yearMin'])) {
                $req .= " AND car_features.years >= :yearMin";
            }

            if(!empty($filters['kmMax'])) {
                $req .= " AND car_features.kilometer <= :kmMax";
            }

            $stmt = $db->prepare($req);


            if(!empty($filters['brand'])) {
                $stmt->bindValue(":brand", $filters['brand'], PDO::PARAM_STR);
            }

            if(!empty($filters['model'])) {
                $stmt->bindValue(":model", $filters['model'], PDO::PARAM_STR);
            }

            if(!empty($filters['fuel'])) {
                $stmt->bindValue(":fuel", $filters['fuel'], PDO::PARAM_STR);
            }

            if(!empty($filters['transmission'])) {
                $stmt->bindValue(":transmission", $filters['transmission'], PDO::PARAM_STR);
            }

            if(!empty($filters['yearMin'])) {
                $stmt->bindValue(":yearMin", $filters['yearMin'], PDO::PARAM_INT);
            }

            if(!empty($filters['kmMax'])) {
                $stmt->bindValue(":kmMax", $filters['kmMax'], PDO::PARAM_INT);
            }

            $stmt->execute();
            $filteredCars = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $filteredCars;

        } catch (PDOException $e) {

            $this->handleException($e, "extraction des véhicules filtrés");
        }
    }




    public function getDistinctBrands () {

        try {

            $db = $this->getBdd();

            $req = "SELECT DISTINCT brand FROM cars";
            $stmt = $db->prepare($req);
            $stmt->execute();
            $brands = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $brands;
            
        } catch (PDOException $e) {

            $this->handleException($e, "extraction des marques distinctes");
        }
    }

    public function getDistinctmModels () {

        try {

            $db = $this->getBdd();

            $req = "SELECT DISTINCT model FROM cars";
            $stmt = $db->prepare($req);
            $stmt->execute();
            $models = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $models;
            
        } catch (PDOException $e) {

            $this->handleException($e, "extraction des marques distincts");
        }
    }

    public function getDistinctFuelTypes () {

        try {

            $db = $this->getBdd();

            $req = "SELECT DISTINCT fuel FROM car_features";
            $stmt = $db->prepare($req);
            $stmt->execute();
            $fuleTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $fuleTypes;
       
        } catch (PDOException$e) {

            $this->handleException($e, "extraction des carburants distincts");
        }
    }

    public function getDistinctTransmissions () {

        try {

            $db = $this->getBdd();

            $req = "SELECT DISTINCT transmission FROM car_features";
            $stmt = $db->prepare($req);
            $stmt->execute();
            $fuleTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $fuleTypes;
       
        } catch (PDOException$e) {

            $this->handleException($e, "extraction des transmissions distinctes");
        }
    }
}