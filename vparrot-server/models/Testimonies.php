<?php

require_once 'Database.php';

class Testimonies extends Database {

    private ?int $idTestimony = null;
    private string $firstName;
    private string $lastName;
    private string $content;
    private int $rating;
    private bool $isModerated;

    public function __construct(string $firstName, string $lastName, string $content, int $rating, bool $isModerated, ?int $idTestimony = null) {

        $this->idTestimony = $idTestimony;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->content = $content;
        $this->rating = $rating;
        $this->isModerated = $isModerated;
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

//CREATE testimony 
    public function addTestimony() :bool {

        try {

            $db = $this->getBdd();
            $req = "INSERT INTO testimonies (first_name, last_name, content, rating) VALUES (:firstName, :lastName, :content, :rating)";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":firstName", $this->getFirstName(), PDO::PARAM_STR);
            $stmt->bindValue(":lastName", $this->getLastName(), PDO::PARAM_STR);
            $stmt->bindValue(":content", $this->getContent(), PDO::PARAM_STR);
            $stmt->bindValue(":rating", $this->getRating(), PDO::PARAM_INT);
            $result = $stmt->execute();

            return $result;

        } catch(PDOException $e) {

            $this->handleException($e, "création utilisateur");
        }
    }

//Approve testimony
    public function approveTestimony(int $testimonyId) : bool {

        try {

            $db= $this->getBdd();
            $req = "UPDATE testimonies SET is_moderated = true WHERE id_testimony = :id";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":id", $testimonyId, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->rowCount() > 0;

        } catch(PDOException $e) {

            $this->handleException($e, "approbation du témoignage");
        }
    }

//Rejecte Testimony
    public function rejectTestimony(int $testimonyId) : bool {

        $db = $this->getBdd();

        try {
            
            //Start transaction
            $db->beginTransaction();

            //Copy testimony to the rejected_testimonies table
            $req = "INSERT INTO rejected_testimonies (id_testimony, first_name, last_name, content, rating)
                    SELECT id_testimony, first_name, last_name, content, rating  
                    FROM testimonies 
                    WHERE id_testimony = :id";
            
            $stmt= $db->prepare($req);
            $stmt->bindValue(":id", $testimonyId, PDO::PARAM_INT);
            $stmt->execute();

            //Delete testimony in testimonies table
            $reqToDelete = "DELETE FROM testimonies WHERE id_testimony = :id";
            $stmtToDelete = $db->prepare($reqToDelete);
            $stmtToDelete->bindValue(":id", $testimonyId, PDO::PARAM_INT);
            $stmtToDelete->execute();

            //Transaction validation
            $db->commit();

            return $stmt->rowCount() > 0;

        } catch (PDOException $e) {

            //Canceling transaction if an error occurs
            $db->rollBack();

            $this->handleException($e, "rejet du témoignage");
        }
    }

//Delete testimony 
    public function deleteTestimony(int $testimonyId) : bool {

        try {

            $db = $this->getBdd();
            $req = "DELETE FROM testimonies WHERE id_testimony = :id";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":id", $testimonyId, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->rowCount() > 0;

        } catch(PDOException $e) {

            $this->handleException($e, "suppression du témoignage");
        }
    }


//Checking if testimony id exists
    public function testimonyExists(int $testimonyId) :bool {

        try {

            $db = $this->getBdd();
            $req = "SELECT 1 FROM testimonies WHERE id_testimony = :id";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":id", $testimonyId, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetchColumn() !== false;

        } catch(PDOException $e) {

            $this->handleException($e, "vérification de l'existance du témoignage");
        }
    }

}






