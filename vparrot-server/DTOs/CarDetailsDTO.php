<?php

require_once './vparrot-server/config/config.php';


class CarDetailsDTO {

    public $idCar;
    public $brand;
    public $model;
    public $trade_name;
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

        $this->idCar = $data["id_car"];
        $this->brand = $data['brand'];
        $this->model = $data['model'];
        $this->trade_name = $data['trade_name'];
        $this->price = $data['price'];
        $this->years = $data['years'];
        $this->fuel = $data['fuel'];
        $this->power = $data['power'];
        $this->kilometer = $data['kilometer'];
        $this->transmission = $data['transmission'];
        $this->body = $data['body'];
        $this->images = $this->modifyPathImage($data['images']);
        $this->equipments = $this->parseEquipments($data['equipments']);

    }

    private function parseEquipments($equipmentsString) {
        $equipmentsArray = explode('; ', $equipmentsString);
        $equipments = [];

        foreach($equipmentsArray as $equipment) {
            list($type, $name) = explode(":", $equipment);
            $equipments[$type] = $name;
        }

        return $equipments;
    }

    private function modifyPathImage($imagesString) {
        $imagesPaths = explode('; ', $imagesString);

        foreach($imagesPaths as $path) {
            $pathImgModified[] = BASE_PATH . $path;
        }

        return $pathImgModified;
    }

}