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



}
