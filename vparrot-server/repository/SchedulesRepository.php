<?php

require_once './vparrot-server/models/Database.php';
require_once './vparrot-server/models/Schedules.php';

class SchedulesRepository extends Database {

    /**
     * Récupère la liste complète des horaires d'ouverture à partir de la base de données.
     *
     * Cette méthode interroge la table 'schedules' pour extraire tous les horaires d'ouverture enregistrés.
     * Chaque enregistrement est transformé en un objet 'Schedules', qui contient les informations détaillées
     * sur les horaires d'ouverture et de fermeture pour chaque jour de la semaine, ainsi que l'identifiant unique
     * de l'horaire.
     *
     * @return array Renvoie un tableau d'objets 'Schedules', chacun représentant un horaire d'ouverture.
     *               Chaque objet 'Schedules' contient les informations de jour, d'ouverture et de fermeture
     *               du matin et de l'après-midi, ainsi que l'identifiant de l'horaire.
     *               Renvoie un tableau vide si aucun horaire n'est trouvé.
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête à la base de données.
    */

    //Obtenir la liste des horaires
    public function getAllSchedules() : array {
      try {

          $db = $this->getBdd();
          $req = "SELECT * FROM schedules";
          $stmt = $db->prepare($req);
          $stmt->execute();
          $schedulesData = $stmt->fetchALL(PDO::FETCH_ASSOC);
     
          $schedules = [];
          foreach ($schedulesData as $scheduleData) {

              $schedule = new Schedules(    
                  $scheduleData['day_of_week'],
                  $scheduleData['morning_opening'],
                  $scheduleData['morning_closing'],
                  $scheduleData['afternoon_opening'],
                  $scheduleData['afternoon_closing'],
                  $scheduleData['id_opening_day']
              );

              $schedules[] = $schedule;     
          }

          return $schedules;

      } catch(PDOException $e) {

          $this->handleException($e, "extraction liste des horaires d'ouverture");
      }
    }


    /**
     * Met à jour les horaires d'ouverture dans la base de données.
     *
     * Cette méthode reçoit un objet 'Schedules' contenant les informations à jour sur les horaires
     * d'ouverture et de fermeture pour un jour spécifique de la semaine. Elle met à jour ces informations
     * dans la base de données pour l'identifiant d'horaire correspondant. La méthode construit dynamiquement
     * la requête SQL en fonction des valeurs fournies dans l'objet 'Schedules'.
     *
     * @param Schedules $schedules L'objet 'Schedules' contenant les informations à jour des horaires.
     * @return bool Renvoie vrai (true) si la mise à jour a affecté au moins une ligne dans la table,
     *              ce qui signifie que les horaires ont été mis à jour. Renvoie faux (false) si aucune
     *              ligne n'a été affectée, indiquant qu'aucun horaire avec l'identifiant spécifié n'a été trouvé.
     * @throws PDOException Si une erreur survient lors de l'exécution de la requête à la base de données.
     * @throws Exception Si une erreur survient lors de la mise à jour des horaires.
    */

    //Mise a jour des horaires
    public function updateSchedules(Schedules $schedules) : bool {
        try {
            $db = $this->getBdd();
            $columnTable = [
                "morning_opening = :morningOpening",
                "morning_closing = :morningClosing",
                "afternoon_opening = :afternoonOpening",
                "afternoon_closing = :afternoonClosing", 
                "day_of_week = :dayOfWeek",
                "id_opening_day = :idOpeningDay"    
            ];
            
            $req = "UPDATE schedules SET " . implode(", ", $columnTable) . " WHERE id_opening_day = :idOpeningDay";
            $stmt = $db->prepare($req);
    
            // Lier toutes les valeurs, y compris les valeurs nulles
            $stmt->bindValue(":morningOpening", $schedules->getMorningOpening());
            $stmt->bindValue(":morningClosing", $schedules->getMorningClosing());
            $stmt->bindValue(":afternoonOpening", $schedules->getAfternoonOpening());
            $stmt->bindValue(":afternoonClosing", $schedules->getAfternoonClosing());
            $stmt->bindValue(":dayOfWeek", $schedules->getDayOfWeek());
            $stmt->bindValue(":idOpeningDay", $schedules->getIdOpeningDay(), PDO::PARAM_INT);
    
            $stmt->execute();
    
            return $stmt->rowCount() > 0;
    
        } catch(PDOException $e) {
            throw new Exception("Erreur lors de la mise à jour des horaires : " . $e->getMessage());
        }
    }

