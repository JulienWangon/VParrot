<?php

require_once 'Database.php';

class Testimonies {

    private ?int $idTestimony;
    private ?string $firstName;
    private ?string $lastName;
    private ?string $content;
    private ?int $rating;
    private ?string $status;

    public function __construct(?string $firstName = null, ?string $lastName = null, ?string $content = null, ?int $rating = null, ?string $status = "en attente", ?int $idTestimony = null) {

        $this->idTestimony = $idTestimony;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->content = $content;
        $this->rating = $rating;
        $this->status = $status;
    }

//Getters List
    public function getIdTestimony() :int {
        return $this->idTestimony;
    }

    public function getFirstName() :string {
        return $this->firstName;
    }

    public function getLastName() :string {
        return $this->lastName;
    }

    public function getContent() :string {
        return $this->content;
    }

    public function getRating() :int {
        return $this->rating;
    }

    public function getStatus() :string {
        return $this->status;
    }

//Setters List
    public function setIdTestimony(int $idTestimony) :void {
        $this->idTestimony = $idTestimony;
    }
    public function setFirstName(string $firstName) :void {
        $this->firstName = $firstName;
    }

    public function setLastName(string $lastName) :void {
        $this->lastName = $lastName;
    }

    public function setContent(string $content) :void {
        $this->content = $content;
    }

    public function setRating (int $rating) :void {
        $this->rating = $rating;
    }

    public function setStatus(bool $status) :void {
        $this->status = $status;
    }

}






