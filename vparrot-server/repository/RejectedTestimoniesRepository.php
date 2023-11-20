<?php

require_once './vparrot-server/models/Database.php';

class RejectedTestimoniesRepository extends Database {

    /**
     * Récupère la liste des témoignages qui ont été rejetés.
     *
     * Cette méthode interroge la base de données pour extraire tous les témoignages de la table
     * 'rejected_testimonies'. Chaque témoignage rejeté est transformé en un objet 'RejectedTestimonies', 
     * qui contient les informations détaillées telles que l'identifiant du témoignage rejeté, 
     * l'identifiant du témoignage original, le prénom et le nom de la personne ayant laissé le témoignage, 
     * ainsi que le contenu et la note du témoignage.
     *
     * @return array Renvoie un tableau d'objets 'RejectedTestimonies', chacun représentant un témoignage rejeté.
     *               Chaque objet contient les informations du témoignage rejeté.
     *               Renvoie un tableau vide si aucun témoignage rejeté n'est trouvé.
     * @throws PDOException Si une erreur survient lors de la requête à la base de données.
    */

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