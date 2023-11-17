<?php

require_once './vparrot-server/models/Database.php';
require_once './vparrot-server/models/Testimonies.php';

class TestimoniesRepository extends Database {

    //GET all testimonies 
    public function getAllTestimonies() :array {

      try {

          $db = $this->getBdd();
          $req = "SELECT * FROM testimonies";

          $stmt = $db->prepare($req);
          $stmt->execute();
          $testimoniesData = $stmt->fetchAll(PDO::FETCH_ASSOC);

          $testimonies = [];
          foreach ($testimoniesData as $testimonyData) {

              $testimony = new Testimonies(
                  $testimonyData['id_testimony'] ?? null,
                  $testimonyData['first_name'],
                  $testimonyData['last_name'],
                  $testimonyData['content'],
                  $testimonyData['rating'],
                  $testimonyData['is_moderated']
              );

              $testimonies[] = $testimony;     
          }

          return $testimony;

      } catch(PDOException $e) {

          $this->handleException($e, "extraction de tous les avis clients");
      }
    }


     //Get Testimonies by moderation status
     public function getModerationTestimonies($isModerated) :array {
        try {

            $db = $this->getBdd();
            $req = "SELECT * FROM testimonies WHERE is_moderated = :isModerated";

            $stmt = $db->prepare($req);
            $stmt->bindValue(":isModerated", $isModerated, PDO::PARAM_BOOL);
            $stmt->execute();
    
            $testimoniesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $testimonies = [];
            foreach ($testimoniesData as $testimonyData) {

                $testimony = new Testimonies(      
                    $testimonyData['first_name'],
                    $testimonyData['last_name'],
                    $testimonyData['content'],
                    $testimonyData['rating'],
                    $testimonyData['is_moderated'],
                    $testimonyData['id_testimony'] ?? null
                );

                $testimonies[] = $testimony;     
            }

            return $testimonies;
              
        } catch(PDOException $e) {

            $this->handleException($e, "extraction des avis clients validés");
        }
    }

    //Create testimony
    public function addTestimony(Testimonies $testimony) :string {
        try {

            $db = $this->getBdd();
            $req = "INSERT INTO testimonies (first_name, last_name, content, rating, is_moderated) VALUES (:firstName, :lastName, :content, :rating, 0)";
            
            $stmt = $db->prepare($req);
            $stmt->bindValue(":firstName", $testimony->getFirstName() , PDO::PARAM_STR);
            $stmt->bindValue(":lastName", $testimony->getLastName(), PDO::PARAM_STR);
            $stmt->bindValue(":content", $testimony->getContent() , PDO::PARAM_STR);
            $stmt->bindValue(":rating", $testimony->getRating() , PDO::PARAM_INT);
            $stmt->execute();

            return "Témoignage créé avec succès, en attente de modération, si votre témoignage n'est pas validé il sera supprimé";

        } catch(PDOException $e) {

            $this->handleException($e, "Création du témoignage. ");                     
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
