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
    public function getAllTestimonies() :array {
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

//CREATE testimony 
    public function addTestimony() :bool {
        try {

            $db = $this->getBdd();
            $req = "INSERT INTO testimonies (firstName, lastName, content, rating) VALUES (:firstName, :lastName, :content, :rating)";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":firstName", $this->getFirstName(), PDO::PARAM_STR);
            $stmt->bindValue(":lastName", $this->getLastName(), PDO::PARAM_STR);
            $stmt->bindValue(":content", $this->getContent(), PDO::PARAM_STR);
            $stmt->bindValue(":rating", $this->getRating(), PDO::PARAM_INT);
            $stmt->execute();

            return true;


        } catch(PDOException $e) {

            $errorMsg = "Erreur lors de la tentative de création d'un témoignage. "
            . "Fichier: " . $e->getFile()
            . " à la ligne " . $e->getLine()
            . " Erreur: " . $e->getMessage();
            error_log($errorMsg);

            throw new Exception("Erreur lors de la création de votre témoignage, veuillez réessayer plus tard.");
        }
    }

//Approve testimony
    public function approveTestimony(int $testimonyId) : bool {
        try {

            $db= $this->getBdd();
            $req = "UPDATE testimonies SET isModerated = true WHERE idTestimony = :id";
            $stmt = $db->prepare($req);
            $stmt->bindValue("id", $testimonyId, PDO::PARAM_INT);
            $stmt->execute();

            return true;

        } catch(PDOException $e) {

            $errorMsg = "Erreur lors de l'approbation du témoignage. "
            . "Fichier: " . $e->getFile() 
            . " à la ligne " . $e->getLine()
            . ". Erreur: " . $e->getMessage();
            error_log($errorMsg);
            throw new Exception("Erreur lors de l'approbation du témoignage, veuillez réessayer plus tard");

        }
    }



}






