<?php

class Service {

    private ?int $idService;
    private  int $idType;
    private string $name;
    private string $description;
    private string $price;
    private string $pathImg;

    public function __construct(int $idType, string $name, string $description, string $price, string $pathImg, ?int $idService = null ) {

      $this->idService = $idService;
      $this->idType = $idType;
      $this->name = $name;
      $this->description = $description;
      $this->price = $price;
      $this->pathImg = $pathImg;

  }

//Getters list
    public function getIdService() :?int {
      return $this->idService;
    }

    public function getIdType() :int {
      return $this->idType;
    }

    public function getName() :string {
      return $this->name;
    }

    public function getDescription() :string {
      return $this->description;
    }

    public function getPrice() :string {
      return $this->price;
    }

    public function getPathImg() :string {
      return $this->pathImg;
    }

//Setters List
    public function setType(int $idType) :void {
      $this->idType = $idType;
    }

    public function setName(string $name) :void {
      $this->name = $name;
    }

    public function setDescription(string $description) :void {
      $this->description = $description;
    }

    public function setPrice(float $price) :void {
      $this->price = $price;
    }

    public function setPathImg(string $pathImg) :void {
      $this->pathImg = $pathImg;
    }

}