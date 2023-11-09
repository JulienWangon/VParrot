<?php


class Car {

    private $id;
    private $brand;
    private $model;
    private $tradeName;
    private $price;

    public function __construct($id, $brand, $model, $tradeName, $price) {

        $this->id = $id;
        $this->brand = $brand;
        $this->model = $model;
        $this->tradeName = $tradeName;
        $this->price = $price;
    }

//Getters List
    public function getId() :int {
        return $this->id;
    }

    public function getBrand() :string {
        return $this->brand;
    }

    public function getModel() :string {
        return $this->model;
    }

    public function getTradeName(): string {
        return $this->tradeName;
    }

    public function getPrice(): int {
        return $this->price;
    }

//Setters list
    public function setBrand($brand) :void {
        $this->brand = $brand;
    }

    public function setModel($model) :void {
        $this->model = $model;
    }

    public function settradeName($tradeName) :void {
        $this->tradeName = $tradeName;
    }

    public function setPrice($price) :void {
        $this->price = $price;
    }
}