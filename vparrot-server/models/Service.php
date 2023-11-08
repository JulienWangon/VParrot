<?php

class Service {

    private ?int $idService;
    private ?string $type;
    private ?string $name;
    private ?string $description;
    private ?string $price;
    private ?string $pathImg;

    public function __construct(?int $idService = null, ?string $type = null, ?string $name = null, ?string $description = null, ?string $price = null, ?string $pathImg = null) {

      $this->idService = $idService;
      $this->type = $type;
      $this->name = $name;
      $this->description = $description;
      $this->price = $price;
      $this->pathImg = $pathImg;

  }

//Getters list
    public function getIdService() :int {
      return $this->idService;
    }

    public function getType() :string {
      return $this->type;
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
    public function setType(string $type) :void {
      $this->type = $type;
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