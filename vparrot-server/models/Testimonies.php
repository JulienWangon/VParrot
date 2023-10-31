<?php

require_once 'Database.php';

class Testimonies extends Database {

    private ?int $idTestimony = null;
    private ?string $firstName = null;
    private ?string $lastName = null;
    private ?string $content = null;
    private ?int $rating = null;
    private ?bool $isModerated = null;

    public function __construct(?string $firstName = null, ?string $lastName = null, ?string $content = null, ?int $rating = null, ?bool $isModerated = null, ?int $idTestimony = null) {

        $this->idTestimony = $idTestimony;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->content = $content;
        $this->rating = $rating;
        $this->isModerated = $isModerated;
    }

//Getters List
    public function getId() :int {
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

    public function getIsModerated() :bool {
        return $this->isModerated;
    }

//Setters List
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

    public function setIsModerated(bool $isModerated) :void {
        $this->isModerated = $isModerated;
    }

//CRUD Methods

//GET all testimonies 
    public function getallTestimonies() :array {
        try {

            $db = $this->getBdd();
            $req = "SELECT * FROM testimonies";
            $stmt = $db->prepare($req);
            $stmt->execute();
            $testimonies = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $testimonies;

        } catch(PDOException $e) {

            $errorMsg = "Erreur lors de la demande d'extraction des témoignages. "
            . "Fichier: " . $e->getFile()
            . " à la ligne " . $e->getLine()
            . " Erreur: " . $e->getMessage();
            error_log($errorMsg);

            throw new Exception("Erreur lors de la récupération de la liste des témoignages, veuillez réessayer plus tard");
        }
    }

}






