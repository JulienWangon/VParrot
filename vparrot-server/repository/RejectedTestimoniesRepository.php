<?php

require_once './vparrot-server/models/Database.php';

class RejectedTestimoniesRepository extends Database {

    //Obtenir la liste des avis rejetés
    public function getRejectedTestimonies () :array {

      try {

          $db = $this->getBdd();
          $req = "SELECT * FROM rejected_testimonies";

          $stmt = $db->prepare($req);
          $stmt->execute();
          $rejectedTestimoniesData = $stmt->fetchAll(PDO::FETCH_ASSOC);

          $rejectedTestimonies = [];
          foreach ($rejectedTestimoniesData as $rejectedTestimonyData) {

            $rejectedTestimony = new RejectedTestimonies(
                  $rejectedTestimonyData['id_rejected_testimony'] ?? null,
                  $rejectedTestimonyData['id_testimony'],
                  $rejectedTestimonyData['first_name'],
                  $rejectedTestimonyData['last_name'],
                  $rejectedTestimonyData['content'],
                  $rejectedTestimonyData['rating']  
            );

            $rejectedTestimonies[] = $rejectedTestimony;     
        }

        return $rejectedTestimonies;

      } catch(PDOException $e) {

          $this->handleException($e, "récupération des témoignage rejetés");
      }

  }

}