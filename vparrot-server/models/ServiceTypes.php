<?php

class ServiceTypes {

    private ?int $idType;
    private string $typeName;

    public function __construct( string $typeName, ?int $idType = null) {

      $this->idType = $idType;
      $this->typeName = $typeName;

  }
//Getters List 
    public function getIdType() :?int {
        return $this->idType;
    }

    public function getTypeName() :string {
        return $this->typeName;
    }


//Setters List
    public function setIdType(?int $idType): void {
      $this->idType = $idType;
    }

    public function setTypeName(string $typeName): void {
      $this->typeName = $typeName;
    }
}