    /**
     * Vérifie si une journée existe dans la base de données en fonction de son identifiant.
     *
     * Cette méthode interroge la base de données pour déterminer si une journée avec
     * l'identifiant spécifié ($idOpeningDay) existe. Elle renvoie un booléen indiquant si un enregistrement correspondant
     * a été trouvé.
     *
     * @param int $idOpeningDay L'identifiant du jour d'ouverture à vérifier.
     * @return bool Renvoie vrai (true) si un enregistrement avec l'identifiant spécifié existe dans la base de données.
     *              Renvoie faux (false) si aucun enregistrement correspondant n'est trouvé.
     * @throws PDOException Si une erreur survient lors de la requête à la base de données.
     */

    //Controlle si une journée existe avec un ID
    public function idExists($idOpeningDay) {
        try {

            $db= $this->getBdd();
            $req = "SELECT * FROM schedules WHERE id_opening_day = :idOpeningDay";
            $stmt = $db->prepare($req);
            $stmt->bindValue(":idOpeningDay", $idOpeningDay, PDO::PARAM_INT);
            $stmt->execute();

            $count = $stmt->fetchColumn();

            return $count >0;

        } catch (PDOException $e) {

            $this->handleException($e, "vérification si l'id du jour d'ouverture existe");
        }
    }

    /**
     * Récupère les détails d'une journée d'ouverture spécifique à partir de son identifiant.
     *
     * Cette méthode interroge la base de données pour trouver une journée d'ouverture spécifique 
     * identifiée par son identifiant $idOpeningDay. Elle renvoie un objet 'Schedules' contenant
     * les détails de la journée, y compris les heures d'ouverture et de fermeture du matin et de l'après-midi.
     * Si aucun enregistrement n'est trouvé avec l'identifiant spécifié, une exception est levée.
     *
     * @param int $idOpeningDay L'identifiant de la journée d'ouverture à récupérer.
     * @return Schedules Renvoie un objet 'Schedules' contenant les informations de la journée d'ouverture.
     *                   Lève une exception si aucun horaire n'est trouvé pour l'ID spécifié.
     * @throws PDOException Si une erreur survient lors de la requête à la base de données.
     * @throws Exception Si aucun horaire n'est trouvé pour l'ID spécifié.
    */
    
    //Récupérer une journée avec sont id
    public function getScheduleById($idOpeningDay) {
        try {

            $db = $this->getBdd();
            $req = "SELECT * FROM schedules WHERE id_opening_day = :idOpeningDay";

            $stmt = $db->prepare($req);
            $stmt->bindValue(':idOpeningDay', $idOpeningDay, PDO::PARAM_INT);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if(!$result) {

                throw new Exception("Aucun horaire trouvé pour l'ID spécifié");
            }

            $schedule = new Schedules();
            $schedule->setIdOpeningDay($result['id_opening_day']);
            $schedule->setDayOfWeek($result['day_of_week']);
            $schedule->setMorningOpening($result['morning_opening']);
            $schedule->setMorningClosing($result['morning_closing']);
            $schedule->setAfternoonOpening($result['afternoon_opening']);
            $schedule->setAfternoonClosing($result['afternoon_closing']);

            return $schedule;

        } catch(PDOException $e) {

            $this->handleException($e, "vérification si l'id du jour d'ouverture existe"); 
        }


    }

}