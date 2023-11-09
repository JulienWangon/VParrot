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

}