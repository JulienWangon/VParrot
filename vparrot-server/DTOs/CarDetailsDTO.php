<?php

require_once './vparrot-server/config/config.php';


class CarDetailsDTO {

    public $idCar;
    public $brand;
    public $model;
    public $tradeName;
    public $price;
    public $years;
    public $fuel;
    public $power;
    public $kilometer;
    public $transmission;
    public $body;
    public $images;
    public $equipments;
    
    public function __construct($data) {

        $this->idCar = $data['id_car'];
        $this->brand = $data['brand'];
        $this->model = $data['model'];
        $this->tradeName = $data['trade_name'];
        $this->price = $data['price'];
        $this->years = $data['years'];
        $this->fuel = $data['fuel'];
        $this->power = $data['power'];
        $this->kilometer = $data['kilometer'];
        $this->transmission = $data['transmission'];
        $this->body = $data['body'];
        $this->images = $this->formatImages($data['images']);
        $this->equipments = $this->formatEquipments($data['equipments']);

    }

    private function formatEquipments($equipmentsString) {
      $equipmentsArray = explode('; ', $equipmentsString);
      $formattedEquipments = [];

      foreach($equipmentsArray as $equipment) {
          [$type, $name] = explode(':', $equipment);
          $formattedEquipments[$type][] = $name;
      }

      // Supprimer les doublons pour chaque type
      foreach($formattedEquipments as $type => $items) {
          $formattedEquipments[$type] = array_unique($items);
      }

      return $formattedEquipments;
  }


  private function formatImages($imagesString) {
    $images = explode('; ', $imagesString);
    $images = array_unique($images); // Supprimer les doublons

    // Ajouter BASE_PATH à chaque image
    $formatedImages = [];
    foreach ($images as $image) {
        $formatedImages[] = BASE_PATH . $image;
    }

    return $formatedImages;
}
}